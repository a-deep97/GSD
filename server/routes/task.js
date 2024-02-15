
const express = require('express');
const router = express.Router();

const Task = require('../DB/models/task');
const generateUniqueNumber = require('../lib/utils/unique_id');
const actionType = require('../lib/constants/action_type');
const {addActivity} = require('./activity');

// Gets a task content
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findOne({taskId:req.params.id});
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Creates a  unique id
async function generateUniqueID() {
    let unique_id;
    let existingTask;
    while(true){
        unique_id = generateUniqueNumber();
        existingTask = await Task.findOne({ taskId: unique_id });
        if(!existingTask){
            break;
        }
    }
    return unique_id;
}

// Creates a new task
router.post('/', async (req, res) => {

    const unique_id = await generateUniqueID();
    const data = {
        taskId: "T" + String(unique_id),
        title: req.body.title,
        projectId: req.body.projectId,
        description: req.body.description,
        status: req.body.status,
        start: req.body.start,
        target: req.body.target
    }
    const task = new Task(data);

    try {
        const newTask = await task.save();
        
        await addActivity(
            null,
            data.taskId,
            [actionType.NEW_TASK])
        
            res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a task
router.put('/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findOneAndUpdate(
            {taskId: req.params.id},
            req.body,
            {new: true}
        );
        // Adding activities for the updated task
        actions=[]
        Object.entries(req.body).forEach(([key,value])=>{
            switch(key){
                case 'status': 
                    actions.push(actionType.UPDATED_STATUS);
                    break;
                case 'start': 
                    actions.push(actionType.UPDATED_START);
                    break;
                case 'target': 
                    actions.push(actionType.UPDATED_TARGET);
                    break;
                case 'description': 
                    actions.push(actionType.UPDATED_DESCRIPTION);
                    break;
                case 'title': 
                    activities.push(actionType.UPDATED_TITLE);
                    break;
            }
        });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await addActivity(
            null,
            req.params.id,
            actions)

        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findOneAndDelete(
            {taskId: req.params.id});
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
