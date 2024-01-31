import React from 'react';
import TaskListContainer from './task-list-container';

const TasksContainer = () => {
    return (
        <div className='tasks-container'>
            <TaskListContainer/>
            <TaskListContainer/>
            <TaskListContainer/>
            <TaskListContainer/>
            <TaskListContainer/>
        </div>
    );
};

export default TasksContainer;