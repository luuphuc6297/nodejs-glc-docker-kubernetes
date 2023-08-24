const mongoose = require('mongoose');
const { USER_TYPES, USER_STATUS, USER_IDENTITIES } = require('../../utils/constant');
const { transformMongooseDocumentToObject: transform } = require('../../utils/helpers');

/**
 * User schema
 * @private
 */
const Schema = new mongoose.Schema(
    {
        type: { type: String, default: USER_TYPES.USER },
        username: { type: String, unique: true },
        first_name: { type: String },
        last_name: { type: String },
        name: { type: String },
        email: { type: String, unique: true, required: true },
        email_verified: { type: Boolean, default: false },
        password: { type: String },
        phone_number: { type: String },
        picture: { type: String },
        status: { type: String, default: USER_STATUS.ACTIVE },
        time_zone: { type: String },
        country: { type: String },
        ref_code: { type: String },
        token_fcm: { type: String },
        identities: {
            type: [
                {
                    provider: { type: String, enum: Object.values(USER_IDENTITIES) },
                    uid: { type: String },
                    linked_at: { type: Date },
                },
            ],
        },
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

/**
 * Methods
 */
Schema.method({});
Schema.index({ name: 'text', email: 'text' });

/**
 * Statics
 */
Schema.statics = {
    // Export user types & user status
    TYPES: USER_TYPES,
    STATUS: USER_STATUS,
    /**
     * Get user by ID
     * @param {string} id - User ID
     */
    async getById(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) return undefined;
        const user = await this.findOne({ _id: id, status: USER_STATUS.ACTIVE }).lean();
        return transform(user);
    },
    /**
     * Get user by email
     * @param {string} email - User email
     */
    async getByEmail(email) {
        const user = await this.findOne({ email, status: USER_STATUS.ACTIVE }).lean();
        return transform(user);
    },
    /**
     * Get user by email or username
     * @param {string} id - Email or username
     */
    async getByEmailOrUsername(id) {
        const user = await this.findOne({ $or: [{ email: id }, { username: id }], status: USER_STATUS.ACTIVE }).lean();
        return transform(user);
    },
    /**
     * Create a new user
     * @param {Object} userDTO
     */
    async createUser(userDTO) {
        const user = await this.create(userDTO);
        return transform(user.toObject());
    },
};

/**
 * Module exports
 * @public
 */
module.exports = mongoose.model('User', Schema, 'users');
