import React ,{useState} from 'react';
import { TextField,
        InputAdornment,
        IconButton,
        Box,
        List,
        ListItem,
        Divider,
        ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({onSearch}) => {
    const [searchText, setSearchText] = useState('');
    const [suggestions, setSuggestions] = useState([])

    const fetchSuggestions = (input) => {
        debugger
        fetch(`http://localhost:5000/search/suggestions/${input}`)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Failed to fetch search results');
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
        setSearchText(input);
        if (input.trim() !== '') {
            fetchSuggestions(input);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchText(suggestion.projectId);
        setSuggestions([]);
    };
    const handleSearch = () => {
        onSearch(searchText);
    };

  return (
    <Box>
        <TextField
            variant="outlined"
            placeholder="Search"
            value={searchText}
            onChange={handleInputChange}
            InputProps={{
                endAdornment: (
                <InputAdornment position="end">
                    <IconButton onClick={handleSearch}>
                    <SearchIcon />
                    </IconButton>
                </InputAdornment>
                ),
            }}
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

export default SearchBar;