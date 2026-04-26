import './CountriesPage.css'
import useCountries from '../../../hooks/useCountries.ts';
import { Box, CircularProgress } from '@mui/material';
import CountryGrid from '../../components/country/CountryGrid/CountryGrid.tsx';

const CountriesPage = () => {
    const { countries, loading } = useCountries();

    return (
        <Box className='countries-box'>
            {loading && (
                <Box className='progress-box'>
                    <CircularProgress/>
                </Box>
            )}
            {!loading && <CountryGrid countries={countries}/>}
        </Box>

    );
};

export default CountriesPage;
