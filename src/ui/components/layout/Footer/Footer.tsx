import { AppBar, Box, Toolbar, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box component='footer' sx={{ mt: 'auto' }}>
            <AppBar position='static' component='div' sx={{ backgroundColor: 'rebeccapurple' }}>
                <Toolbar sx={{ justifyContent: 'center' }}>
                    <Typography variant='body2'>
                        © 2026 EMC-Lab — E-Library. All rights reserved.
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Footer;