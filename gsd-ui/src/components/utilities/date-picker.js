import React, { useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo/DemoContainer';
import {AdapterDayjs}  from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {Box,TextField} from '@mui/material';

const CustomDatePicker = ({Date,handleDateChange,dateType}) => {
    const [date,setDate] = useState(Date)

    const handleClick = (e) =>{
        e.stopPropagation()
    }
    const handleChange = (newDate) =>{
        handleDateChange(newDate);
        setDate(newDate);
    } 
    return (
        <Box onClick={(e) => { handleClick(e) }} marginTop={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                defaultValue={dayjs('2022-04-17')}
                onChange={handleDateChange}
                />
            </LocalizationProvider>
        </Box>
    );
};

export default CustomDatePicker;