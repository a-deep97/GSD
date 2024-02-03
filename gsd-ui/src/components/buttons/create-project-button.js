import React ,{useState} from 'react';
import { Button,Box } from '@mui/material';
import CreateProjectForm from '../forms/create-project-form';

const CreateProjectButton = () => {
    const [formActive,setFormActive] = useState(false)
    const onClick = () =>{
        setFormActive(true)
    }
    return (
        <Box>
            <Button variant="contained" color="primary" onClick={onClick}>
                create new project
            </Button>
            { formActive?
                <CreateProjectForm formActive={formActive} setFormActive={setFormActive}/>:
                null
            }
        </Box>
    );
};

export default CreateProjectButton;