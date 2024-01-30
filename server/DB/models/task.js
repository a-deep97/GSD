
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: false
    },
    project: {
        type: String,        
    },
    description: {
        type:  String,
        required: true,
        unique: false
    },
    status: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default : new Date.now
    },
    target: {
        type: Date,
        default : new Date.now
    }

}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
