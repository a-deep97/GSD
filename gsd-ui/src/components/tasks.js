import React from 'react';
import TopNavbar from './utilities/top-navbar';
import TasksContainer from './view_containers/tasks-container';

const TasksPage = () => {
    return (
        <div className='taska-page'>
            <TopNavbar/>
            <TasksContainer/>
        </div>
    );
};

export default TasksPage;