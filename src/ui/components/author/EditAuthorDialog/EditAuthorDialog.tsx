import type {Author, AuthorFormData} from '../../../../api/types/author.ts';
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
import {useState} from 'react';
import * as React from 'react';
import useCountries from "../../../../hooks/useCountries";

interface FormData {
    name: string;
    surname: string;
    countryId: string;
}

interface EditAuthorDialogProps {
    author: Author;
    open: boolean;
    onClose: () => void;
    onEdit: (id: number, data: AuthorFormData) => Promise<void>;
}

const EditAuthorDialog = ({author, open, onClose, onEdit}: EditAuthorDialogProps) => {
    const {countries} = useCountries();

    const [formData, setFormData] = useState<FormData>({
        name: author.name,
        surname: author.surname,
        countryId: author.countryId.toString(),
    });

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

        await onEdit(author.id, payload);
        setFormData({...formData});
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>Edit Author</DialogTitle>
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
                <Button onClick={handleSubmit} variant='contained' color='secondary'>Edit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditAuthorDialog;
