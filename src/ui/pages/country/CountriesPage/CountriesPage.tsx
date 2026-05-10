import './CountriesPage.css'
import useCountries from '../../../../hooks/useCountries.ts';
import { Alert, Box, Button, CircularProgress, Snackbar, Typography } from '@mui/material';
import CountryGrid from '../../../components/country/CountryGrid/CountryGrid.tsx';
import { useState } from 'react';
import type {CountryFormData} from "../../../../api/types/country";
import AddCountryDialog from "../../../components/country/AddCountryDialog/AddCountryDialog.tsx";
import useAuth from '../../../../hooks/useAuth.ts';
import AddIcon from '@mui/icons-material/Add';

const CountriesPage = () => {
    const { user } = useAuth();
    const isAdmin = user?.roles.includes('ROLE_ADMINISTRATOR') ?? false;

    const { countries, loading, onAdd, onEdit, onDelete } = useCountries();

    const [addCountryDialogOpen, setAddCountryDialogOpen] = useState<boolean>(false);

    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
        open: false,
        message: ''
    });

    const handleAdd = async (data: CountryFormData) => {
        try {
            await onAdd(data);
        } catch (err) {
            setSnackbar({
                open: true,
                message: err instanceof Error ? err.message : 'Failed to add country.'
            });
        }
    };

    return (
        <Box className='countries-box'>
            {loading && (
                <Box className='progress-box'>
                    <CircularProgress/>
                </Box>
            )}
            {!loading &&
                <>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, position: 'relative' }}>
                        <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
                            ALL COUNTRIES
                        </Typography>
                        {isAdmin && (
                            <Box sx={{ position: 'absolute', right: 0 }}>
                                <Button startIcon={<AddIcon/>} variant='contained' color='secondary' onClick={() => setAddCountryDialogOpen(true)}>
                                    Add Country
                                </Button>
                            </Box>
                        )}
                    </Box>
                    <CountryGrid countries={countries} onEdit={onEdit} onDelete={onDelete}/>
                    <Snackbar
                        open={snackbar.open}
                        autoHideDuration={3000}
                        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    >
                        <Alert
                            severity='error'
                            onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}>
                            {snackbar.message}
                        </Alert>
                    </Snackbar>
                    <AddCountryDialog
                        open={addCountryDialogOpen}
                        onClose={() => setAddCountryDialogOpen(false)}
                        onAdd={handleAdd}
                    />
                </>}
        </Box>

    );
};

export default CountriesPage;
