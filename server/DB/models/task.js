
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    taskId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    projectId: {
        type: String,        
    },
    description: {
        type:  String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default : Date.now
    },
    target: {
        type: Date,
        default : Date.now
    }

}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
