const migrate = require('migrate-mongo');
const mongoose = require('mongoose');

require('../apis/user/user.model');
const User = mongoose.model('User');

exports.up = async function () {
    await User.updateMany({}, { $set: { avatar: null } });
    await User.updateMany({}, { $addToSet: { identities: { provider: 'avatar', uid: 'default.png' } } });
};

exports.down = async function () {
    await User.updateMany({}, { $unset: { identities: { provider: 'avatar' } } });
    await User.updateMany({}, { $unset: { avatar: '' } });
};
