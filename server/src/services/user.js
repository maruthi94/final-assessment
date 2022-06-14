const userModel = require('../model/user');

const findByEmail = email => userModel.findOne({ email }).exec().then(res => res?.toObject());

const save = user => userModel.create(user);

module.exports = { save, findByEmail };
