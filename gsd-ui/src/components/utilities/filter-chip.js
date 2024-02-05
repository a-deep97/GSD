import React, { useState } from 'react';
import Chip from '@mui/material/Chip';

const FilterChip = ({ filter }) => {

    const filterLabel = filter.name;
    const [highlighted, setHighlighted] = useState(filter.default);

  const handleClick = () => {
    setHighlighted(!highlighted);
  };

  return (
    <Chip
      label={filterLabel}
      clickable
      color={highlighted ? 'primary' : 'default'}
      onClick={handleClick}
      sx={{
        width: '100px',
        height: '50px'
      }}
    />
  );
};

export default FilterChip;
