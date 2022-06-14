import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const Layout = ({ children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#e8eaf6',
            }}
        >
            <Outlet />
        </Box>
    );
};

export default Layout;
