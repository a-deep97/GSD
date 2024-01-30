
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    projectId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: false
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
        default : Date.now
    },
    target: {
        type: Date,
        default : Date.now
    }

}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
