import type { Country } from '../../../../api/types/country.ts';
import { Grid } from '@mui/material';
import CountryCard from '../CountryCard/CountryCard.tsx';

interface CountryGridProps {
    countries: Country[];
}

const CountryGrid = ({ countries }: CountryGridProps) => {
    return (
        <Grid container spacing={{ xs: 2, md: 3 }}>
            {countries.map((country) => (
                <Grid key={country.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <CountryCard country={country}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default CountryGrid;
