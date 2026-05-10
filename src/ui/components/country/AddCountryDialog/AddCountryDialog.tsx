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
import type {CountryFormData} from '../../../../api/types/country.ts';
import * as React from 'react';

interface FormData {
    name: string;
    continent: string;
}

const initialFormData: FormData = {
    name: '',
    continent: ''
};

interface AddCountryDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (data: CountryFormData) => Promise<void>;
}

const AddCountryDialog = ({open, onClose, onAdd}: AddCountryDialogProps) => {

    const [formData, setFormData] = useState<FormData>(initialFormData);

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

        await onAdd(payload);
        setFormData({...initialFormData});
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>Add Country</DialogTitle>
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
                <Button onClick={handleSubmit} variant='contained' color='secondary'>Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddCountryDialog;
