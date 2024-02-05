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
        debugger
        setSearchText(suggestion);
        setSuggestions([]);
    };
    const handleSearch = () => {
        setSuggestions([]);
        onSearch(searchText);
    };

  return (
    <Box sx={{
        display:'flex',
        flexDirection: 'column',
        alignItems:'center',
        alignSelf: 'center',
        width:'400px',
    }}>
        <TextField
            variant="outlined"
            placeholder="Search"
            value={searchText}
            width = '90%'
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
            <Box 
                sx={{ 
                    position: 'relative', 
                    width: '100%',
                }}
            >
                <List sx={{ 
                    position: 'absolute', 
                    bgcolor: 'background.paper',
                    width: '100%', 
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    zIndex: 1 
                }}>
                    {suggestions.map((suggestion) => (
                    <React.Fragment key={suggestion.id}>
                        <ListItem
                             sx={{
                                backgroundColor: 'rgba(0,0,0,0.2)',
                                width: '80%',
                                '&:hover': {
                                    backgroundColor: 'rgba(0,0,0,0.4)',
                                },
                             }} 
                             onClick={() => handleSuggestionClick(suggestion)}>
                            <ListItemText primary={suggestion} />
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