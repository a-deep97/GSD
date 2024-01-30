const express = require('express');
const app = express();
const router = express.Router()
const PORT = process.env.PORT || 5000;
const tasksRouter = require('./routes/tasks');
const projectsRouter = require('./routes/projects');
const projectRouter = require('./routes/project');
const searchRouter = require('./routes/search');
const taskRouter = require('./routes/task');

//const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/GSD_DB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/tasks',tasksRouter);
app.use('/tasks',tasksRouter);
app.use('/projects',projectsRouter);
app.use('/project',projectRouter);
app.use('/search',searchRouter);
app.use('/task',taskRouter);


app.get("/api",(req,res)=>{
     res.json({"users":["1","2","3"]})
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
