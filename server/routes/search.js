const express = require('express');
const router = express.Router();
const Project = require('../DB/models/project');
const Task = require('../DB/models/task');

router.get('/suggestions/:searchString' ,async(req,res) => {
  const searchString = req.params.searchString;
  try {
      const projects = await Project.find({
        $or: [
            { projectId: { $regex: new RegExp(searchString, 'i') }},
            { title: { $regex: new RegExp(searchString, 'i') }},
            { description: { $regex: new RegExp(searchString, 'i') }},
        ]
      });

      const tasks = await Task.find({
          $or: [
              { taskId: { $regex: new RegExp(searchString, 'i') }},
              { title: { $regex: new RegExp(searchString, 'i') }},
              { description: { $regex: new RegExp(searchString, 'i') }},
          ]
      });

      const taskTitles = tasks.map(task => task.title);

      const searchSuggestions = [...projectTitles, ...taskTitles];
      console.log(searchSuggestions)
      res.json(searchSuggestions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.get('/:searchString', async (req, res) => {
    const searchString = req.params.searchString;

    try {
        const projects = await Project.find({
            $or: [
                { projectId: { $regex: new RegExp(searchString, 'i') }},
                { title: { $regex: new RegExp(searchString, 'i') }},
                { description: { $regex: new RegExp(searchString, 'i') }},
            ]
        });

        const tasks = await Task.find({
            $or: [
                { taskId: { $regex: new RegExp(searchString, 'i') }},
                { title: { $regex: new RegExp(searchString, 'i') }},
                { description: { $regex: new RegExp(searchString, 'i') }},
            ]
        });

        const combinedResults = {
            projects,
            tasks
        };

        res.json(combinedResults);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
