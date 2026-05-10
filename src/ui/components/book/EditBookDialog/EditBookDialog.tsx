import type {Book, BookFormData} from '../../../../api/types/book.ts';
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
import useAuthors from '../../../../hooks/useAuthors.ts';
import useBooks from '../../../../hooks/useBooks.ts';

interface FormData {
    name: string;
    category: string;
    authorId: string;
    state: string;
    availableCopies: string;
}

interface EditBookDialogProps {
    book: Book;
    open: boolean;
    onClose: () => void;
    onEdit: (id: number, data: BookFormData) => Promise<void>;
}

const EditBookDialog = ({book, open, onClose, onEdit}: EditBookDialogProps) => {
    const {authors} = useAuthors();
    const {states, categories} = useBooks();

    const [formData, setFormData] = useState<FormData>({
        name: book.name,
        category: book.category,
        authorId: book.authorId.toString(),
        state: book.state,
        availableCopies: book.availableCopies.toString()
    });

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

        await onEdit(book.id, payload);
        setFormData({...formData});
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>Edit Book</DialogTitle>
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
                        value={formData.category}
                        onChange={handleChange}
                        variant='outlined'
                        color='secondary'>
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
                        value={formData.authorId}
                        onChange={handleChange}
                        variant='outlined'
                        color='secondary'>
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
                        value={formData.state}
                        onChange={handleChange}
                        variant='outlined'
                        color='secondary'>
                        {states.map((state) => (
                            <MenuItem key={state} value={state}>{state}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    margin='dense'
                    label='AvailableCopies'
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
                <Button onClick={handleSubmit} variant='contained' color='secondary'>Edit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditBookDialog;
