import { Outlet, useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import './style.scss';

export default function Layout() {
    const nav = useNavigate();

    return (
        <Box id="home">

            <AppBar position='static' className='navbar'>
                <Toolbar>
                    <Box onClick={() => nav('cashback')}>
                        <Typography variant='h5'> cashback </Typography>
                    </Box>
                    <Box onClick={() => nav('historico')}>
                        <Typography variant='h5'> histórico </Typography>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box id="content">
                <Outlet />
            </Box>
        </Box>
    )
};


