const mongoose = require('mongoose');
const { transformMongooseDocumentToObject: transform } = require('../../utils/helpers');

/**
 * Verify schema
 * @private
 */

const Schema = new mongoose.Schema(
    {
        user_email: { type: String },
        type: { type: String },
        code: { type: String },
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
     * Get verify by id
     * @param {*} id
     */
    async getById(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) return undefined;
        const verify = await this.findOne({ _id: id }).lean();
        return transform(verify);
    },

    /**
     * Create a new verify
     * @param {Object} verifyDTO
     */
    async createVerify(verifyDTO) {
        const verify = await this.create(verifyDTO);
        return transform(verify.toObject());
    },
};

/**
 * Module exports
 * @public
 */
module.exports = mongoose.model('Verify', Schema, 'verifies');
