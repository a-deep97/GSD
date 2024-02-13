
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        unique: false
    },
    lastname: {
        type:  String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    joinedAt: {
        type: Date,
        default : Date.now
    },
    lastLogin: {
        type: Date,
        default : Date.now
    }

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
