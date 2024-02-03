import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import Status from '../../constants/status';

const StatusDropdown = ({taskStatus,handleStatusDropdown ,width,height}) => {

    const [currentStatus,setCurrentStatus] = useState(taskStatus)
    const handleDropdown = (e) =>{
        e.stopPropagation()
        setCurrentStatus(e.target.value)
        handleStatusDropdown(e.target.value)
    }
    const handleClick = (e) =>{
        e.stopPropagation()
    }
    return (
        <FormControl style={{
            width: width? width : '140px',
            height: height ? height : '40px',
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
                label='status'
                onChange={(e) => (handleDropdown(e))}
                onClick={(e) =>{handleClick(e)}}
                style={{
                    width: '100%',
                    height: height ? height : '40px',
                    paddingTop: '0',
                    paddingBottom: '0',
                    paddingLeft: '0',
                }}
                >
                <MenuItem value={Status.None}>
                    <Typography variant='body'>
                        {Status.None}
                    </Typography>
                </MenuItem>
                <MenuItem value={Status.Planned}>
                    <Typography variant='body'>
                        {Status.Planned}
                    </Typography>
                </MenuItem>
                <MenuItem value={Status.Progress}>
                    <Typography variant='body'>
                        {Status.Progress}
                    </Typography>
                </MenuItem>
                <MenuItem value={Status.Completed}>
                    <Typography variant='body'>
                        {Status.Completed}
                    </Typography>
                </MenuItem>
                <MenuItem value={Status.Backlog}>
                    <Typography variant='body'>
                        {Status.Backlog}
                    </Typography>
                </MenuItem>
            </Select>
        </FormControl>
    );
};

export default StatusDropdown;
