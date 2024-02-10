const mongoose = require('mongoose')
const Schema = mongoose.Schema

const activitySchema = new Schema({
    projectId: {
        type: String
    },
    taskId: {
        type: String
    },
    actionType: {
        type: Number,
        required: true
    },
}, { timestamps: true });

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;

