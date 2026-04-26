import useCountryDetails from '../../../hooks/useCountryDetails.ts';
import { Link, useNavigate, useParams } from 'react-router';
import {
    Avatar, Box, Breadcrumbs, Button, Chip, CircularProgress, Grid, Paper, Stack, Typography
} from '@mui/material';
import { ArrowBack, Person, Public } from '@mui/icons-material';
import LocationPinIcon from "@mui/icons-material/LocationPin";

const CountryDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { countryDetails } = useCountryDetails(id);

    if (!countryDetails) {
        return <Box className='progress-box'><CircularProgress/></Box>;
    }

    return (
        <Box>
            <Breadcrumbs aria-label='breadcrumb' sx={{ mb: 3 }}>
                <Link to='/countries' style={{ textDecoration: 'none', color: 'inherit' }}
                      onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                      onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                >
                    Countries
                </Link>
                <Typography color='text.primary'>{countryDetails.name}</Typography>
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
                                <Public sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}/>
                            </Avatar>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 9 }}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant='h3' gutterBottom sx={{ fontWeight: 600 }}>
                                {countryDetails.name}
                            </Typography>

                            <Stack direction='row' spacing={1} sx={{ mb: 3 }}>
                                <Chip
                                    icon={<LocationPinIcon/>}
                                    label={countryDetails.continent}
                                    color='secondary'
                                    variant='outlined'
                                    sx={{ p: 2 }}
                                />
                            </Stack>
                        </Box>
                    </Grid>

                    <Grid size={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Stack direction='row' spacing={2}>
                            <Button variant='contained' color='secondary' startIcon={<Person/>} size='large'>
                                View authors from {`${countryDetails.name}`}
                            </Button>
                        </Stack>
                        <Button variant='outlined' startIcon={<ArrowBack/>} onClick={() => navigate('/countries')} color='secondary'>
                            Back to Countries
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default CountryDetailsPage;
