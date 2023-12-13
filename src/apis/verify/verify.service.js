const _ = require('lodash');
const moment = require('moment-timezone');
const ms = require('ms');
const { v4: uuidV4 } = require('uuid');
const { Duration, DateTime } = require('luxon');
const { sendEmailWithTemplate } = require('../../services/mailgun');

const { VERIFY_ACCOUNT_TOKEN } = require('../../config/config');
const { CODE, TEMPLATE_NAME, TEMPLATE_PARAMS } = require('../../utils/constant');

const verifyTokenDuration = Duration.fromMillis(ms(VERIFY_ACCOUNT_TOKEN));

const verifyTransform = ['id', 'user_email', 'type', 'code', 'expires'];

/**
 * Get verify by code
 * @param {String} code
 * @param {String} type
 */
const getVerify = async (code, type) => {
    const verify = await VerifyModel.findOne({
        code,
        type,
    });
    if (_.isNull(verify)) {
        throw new AppError(VerifyError.VerifyNotFound);
    }
    // Transform verify
    const transformedVerify = _.pick(verify, verifyTransform);
    return transformedVerify;
};
exports.getVerify = getVerify;

/**
 * Request verify account
 * @param {String} userId
 * @param {String} userEmail
 */
exports.requestVerifyAccount = async (userEmail) => {
    const user = await AuthService.getUserIsNotVerify(userEmail);

    if (_.isNull(user)) {
        throw new AppError(UserError.UserNotFound);
    }

    if (_.isEqual(user.email_verified, true)) {
        throw new AppError(VerifyError.YouAlreadyVerifiedAccount);
    }
    const verify = await VerifyModel.findOne({ user_email: user.email, type: CODE.VERIFY_ACCOUNT });

    if (!_.isNull(verify)) {
        if (moment(new Date()).subtract(30, 'seconds') < verify.updated_at) {
            throw new AppError(VerifyError.YouAlreadySendEmailPleaseResendAfter30Seconds);
        }
        // Gen verify code
        const verifyCode = uuidV4().replace(/-/g, '');
        // eslint-disable-next-line no-return-await
        const [updated, sended] = await Promise.all([
            VerifyModel.findOneAndUpdate(
                {
                    _id: verify._id,
                    user_email: verify.user_email,
                    type: CODE.VERIFY_ACCOUNT,
                },
                {
                    $set: {
                        code: verifyCode,
                        expires: DateTime.utc().plus(verifyTokenDuration).toJSON(),
                    },
                },
                {
                    new: true,
                },
            ),
            sendEmailWithTemplate({
                templateName: TEMPLATE_NAME.VERIFY_ACCOUNT,
                from: 'Timebee <no-reply@timebee.co>',
                user: {
                    email: user.email,
                },
                messageConditions: {
                    subject: `Hi ${user.name}, please verify your Timebee account`,
                    mailgunVariables: `{"${TEMPLATE_PARAMS.VERIFY_ACCOUNT.USER_FULLNAME}": "${user.name}", "${
                        TEMPLATE_PARAMS.VERIFY_ACCOUNT.VERIFY_URL
                    }": "${`${TIMEBEE_PORTAL_URL}/verify-email?verify_code=${verifyCode}`}"}`,
                },
            }),
        ]);
        if (updated && sended) return sended;
    }
    // Gen verify token
    const newVerify = await VerifyModel.create({
        user_email: user.email,
        type: CODE.VERIFY_ACCOUNT,
        code: uuidV4().replace(/-/g, ''),
        expires: DateTime.utc().plus(verifyTokenDuration).toJSON(),
    });

    const sended = await sendEmailWithTemplate({
        templateName: TEMPLATE_NAME.VERIFY_ACCOUNT,
        from: 'Timebee <no-reply@timebee.co>',
        user: {
            email: user.email,
        },
        messageConditions: {
            subject: `Hi ${user.name}, please verify your Timebee account`,
            mailgunVariables: `{"${TEMPLATE_PARAMS.VERIFY_ACCOUNT.USER_FULLNAME}": "${user.name}", "${
                TEMPLATE_PARAMS.VERIFY_ACCOUNT.VERIFY_URL
            }": "${`${TIMEBEE_PORTAL_URL}/verify-email?verify_code=${newVerify.code}`}"}`,
        },
    });
    return sended;
};
