import { Box, Container, Typography } from '@mui/material';

const HomePage = () => {
    return (
        <Box sx={{ m: 0, p: 0 }}>
            <Container maxWidth='xl' sx={{ mt: 3, py: 3, textAlign: 'center' }}>
                <Typography variant='h4' gutterBottom>
                    Welcome to E-Library 📖
                </Typography>
                <Typography variant='body1' sx={{ mb: 4 }}>
                    Explore our collection of books from authors around the world.
                    <br/>
                    Browse by title, discover the authors behind your favorite reads,
                    and find out which countries they come from.
                </Typography>
            </Container>
        </Box>

    );
};

export default HomePage;
