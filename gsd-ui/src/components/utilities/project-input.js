/** This component is for an input field for project 
 * in the task view or form , it will be used to 
 * dynamically search project
*/

import React, { useState } from 'react';
import { TextField, Box, List, ListItem, ListItemText, Divider } from '@mui/material';

const ProjectInput = ({currentValue,setInputValue}) => {
  const [searchInput, setSearchInput] = useState(currentValue);
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = (input) => {
    fetch(`http://localhost:5000/project/search/${input}`)
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
    setSearchInput("P"+ suggestion.projectId);
    setInputValue(suggestion.projectId)
    setSuggestions([]);
  };

  return (
    <Box>
      <TextField
        label="Project"
        variant="standard"
        value={searchInput}
        onChange={handleInputChange}
      />
      {suggestions.length > 0 && (
        <Box sx={{ position: 'relative' }}>
          <List sx={{ position: 'absolute', width: '100%', bgcolor: 'background.paper', zIndex: 1 }}>
            {suggestions.map((suggestion) => (
              <React.Fragment key={suggestion.id}>
                <ListItem button onClick={() => handleSuggestionClick(suggestion)}>
                  <ListItemText primary={suggestion.title} />
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
