
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router()
const PORT = process.env.PORT || 5000;


const dbUrl = process.env.DB_URL;

// Connect to MongoDB using Mongoose
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const tasksRouter = require('./routes/tasks');
const projectsRouter = require('./routes/projects');
const projectRouter = require('./routes/project');
const searchRouter = require('./routes/search');
const taskRouter = require('./routes/task');

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
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
