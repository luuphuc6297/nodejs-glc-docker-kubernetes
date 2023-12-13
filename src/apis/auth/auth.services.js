const ms = require('ms');
const jwt = require('jsonwebtoken');
const { v4: uuidV4 } = require('uuid');
const moment = require('moment-timezone');
const bcrypt = require('bcryptjs');
const { isEqual, isNull, pick } = require('lodash');

// Model
const UserModel = require('mongoose').model('User');
const AuthSessionModel = require('mongoose').model('AuthSession');

/**
 * Hash user password
 *
 * @param {String} pwd - Password
 * @return {Promise<string>} Hashed password
 * @private
 */
const hashPassword = async (pwd) => bcrypt.hash(pwd, 12);

/**
 * Verify user password
 *
 * @param {String} pwd - Password
 * @param {String} hash - Hashed password
 * @return {Boolean}
 * @private
 */
const verifyPassword = async (pwd, hash) => {
    const result = await bcrypt.compare(pwd, hash);
    return !!result;
};
exports.verifyPassword = verifyPassword;

/**
 * Generate Bearer tokens | Include "access token" and "refresh token"
 *
 * @param {Object} user - User info
 * @private
 */
const generateTokens = (user) => {
    const accessToken = jwt.sign(
        {
            sub: user.id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            email_verified: user.email_verified,
            role: user.type,
            exp: DateTime.utc().plus(accessTokenDuration).toSeconds(),
        },
        JWT_SECRET,
    );
    const refreshToken = `${user.id}#${uuidV4().replace(/-/g, '')}`;
    return {
        token_type: 'Bearer',
        access_token: accessToken,
        expires_in: accessTokenDuration.as('seconds'),
        refresh_token: refreshToken,
    };
};

/**
 * Generate new auth session
 *
 * @param {Object} user - User info
 * @param {Object} client - Client info
 * @private
 */
const generateAuthSession = async ({ user, client }) => {
    const tokens = generateTokens(user);
    const authSession = await AuthSessionModel.createSession({
        user_id: user.id,
        ip: client.ip,
        role: user.type,
        device: client.agent,
        refresh_token: tokens.refresh_token,
        expires: DateTime.utc().plus(refreshTokenDuration).toJSON(),
    });
    return {
        tokens,
        session: authSession,
    };
};

const register = async ({ user }) => {
    const exists = await UserModel.getByEmail(user.email);

    if (exists && isEqual(exists.email_verified, true)) {
        throw new AppError(AuthError.EmailAlreadyTaken);
    }

    // Hash password
    const hashedPwd = await hashPassword(user.password);

    if (exists) {
        const [updated, sended] = await Promise.all([
            UserModel.update(
                {
                    email: user.email,
                },
                {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    name: `${user.first_name} ${user.last_name}`,
                    username: uuidV4().replace(/-/g, ''),
                    password: hashedPwd,
                },
                { new: true },
            ),
            VerifyService.requestVerifyAccount(exists.email),
        ]);
        if ((updated, sended)) return { user: exists };
    }
};
