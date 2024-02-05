import React, { useState } from 'react';
import { Box } from '@mui/material';

import SearchBar from './search-bar';
import FilterBar from './filter-bar';
import SearchResults from './search-results';

const SearchContainer = () => {

    const [projects,setProjects] = useState([]);
    const [tasks , setTasks] = useState([]);

    const handleSearch =  (searchtext) =>{
        fetch(`http://localhost:5000/search/${searchtext}`)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Failed to fetch search results');
          })
          .then(data => {
            console.log("data",data);
            setProjects(data.projects);
            setTasks(data.tasks);
          })
          .catch(error => {
            console.error('Error:', error);
          });
    }
    const handleFilter = () =>{

    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                alignContent: 'center',
                width: '100%',
                alignSelf: 'center'
            }}
        >   
            <Box sx={{
                width: '95%',
                display:'flex',
                padding:'10px',
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center'
            }}>
                <FilterBar/>
                <SearchBar onSearch ={handleSearch}/>
            </Box>
            <SearchResults tasksData={tasks} projectsData = {projects}/>
        </Box>
    );
};

export default SearchContainer;