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
import useAuthors from '../../../../hooks/useAuthors.ts';
import useBooks from '../../../../hooks/useBooks.ts';
import {useState} from 'react';
import type {BookFormData} from '../../../../api/types/book.ts';
import * as React from 'react';

interface FormData {
    name: string;
    category: string;
    authorId: string;
    state: string;
    availableCopies: string;
}

const initialFormData: FormData = {
    name: '',
    category: '',
    authorId: '',
    state: '',
    availableCopies: ''
};

interface AddBookDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (data: BookFormData) => Promise<void>;
}

const AddBookDialog = ({open, onClose, onAdd}: AddBookDialogProps) => {
    const {authors} = useAuthors();
    const {states, categories} = useBooks();

    const [formData, setFormData] = useState<FormData>(initialFormData);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
    ) => {
        const {name, value} = event.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async () => {
        const payload: BookFormData = {
            name: formData.name.trim(),
            category: formData.category.trim(),
            authorId: Number(formData.authorId),
            state: formData.state.trim(),
            availableCopies: Number(formData.availableCopies)
        };

        await onAdd(payload);
        setFormData({...initialFormData});
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>Add Book</DialogTitle>
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
                <FormControl margin='dense' fullWidth>
                    <InputLabel color='secondary'>Category</InputLabel>
                    <Select
                        label='Category'
                        name='category'
                        color='secondary'
                        value={formData.category}
                        onChange={handleChange}
                        variant='outlined'>
                        {categories.map((category) => (
                            <MenuItem key={category} value={category}>{category}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl margin='dense' fullWidth>
                    <InputLabel color='secondary'>Author</InputLabel>
                    <Select
                        label='Author'
                        name='authorId'
                        color='secondary'
                        value={formData.authorId}
                        onChange={handleChange}
                        variant='outlined'>
                        {authors.map((author) => (
                            <MenuItem key={author.id} value={author.id}>{author.name} {author.surname}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl margin='dense' fullWidth>
                    <InputLabel color='secondary'>State</InputLabel>
                    <Select
                        label='State'
                        name='state'
                        color='secondary'
                        value={formData.state}
                        onChange={handleChange}
                        variant='outlined'>
                        {states.map((state) => (
                            <MenuItem key={state} value={state}>{state}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    margin='dense'
                    label='Available Copies'
                    name='availableCopies'
                    color='secondary'
                    value={formData.availableCopies}
                    onChange={handleChange}
                    type='number'
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

export default AddBookDialog;
