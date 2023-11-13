const migrate = require('migrate-mongo');
const mongoose = require('mongoose');

require('../apis/user/user.model');
require('../apis/organization/organization.model');
require('../apis/project/project.model');

const User = mongoose.model('User');
const Org = mongoose.model('Organization');
const Project = mongoose.model('Project');

exports.up = async function () {
    await Org.updateMany({}, { $set: { invite_url: null } });
    await Org.updateMany({}, { $addToSet: { identities: { provider: 'invite_url', uid: 'default' } } });

    await Project.updateMany({}, { $set: { avatar: null } });
    await Project.updateMany({}, { $addToSet: { identities: { provider: 'avatar', uid: 'default.png' } } });

    await User.updateMany({}, { $set: { avatar: null } });
    await User.updateMany({}, { $addToSet: { identities: { provider: 'avatar', uid: 'default.png' } } });
};

exports.down = async function () {
    await Org.updateMany({}, { $unset: { identities: { provider: 'invite_url' } } });
    await Org.updateMany({}, { $unset: { invite_url: '' } });

    await Project.updateMany({}, { $unset: { identities: { provider: 'avatar' } } });
    await Project.updateMany({}, { $unset: { avatar: '' } });

    await User.updateMany({}, { $unset: { identities: { provider: 'avatar' } } });
    await User.updateMany({}, { $unset: { avatar: '' } });
};
