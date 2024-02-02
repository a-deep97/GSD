import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import CreateTaskForm from '../forms/create-task-form';

const CreateTaskButton = () => {
    const [formActive,setFormActive] = useState(false)
    const onClick = () =>{
        setFormActive(true)
    }
    return (
        <Box>
            <Button variant="contained" color="primary" onClick={onClick}>
                create task
            </Button>
            { formActive?
                <CreateTaskForm formActive={formActive} setFormActive={setFormActive}/>:
                null
            }
        </Box>
    );
};

export default CreateTaskButton;