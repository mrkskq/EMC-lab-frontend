import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Country } from '../../../../api/types/country.ts';
import { useNavigate } from "react-router-dom";

interface CountryCardProps {
    country: Country;
}

const CountryCard = ({ country }: CountryCardProps) => {
    const navigate = useNavigate();

    return (
        <Card sx={{ maxWidth: 300 }}>
            <CardContent>
                <Typography variant='h5'>{country.name}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button
                    startIcon={<InfoIcon/>}
                    onClick={() => navigate(`/countries/${country.id}`)}
                    color='secondary'
                >
                    Info
                </Button>

                <Box>
                    <Button startIcon={<EditIcon/>} color='warning'>Edit</Button>
                    <Button startIcon={<DeleteIcon/>} color='error'>Delete</Button>
                </Box>
            </CardActions>
        </Card>
    );
};

export default CountryCard;