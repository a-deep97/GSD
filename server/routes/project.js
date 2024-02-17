
const express = require('express');
const router = express.Router();

const Project = require('../DB/models/project');
const {addActivity} = require('./activity');
const generateUniqueNumber = require('../lib/utils/unique_id');
const actionType = require('../lib/constants/action_type');

// Gets a project content
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findOne({ projectId:req.params.id});
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Creates a  unique id
async function generateUniqueID() {
    let unique_id;
    let existingProject;
    while(true){
        unique_id = generateUniqueNumber();
        existingProject = await Project.findOne({ projectId: unique_id });
        if(!existingProject){
            break;
        }
    }
    return unique_id;
}

// Creates a new project
router.post('/', async (req, res) => {

    const unique_id = await generateUniqueID();
    const data = {
        projectId: "P" + String(unique_id),
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        start: req.body.start,
        target: req.body.target
    }
    const project = new Project(data);

    try {
        const newProject = await project.save();
        console.log("successfully submited new project",newProject)
        await addActivity(
            data.projectId,
            null,
            [actionType.NEW_PROJECT])
        res.status(201).json(newProject);
    } catch (error) {
        console.log("Failed to add new project",error.message)
        res.status(400).json({ message: error.message });
    }
});

// Update a project
router.put('/:id', async (req, res) => {
    try {
        const updatedProject = await Project.findOneAndUpdate(
            {projectId: req.params.id},
            req.body,
            {new: true}
        );
         // Adding activities for the updated project
        const actions=[]
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
        
        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        await addActivity(
            req.params.id,
            null,
            actions)
        res.json(updatedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a project
router.delete('/:id', async (req, res) => {
    try {
        const deletedProject = await Project.findOneAndDelete(
            {projectId: req.params.id});
        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/search/:searchString', async (req, res) => {
    const searchString = req.params.searchString;
    console.log(searchString)
    try {
        const projects = await Project.find({
            $or: [
                { projectId: { $regex: new RegExp(searchString,'i')}},
                { title: { $regex: new RegExp(searchString, 'i') } },
                { description: { $regex: new RegExp(searchString, 'i') } },
            ]
        }).limit(5);

        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
