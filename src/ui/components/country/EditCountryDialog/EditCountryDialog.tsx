import type {Country, CountryFormData} from '../../../../api/types/country.ts';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    type SelectChangeEvent,
    TextField
} from '@mui/material';
import {useState} from 'react';
import * as React from 'react';

interface FormData {
    name: string;
    continent: string;
}

interface EditCountryDialogProps {
    country: Country;
    open: boolean;
    onClose: () => void;
    onEdit: (id: number, data: CountryFormData) => Promise<void>;
}

const EditContinentDialog = ({country, open, onClose, onEdit}: EditCountryDialogProps) => {

    const [formData, setFormData] = useState<FormData>({
        name: country.name,
        continent: country.continent
    });

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
    ) => {
        const {name, value} = event.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async () => {
        const payload: CountryFormData = {
            name: formData.name.trim(),
            continent: formData.continent.trim()
        };

        await onEdit(country.id, payload);
        setFormData({...formData});
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>Edit Country</DialogTitle>
            <DialogContent>
                <TextField
                    margin='dense'
                    label='Name'
                    name='name'
                    color='secondary'
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin='dense'
                    label='Continent'
                    name='continent'
                    color='secondary'
                    value={formData.continent}
                    onChange={handleChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color='secondary'>Cancel</Button>
                <Button onClick={handleSubmit} variant='contained' color='secondary'>Edit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditContinentDialog;
