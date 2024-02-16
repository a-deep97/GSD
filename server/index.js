
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
const userRouter = require('./routes/user');
const authenticateToken = require('./lib/middlewares/auth');

app.use(express.json());
app.use('/user',userRouter);

app.use('/activities',authenticateToken,activityRouter);
app.use('/tasks',authenticateToken,tasksRouter);
app.use('/projects',authenticateToken,projectsRouter);
app.use('/project',authenticateToken,projectRouter);
app.use('/search',authenticateToken,searchRouter);
app.use('/task',authenticateToken,taskRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
