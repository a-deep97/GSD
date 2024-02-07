import React from 'react';
import { Box } from '@mui/material';
import FilterChip from '../utilities/filter-chip';
import filterOptions from '../../constants/filter-options';

const FilterBar = () => {

    return (
        <Box 
            container spacing={2} 
            display='flex'
            flexDirection='column'
            alignContent='center'
            alignItems='center'
        >
            {filterOptions.map((filter, index) => (
                <Box item key={index}
                    padding='10px'
                >
                    <FilterChip filter={filter} />
                </Box>
            ))}
        </Box>

    );
};

export default FilterBar;