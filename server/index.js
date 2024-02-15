
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const router = express.Router()
const PORT = process.env.PORT || 5000;

const dbUrl = process.env.DB_URL;

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

// creating connection to mongodb with mongoose
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
const {router:activityRouter} = require('./routes/activity');
const protectedRouter = require('./routes/auth');
const userRouter = require('./routes/user');


app.use('/user',userRouter);

app.use('/auth',protectedRouter);

app.use(express.json());
app.use('/activities',activityRouter);
app.use('/tasks',tasksRouter);
app.use('/projects',projectsRouter);
app.use('/project',projectRouter);
app.use('/search',searchRouter);
app.use('/task',taskRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
