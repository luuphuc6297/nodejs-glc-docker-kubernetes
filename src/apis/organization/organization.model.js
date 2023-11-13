const mongoose = require('mongoose');
const { transformMongooseDocumentToObject: transform } = require('../../utils/helpers');
const { ORGANIZATION_STATUS, CONCURRENCY, WEEK_START_ON } = require('../../utils/constant');

/**
 * Organization schema
 * @private
 */
const Schema = new mongoose.Schema(
    {
        created_by_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: { type: String },
        short_name: { type: String },
        picture: { type: String },
        address: { type: String },
        phone_number: { type: String },
        tax_number: { type: String },
        industry: { type: String },
        team_size_from: { type: Number },
        team_size_to: { type: Number },
        contact: {
            name: { type: String },
            email: { type: String },
            phone_number: { type: String },
        },
        timezone: { type: String },
        currency: { type: String, enum: Object.values(CONCURRENCY), default: CONCURRENCY.USD },
        week_start_on: { type: String, enum: Object.values(WEEK_START_ON), default: WEEK_START_ON.MONDAY },
        status: { type: String, enum: Object.values(ORGANIZATION_STATUS), default: ORGANIZATION_STATUS.ACTIVE },
        invite_url: { type: String },
        expires_trial: { type: Date },
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

/**
 * Index fields
 */
Schema.index({ name: 'text' });

/**
 * Methods
 */
Schema.method({});

/**
 * Statics
 */
Schema.statics = {
    /**
     * Get organization by id
     * @param {*} id
     */
    async getById(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) return undefined;
        const organization = await this.findOne({ _id: id }).lean();
        return transform(organization);
    },

    /**
     * Create a new organization
     * @param {Object} organizationDTO
     */
    async createOrganization(organizationDTO) {
        const organization = await this.create(organizationDTO);
        return transform(organization.toObject());
    },
};

/**
 * Module exports
 * @public
 */
module.exports = mongoose.model('Organization', Schema, 'organizations');
