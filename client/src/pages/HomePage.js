import React from 'react';
import { Box, Typography, Card, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const HomePage = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const handleLogout = () => {
        auth.logout();
        navigate('/login', { replace: true });
    };
    return (
        <Box
            component={Card}
            sx={{
                display: 'flex',
                flexFlow: 'column nowrap',
                justifyContent: 'center',
                alignItems: 'center',
                rowGap: '10px',
                width: 600,
                height: 200,
            }}
        >
            <Typography variant="h4"> Welcome to the Application</Typography>
            <Button variant="outlined" sx={{ maxWidth: 100 }} onClick={handleLogout}>
                Logout
            </Button>
        </Box>
    );
};

export default HomePage;
