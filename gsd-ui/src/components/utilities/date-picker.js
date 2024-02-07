import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo/DemoContainer';
import {AdapterDayjs}  from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {Box,TextField} from '@mui/material';
import DateType from '../../constants/date-type';

const CustomDatePicker = ({Date,handleDateChange,dateType}) => {

    const defaultCurrentDate = dayjs();
    const defaultTargetDate = defaultCurrentDate.add(1,'week');

    const [date,setDate] = useState(dayjs(Date))
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
                defaultValue={ dateType === DateType.START? defaultCurrentDate : defaultTargetDate}
                value={date}
                onChange={(newDate) => {handleChange(newDate)}}
                slotProps={{ textField: { size: 'small' } }}
                />
            </LocalizationProvider>
        </Box>
    );
};

export default CustomDatePicker;