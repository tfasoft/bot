const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userModule = new Schema({
    uid: {
        type: Number,
        required: true
    },
    token: {
        type: String,
        required: true
    },
}, {timestamps: true});

const User = mongoose.model('user', userModule);

module.exports = User;