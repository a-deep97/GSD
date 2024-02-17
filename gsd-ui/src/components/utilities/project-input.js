/** This component is for an input field for project 
 * in the task view or form , it will be used to 
 * dynamically search project
*/

import {Select,MenuItem,Menu,} from '@mui/material';

import React, { useState,useRef  } from 'react';
import { InputLabel, Box ,IconButton , TextField, List,ListItem,ListItemText,Divider } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { jwtToken } from '../../lib/jwt';

const ProjectInput = ({currentValue,setInputValue}) => {
  const [searchInput, setSearchInput] = useState(currentValue);
  const [suggestions, setSuggestions] = useState([]);
  const [currentProjectValue,setCurrentProjectValue] = useState(currentValue);
  const [isProjectSearchDisabled,SetIsProjectSearchDisabled] = useState(true);
  const inputRef = useRef(null);

  const fetchSuggestions = (input) => {
    
    fetch(`http://localhost:5000/project/search/${input}`,{
      method: 'GET',
      headers: {
          'Authorization' : 'Bearer ' + jwtToken()
      },
      credentials: 'include',
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch projects');
      })
      .then(data => {
        console.log(data);
        setSuggestions(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  const handleInputChange = (e) => {
    const input = e.target.value;
    setSearchInput(input);
    if (input.trim() !== '') {
      fetchSuggestions(input);
    } else {
      setSuggestions([]);
    }
  };
  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion.projectId + ' : ' +  suggestion.title);
    setInputValue(suggestion.projectId)
    SetIsProjectSearchDisabled(true)
    setSuggestions([]);
  };
  const handleInputFieldClick = (e) =>{
    e.preventDefault();
    SetIsProjectSearchDisabled(false);
  }
  const handleClearButtonClick = () =>{
    SetIsProjectSearchDisabled(false)
    setSearchInput('');
    setSuggestions([]);
    inputRef.current.focus();
  } 
  return (
    <Box>
      <Box 
        display='flex'
        flexDirection='row'
      >
        <TextField
          variant="outlined"
          disabled={isProjectSearchDisabled}
          ref={inputRef}
          placeholder="Choose a project..."
          value={searchInput}
          onChange={handleInputChange}
          onFocus={handleInputFieldClick}
          sx={{
            width: '90%',
          }}
        />
        <IconButton onClick={handleClearButtonClick}>
            <ClearIcon />
        </IconButton>
      </Box>
      {suggestions.length > 0 && (
        <Box 
            sx={{ 
                position: 'relative', 
                width: '100%',
            }}
        >
            <List sx={{ 
                position: 'absolute', 
                bgcolor: 'background.paper',
                width: '400px', 
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                zIndex: 2 ,
            }}>
                {suggestions.map((suggestion) => (
                <React.Fragment key={suggestion.id}>
                    <ListItem
                          sx={{
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            width: '100%',
                            '&:hover': {
                                backgroundColor: 'rgba(0,0,0,0.4)',
                            },
                          }} 
                          onClick={() => handleSuggestionClick(suggestion)}>
                        <ListItemText primary={suggestion.projectId + ' : ' + suggestion.title} />
                    </ListItem>
                    <Divider />
                </React.Fragment>
                ))}
            </List>
        </Box>
      )}
    </Box>
  );
};

export default ProjectInput;
