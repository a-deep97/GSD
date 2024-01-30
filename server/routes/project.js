
const express = require('express');
const router = express.Router();

const Project = require('../DB/models/project');
const generateUniqueNumber = require('../lib/unique_id');

// Gets a project content
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
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
        existingProject = await Project.findOne({ project_id: unique_id });
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
        projectId: String(unique_id),
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        owner: req.body.owner,        
    }
    console.log(data)
    const project = new Project(data);

    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (error) {
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
        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
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

module.exports = router;
