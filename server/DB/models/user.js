
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
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
    isActive: {
        type : Boolean,
        default: true,
    },
    joinedAt: {
        type: Date,
        default : new Date.now
    },
    lastLogin: {
        type: Date,
        default : new Date.now
    }

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
