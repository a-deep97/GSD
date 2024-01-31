import React from 'react';
import ProjectListContainer from './project-list-container';

const ProjetsContainer = () => {
    return (
        <div className='projects-container'>
            <ProjectListContainer/>
            <ProjectListContainer/>
            <ProjectListContainer/>
            <ProjectListContainer/>
            <ProjectListContainer/>
        </div>
    );
};

export default ProjetsContainer;