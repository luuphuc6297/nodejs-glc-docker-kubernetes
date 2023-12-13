const httpStatus = require('http-status');
const UserService = require('./user.service');
const { PAGINATION } = require('../../utils/constant');

/**
 * Get user by id
 */
exports.getUserById = async (req, res, next) => {
    try {
        const user = await UserService.getUserById(req.params.user_id);
        return res.status(httpStatus.OK).json(user);
    } catch (err) {
        return next(err);
    }
};

/**
 * Get users
 */
exports.getUsers = async (req, res, next) => {
    try {
        const {
            // Default value if the user does not transmission any value
            page = PAGINATION.PAGE,
            per_page = PAGINATION.PER_PAGE,
            sort_by = PAGINATION.SORT_BY,
            order_by = PAGINATION.ORDER_BY,
            q,
        } = req.query;
        const users = await UserService.getUsers({
            page,
            per_page,
            sort_by,
            order_by,
            q,
        });
        return res.status(httpStatus.OK).json(users);
    } catch (err) {
        return next(err);
    }
};

/**
 * Get current user
 */
exports.getCurrentUser = async (req, res, next) => {
    try {
        const user = await UserService.getUserById(req.auth.id);
        return res.status(httpStatus.OK).json(user);
    } catch (err) {
        return next(err);
    }
};

/**
 * Update my profile
 */
exports.updateProfile = async (req, res, next) => {
    try {
        const user = await UserService.updateUser({ id: req.auth.id, ...req.body });
        return res.status(httpStatus.OK).json(user);
    } catch (err) {
        return next(err);
    }
};

/**
 * Admin update user info
 */
exports.updateUserInfo = async (req, res, next) => {
    try {
        const user = await UserService.updateUser(req.body);
        return res.status(httpStatus.OK).json(user);
    } catch (err) {
        return next(err);
    }
};

/**
 * Delete user
 */
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await UserService.deleteUser(req.params.user_id);
        return res.status(httpStatus.OK).json(user);
    } catch (err) {
        return next(err);
    }
};
