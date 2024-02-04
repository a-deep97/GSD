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
            console.log(data);
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
        <Box width='100%'>
            <SearchBar onSearch ={handleSearch}/>
            <FilterBar/>
            <SearchResults tasks={tasks} projects = {projects}/>
        </Box>
    );
};

export default SearchContainer;