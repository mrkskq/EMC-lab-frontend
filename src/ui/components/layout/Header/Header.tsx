import './Header.css';
import {
    AppBar, Box, Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-router';
import {useState} from 'react';
import AuthToggle from '../../auth/AuthToggle/AuthToggle.tsx';
import useAuth from '../../../../hooks/useAuth.ts';

const pages = [
    {path: '/', name: 'home', authenticated: false},
    {path: '/books', name: 'books', authenticated: true},
    {path: '/authors', name: 'authors', authenticated: true},
    {path: '/countries', name: 'countries', authenticated: true}
];

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const {isLoggedIn} = useAuth();
    const visiblePages = pages.filter((page) => !page.authenticated || isLoggedIn);

    return (
        <Box>
            <AppBar position='static' sx={{backgroundColor: 'rebeccapurple'}}>
                <Toolbar sx={{display: 'flex'}}>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        sx={{mr: 2, display: {md: 'none'}}}
                        onClick={() => setDrawerOpen(true)}
                    >
                        <MenuIcon/>
                    </IconButton>

                    <Typography variant='h6' component='div' sx={{mr: 3}}>
                        E-Library
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {visiblePages.map((page) => (
                            <Link key={page.name} to={page.path}>
                                <Button sx={{my: 2, color: 'white', display: 'block'}}>
                                    {page.name}
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    <Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'flex-end'}}>
                        <AuthToggle/>
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer anchor='left' open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{width: 240}} role='presentation' onClick={() => setDrawerOpen(false)}>
                    <List>
                        {visiblePages.map((page) => (
                            <ListItem key={page.name} disablePadding>
                                <ListItemButton component={Link} to={page.path}>
                                    <ListItemText primary={page.name} sx={{textTransform: 'capitalize'}}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
};

export default Header;
