import React from 'react';
import TopNavbar from './utilities/top-navbar';
import ProjetsContainer from './view_containers/projects-container';

const ProjectsPage = () => {
    return (
        <div>
            <TopNavbar/>
            <ProjetsContainer/>
        </div>
    );
};

export default ProjectsPage;