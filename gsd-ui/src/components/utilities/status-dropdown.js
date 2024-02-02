import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import Status from '../../constants/status';

const StatusDropdown = ({taskStatus,handleStatusDropdown}) => {

    const [currentStatus,setCurrentStatus] = useState(taskStatus)
    const handleDropdown = (e) =>{
        e.stopPropagation()
        debugger
        setCurrentStatus(e.target.value)
        handleStatusDropdown()
    }
    const handleClick = (e) =>{
        e.stopPropagation()
    }
    return (
        <FormControl style={{
            width: '140px',
            height: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '10px',
        }}
        >
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currentStatus}
                label={currentStatus}
                onChange={(e) => (handleDropdown(e))}
                onClick={(e) =>{handleClick(e)}}
                style={{
                    width: '100%',
                    height: '30px',
                    paddingTop: '0',
                    paddingBottom: '0',
                    paddingLeft: '0',
                }}
                >
                <MenuItem value={10}>
                    <Typography variant='body'>
                        {Status.None}
                    </Typography>
                </MenuItem>
                <MenuItem value={20}>
                    <Typography variant='body'>
                        {Status.Planned}
                    </Typography>
                </MenuItem>
                <MenuItem value={30}>
                    <Typography variant='body'>
                        {Status.Progress}
                    </Typography>
                </MenuItem>
                <MenuItem value={40}>
                    <Typography variant='body'>
                        {Status.Completed}
                    </Typography>
                </MenuItem>
                <MenuItem value={50}>
                    <Typography variant='body'>
                        {Status.Backlog}
                    </Typography>
                </MenuItem>
            </Select>
        </FormControl>
    );
};

export default StatusDropdown;
