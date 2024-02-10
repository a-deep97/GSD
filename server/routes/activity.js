const express = require('express');
const Activity = require('../DB/models/activity');
const router = express.Router();

router.get('/', async (req,res)=>{
    try {
        const activities = await Activity.find();
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const addActivity = async (projectId,taskId,actions) => {

    console.log(projectId,taskId,actions)
    try{
        const activites = await Promise.all(actions.map(async (action)=>{
            console.log("action:",action)
            const activityData = {
                projectId: projectId,
                taskId: taskId,
                actionType: action
            }
            const activity = new Activity(activityData);
            console.log(activity)
            activity.save()
            console.log("successfully submit new activities",activity)
        }));
    }catch (error) {
        console.log("Failed to add new activity",error.message)
        throw new Error(error.message)
    }
}

module.exports = {
    addActivity,
    router
};
