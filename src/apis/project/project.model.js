const mongoose = require('mongoose');
const { STATUS } = require('../../utils/constant');
const { transformMongooseDocumentToObject: transform } = require('../../utils/helpers');

/**
 * project schema
 * @private
 */
const Schema = new mongoose.Schema(
    {
        organization_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
        name: { type: String },
        short_name: { type: String },
        description: { type: String },
        status: { type: String, default: STATUS.ACTIVE },
        total_budget_limit: { type: Number },
        daily_budget_limit: { type: Number },
        weekly_budget_limit: { type: Number },
        monthly_budget_limit: { type: Number },
        avatar: { type: String },
        expires: { type: Date, expires: 0 },
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

Schema.index({ name: 'text' });

/**
 * Methods
 */
Schema.method({});

/**
 * Statics
 */
Schema.statics = {
    STATUS,
    /**
     * Get project by ID
     * @param {string} id - project ID
     */
    async getById(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) return undefined;
        const project = await this.findOne({ _id: id, status: STATUS.ACTIVE }).lean();
        return transform(project);
    },

    /**
     * Create a new project
     * @param {Object} projectDTO
     */
    async createProject(projectDTO) {
        const project = await this.create(projectDTO);
        return transform(project.toObject());
    },
};

/**
 * Module exports
 * @public
 */
module.exports = mongoose.model('Project', Schema, 'projects');
