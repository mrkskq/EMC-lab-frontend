import useBookDetails from '../../../hooks/useBookDetails.ts';
import { Link, useNavigate, useParams } from 'react-router';
import {
    Avatar, Box, Breadcrumbs, Button, Chip, CircularProgress, Grid, Paper, Stack, Typography
} from '@mui/material';
import { ArrowBack, Person, FavoriteBorder, Share } from '@mui/icons-material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import GetAppIcon from '@mui/icons-material/GetApp';
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

const BookDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { bookDetails } = useBookDetails(id);

    if (!bookDetails) {
        return <Box className='progress-box'><CircularProgress/></Box>;
    }

    return (
        <Box>
            <Breadcrumbs aria-label='breadcrumb' sx={{ mb: 3 }}>
                <Link to='/books' style={{ textDecoration: 'none', color: 'inherit' }}
                      onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                      onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                >
                    Books
                </Link>
                <Typography color='text.primary'>{bookDetails.name}</Typography>
            </Breadcrumbs>

            <Paper elevation={2} sx={{ p: 4, borderRadius: 4 }}>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mb: 4,
                            bgcolor: 'background.paper',
                            p: 3,
                            borderRadius: 3,
                            boxShadow: 1
                        }}>
                            <Avatar
                                src='/placeholder-book.jpg'
                                variant='rounded'
                                sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                            >
                                <AutoStoriesIcon sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}/>
                            </Avatar>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 9 }}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant='h3' gutterBottom sx={{ fontWeight: 600 }}>
                                {bookDetails.name}
                            </Typography>

                            <Stack direction='row' spacing={1} sx={{ mb: 3 }}>
                                <Chip
                                    icon={<Person/>}
                                    label={`Author: ${bookDetails.author.name} ${bookDetails.author.surname}`}
                                    color='secondary'
                                    variant='outlined'
                                    sx={{ p: 2 }}
                                />
                            </Stack>

                            <Stack direction='row' spacing={1} sx={{ mb: 3 }}>
                                <Chip
                                    icon={<BookmarkIcon/>}
                                    label={`Genre: ${bookDetails.category}`}
                                    color='secondary'
                                    variant='outlined'
                                    sx={{ p: 2 }}
                                />
                            </Stack>

                            <Stack direction='row' spacing={1} sx={{ mb: 3 }}>
                                <Chip
                                    icon={bookDetails.availableCopies > 0
                                        ? <CheckCircleIcon/>
                                        : <CancelIcon/>
                                    }
                                    label={bookDetails.availableCopies > 0
                                        ? `Available: ${bookDetails.availableCopies} copies`
                                        : 'Not Available'
                                    }
                                    color={bookDetails.availableCopies > 0 ? 'success' : 'error'}
                                    variant='outlined'
                                    sx={{ p: 2 }}
                                />
                            </Stack>

                            <Stack direction='row' spacing={1} sx={{ mb: 3 }}>
                                <Chip
                                    icon={bookDetails.state === 'GOOD'
                                        ? <SentimentSatisfiedAltIcon/>
                                        : <SentimentVeryDissatisfiedIcon/>
                                    }
                                    label={`Condition: ${bookDetails.state}`}
                                    color={bookDetails.state === 'GOOD' ? 'success' : 'error'}
                                    variant='outlined'
                                    sx={{ p: 2 }}
                                />
                            </Stack>
                        </Box>
                    </Grid>

                    <Grid size={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Stack direction='row' spacing={2}>
                            <Button variant='contained' color='secondary' startIcon={<GetAppIcon/>} size='large' disabled={bookDetails.availableCopies === 0}>
                                Borrow
                            </Button>
                            <Button variant='outlined' color='secondary' startIcon={<FavoriteBorder/>}>
                                Wishlist
                            </Button>
                            <Button variant='outlined' startIcon={<Share/>}>
                                Share
                            </Button>
                        </Stack>
                        <Button variant='outlined' startIcon={<ArrowBack/>} onClick={() => navigate('/books')} color='secondary'>
                            Back to Books
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default BookDetailsPage;
