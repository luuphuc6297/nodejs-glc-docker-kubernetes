const UserModel = require('mongoose').model('User');
const _ = require('lodash');
const { AppError } = require('../../core/error');
const UserError = require('./user.error');
const { STATUS } = require('../../utils/constant');
const utils = require('../../utils/helpers');

const userTransform = [
    'id',
    'name',
    'email',
    'email_verified',
    'type',
    'picture',
    'time_zone',
    'phone_number',
    'token_fcm',
];

exports.getUserById = async (id, condition, error) => {
    const user = await UserModel.findOne({ _id: id, status: STATUS.ACTIVE, ...condition });
    if (_.isNull(user)) throw new AppError(error || UserError.UserNotFound);
    return _.pick(user, userTransform);
};

/**
 * Get users
 * @param {Object} queryData
 */
exports.getUsers = async (queryData) => {
    const sort = { $sort: { [queryData.sort_by]: parseInt(queryData.order_by) } };
    const $match = {};

    if (queryData.q) $match.$text = { $search: queryData.q, $language: 'es', $diacriticSensitive: true };

    const limitRecord = { $limit: parseInt(queryData.per_page) };
    const skipRecord = { $skip: (parseInt(queryData.page) - 1) * parseInt(queryData.per_page) };

    const pipeline = [
        sort,
        skipRecord,
        limitRecord,
        {
            $project: {
                ...userTransform.reduce((select, item) => {
                    select[item] = 1;
                    return select;
                }, {}),
                _id: 0,
                id: '$_id',
            },
        },
    ];
    const query = utils.pagination({}, pipeline);

    let [count, ...users] = await UserModel.aggregate(query);
    if (_.isEmpty(users)) {
        delete query[0].$match.$text;
        query[0].$match = { ...query[0].$match, ...utils.regrexSearch(queryData.q, 'name email') };

        // search with regrex
        [count, ...users] = await UserModel.aggregate(query);
    }
    return { ...(count || { total_count: 0 }), items: users };
};

/**
 * Get user by email
 * @param {String} id
 * @param {String} email
 */
exports.getUserByEmail = async (id, email) => {
    const user = await UserModel.findOne({ _id: id, email });
    if (_.isNull(user)) {
        throw new AppError(UserError.UserNotFound);
    }
    const transformedUser = _.pick(user, userTransform);
    return transformedUser;
};

/**
 * Get user by email
 * @param {object} userDto
 */
exports.updateUser = async (userDto) => {
    const user = await UserModel.findOneAndUpdate(
        { _id: userDto.id, status: STATUS.ACTIVE },
        { $set: { ...userDto, name: `${userDto.first_name} ${userDto.last_name}` } },
        { new: true },
    );
    if (_.isNull(user)) throw new AppError(UserError.UserNotFound);
    return _.pick(user, userTransform);
};

exports.deleteUser = async (userId) => {
    const user = await UserModel.findOneAndUpdate(
        { _id: userId, status: STATUS.ACTIVE },
        { $set: { status: STATUS.INACTIVE } },
    );
    if (_.isNull(user)) throw new AppError(UserError.UserNotFound);
};
