import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';

import TopNavbar from './utilities/top-navbar';
import SearchContainer from './search-containers/search-container';

const SearchPage = () => {
    const [tasks,setTasks] = useState([]);
    const [projects,setProjects] = useState([]);
    const [isLoading,setIsloading] = useState(true);
    const { searchtext } = useParams(); 
   /* 
    useEffect(
        ()=>{
           if(searchtext){
            fetchData(searchtext)
          }else{
            setIsloading(false)
          }
        },[]);
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
              setIsloading(false)
            })
            .catch(error => {
              console.error('Error:', error);
            });
      }
    */
    return (
        <div>
            <TopNavbar/>
            <SearchContainer/>       
        </div>
    );
};

export default SearchPage;