import React, { useState } from 'react';
import dayjs from 'dayjs';
import {Box} from '@mui/material';

const CustomDatePicker = ({Date,handleDateChange}) => {
    const [date,setDate] = useState(Date)

    const handleClick = (e) =>{
        e.stopPropagation()
    }
    const handleChange = (newDate) =>{
        handleDateChange(newDate);
        setDate(newDate);
    } 
    return (
        <Box>This is date picker</Box>
    );
};

export default CustomDatePicker;