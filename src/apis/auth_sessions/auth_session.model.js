const mongoose = require('mongoose');
const { transformMongooseDocumentToObject: transform } = require('../../utils/utils');

/**
 * AuthSession schema
 * @private
 */
const Schema = new mongoose.Schema(
    {
        // The user ID
        user_id: { type: String, required: true },
        // IP location (e.g. 127.0.0.1)
        ip: { type: String },
        // Device (e.g. Safari on MacOS)
        device: { type: String },
        // The refresh token, which can be used to obtain new access token
        refresh_token: { type: String },
        // The session (refresh token) expires
        expires: { type: Date, expires: 0 },
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

/**
 * Methods
 */
Schema.method({});

/**
 * Statics
 */
Schema.statics = {
    /**
     * Get auth session by ID
     * @param {string} id - Session ID
     */
    async getById(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) return undefined;
        const session = await this.findOne({ _id: id }).lean();
        return transform(session);
    },
    /**
     * Get auth session by token
     * @param {string} token - The refresh token
     */
    async getByToken(token) {
        const session = await this.findOne({ refresh_token: token }).lean();
        return transform(session);
    },
    /**
     * Create a new auth session
     * @param {Object} sessionDTO
     */
    async createSession(sessionDTO) {
        const session = await this.create(sessionDTO);
        return transform(session.toObject());
    },
    /**
     * Find session by token and update
     * @param {string} token
     * @param {Object} update
     */
    async findByTokenAndUpdate(token, update) {
        const updatedSession = await this.findOneAndUpdate({ refresh_token: token }, update, { new: true });
        return updatedSession && transform(updatedSession.toObject());
    },
};

/**
 * Module exports
 * @public
 */
module.exports = mongoose.model('AuthSession', Schema, 'auth_sessions');