const controller = require('./user.controller');
const validation = require('./user.validation');
const authenticate = require('../../core/middleware/authenticate');

/**
 * Module exports
 * @public
 */
module.exports = [
    /** Get user by id */
    {
        path: '/users/:user_id',
        method: 'get',
        middlewares: [validation.getUserById, authenticate, permission('manage', 'users')],
        controller: controller.getUserById,
    },
    /** Get user info */
    {
        path: '/users/me',
        method: 'get',
        middlewares: [authenticate],
        controller: controller.getCurrentUser,
    },

    /** Update user */
    {
        path: '/private/users/:user_id',
        method: 'put',
        middlewares: [validation.updateUser, authenticate],
        controller: controller.updateProfile,
    },

    /** User update profile */
    {
        path: '/users/me',
        method: 'put',
        middlewares: [validation.updateProfile, authenticate],
        controller: controller.updateProfile,
    },

    /** Delete user by id */
    {
        path: '/private/users/:user_id',
        method: 'delete',
        middlewares: [validation.deleteUser, authenticate, permission('manage', 'users')],
        controller: controller.deleteUser,
    },
];
