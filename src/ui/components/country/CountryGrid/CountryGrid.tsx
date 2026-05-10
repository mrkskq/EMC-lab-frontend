import type { Country,CountryFormData } from '../../../../api/types/country.ts';
import { Grid } from '@mui/material';
import CountryCard from '../CountryCard/CountryCard.tsx';

interface CountryGridProps {
    countries: Country[],
    onEdit: (id: number, data: CountryFormData) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

const CountryGrid = ({ countries, onEdit, onDelete }: CountryGridProps) => {
    return (
        <Grid container spacing={{ xs: 2, md: 3 }}>
            {countries.map((country) => (
                <Grid key={country.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <CountryCard country={country} onEdit={onEdit} onDelete={onDelete}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default CountryGrid;
