import React, { useState,useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import SearchBar from './search-bar';
import FilterBar from './filter-bar';
import SearchResults from './search-results';

const SearchContainer = () => {

    const navigate = useNavigate();
    const { searchtext } = useParams(); 
    const [isLoading,setIsloading] = useState(true)
    const [projects,setProjects] = useState([]);
    const [tasks , setTasks] = useState([]);

    useEffect(()=>{
      if(tasks||projects){
        setIsloading(false)
      }
    },[tasks,projects])
    const fetchData = (searchtext) =>{
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
    const handleSearch =  (searchtext) =>{
        setIsloading(true)
        fetchData(searchtext) 
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
                <SearchBar onSearch ={handleSearch}/>
            </Box>
            <Box 
              display='flex' 
              flexDirection='row'
              width='95%'

              >
              <FilterBar/>
              {
              !isLoading?
              <SearchResults  tasksData={tasks} projectsData = {projects}/>:
              null
            }
            </Box>
        </Box>
    );
};

export default SearchContainer;