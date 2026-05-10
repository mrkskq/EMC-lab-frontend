import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    type SelectChangeEvent,
    TextField
} from '@mui/material';
import useCountries from '../../../../hooks/useCountries.ts';
import {useState} from 'react';
import type {AuthorFormData} from '../../../../api/types/author.ts';
import * as React from 'react';

interface FormData {
    name: string;
    surname: string;
    countryId: string;
}

const initialFormData: FormData = {
    name: '',
    surname: '',
    countryId: ''
};

interface AddAuthorDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (data: AuthorFormData) => Promise<void>;
}

const AddAuthorDialog = ({open, onClose, onAdd}: AddAuthorDialogProps) => {
    const {countries} = useCountries();

    const [formData, setFormData] = useState<FormData>(initialFormData);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
    ) => {
        const {name, value} = event.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async () => {
        const payload: AuthorFormData = {
            name: formData.name.trim(),
            surname: formData.surname.trim(),
            countryId: Number(formData.countryId)
        };

        await onAdd(payload);
        setFormData({...initialFormData});
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>Add Author</DialogTitle>
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
                    label='Surname'
                    name='surname'
                    color='secondary'
                    value={formData.surname}
                    onChange={handleChange}
                    fullWidth
                />
                <FormControl margin='dense' fullWidth>
                    <InputLabel color='secondary'>Country</InputLabel>
                    <Select
                        label='Country'
                        name='countryId'
                        value={formData.countryId}
                        onChange={handleChange}
                        variant='outlined'
                        color='secondary'>
                        {countries.map((country) => (
                            <MenuItem key={country.id} value={country.id}>{country.name}, {country.continent}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color='secondary'>Cancel</Button>
                <Button onClick={handleSubmit} variant='contained' color='secondary'>Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddAuthorDialog;
