
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const router = express.Router()
const PORT = process.env.PORT || 5000;


const dbUrl = process.env.DB_URL;

app.use(cors());

// Connect to MongoDB using Mongoose
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const userRouter = require('./routes/user');   
const tasksRouter = require('./routes/tasks');
const projectsRouter = require('./routes/projects');
const projectRouter = require('./routes/project');
const searchRouter = require('./routes/search');
const taskRouter = require('./routes/task');
const {router:activityRouter} = require('./routes/activity');

app.use(express.json());
app.use('/',userRouter);
app.use('/activities',activityRouter);
app.use('/tasks',tasksRouter);
app.use('/projects',projectsRouter);
app.use('/project',projectRouter);
app.use('/search',searchRouter);
app.use('/task',taskRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
