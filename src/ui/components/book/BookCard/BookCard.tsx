import {Box, Button, Card, CardActions, CardContent, Snackbar, Typography, Alert} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type {Book, BookFormData} from '../../../../api/types/book.ts';
import {useNavigate} from "react-router-dom";
import {useState} from 'react';
import EditBookDialog from '../EditBookDialog/EditBookDialog.tsx';
import DeleteBookDialog from '../DeleteBookDialog/DeleteBookDialog.tsx';
import useAuth from '../../../../hooks/useAuth.ts';

interface BookCardProps {
    book: Book,
    onEdit: (id: number, data: BookFormData) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

const BookCard = ({book, onEdit, onDelete}: BookCardProps) => {
    const {user} = useAuth();
    const isAdmin = user?.roles.includes('ROLE_ADMINISTRATOR') ?? false;

    const navigate = useNavigate();

    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
        open: false,
        message: ''
    });

    const [editBookDialogOpen, setEditBookDialogOpen] = useState<boolean>(false);
    const [deleteBookDialogOpen, setDeleteBookDialogOpen] = useState<boolean>(false);

    const handleEdit = async (id: number, data: BookFormData) => {
        try {
            await onEdit(id, data);
        } catch (err) {
            setSnackbar({
                open: true,
                message: err instanceof Error ? err.message : 'Failed to edit book.'
            });
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await onDelete(id);
        } catch (err) {
            setSnackbar({
                open: true,
                message: err instanceof Error ? err.message : 'Failed to delete book.'
            });
        }
    };


    return (
        <>
            <Card sx={{maxWidth: 300, bgcolor: '#f1e9f7'}}>
                <CardContent>
                    <Typography variant='h5'>{book.name}</Typography>
                    <Typography variant='subtitle1'>Genre: {book.category}</Typography>
                    <Typography variant='subtitle2' sx={{textAlign: 'right'}}>State: {book.state}</Typography>
                    <Typography variant='body2' sx={{textAlign: 'left'}}>{book.availableCopies} piece(s)
                        available</Typography>
                </CardContent>
                <CardActions sx={{justifyContent: 'space-between'}}>
                    <Button
                        startIcon={<InfoIcon/>}
                        onClick={() => navigate(`/books/${book.id}`)}
                        color='secondary'
                    >
                        Info
                    </Button>
                    <Box>
                        {isAdmin && (
                            <Button startIcon={<EditIcon/>} color='warning'
                                    onClick={() => setEditBookDialogOpen(true)}>Edit</Button>
                        )}
                        {isAdmin && (
                            <Button startIcon={<DeleteIcon/>} color='error'
                                    onClick={() => setDeleteBookDialogOpen(true)}>Delete</Button>
                        )}
                    </Box>
                </CardActions>
            </Card>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar((prev) => ({...prev, open: false}))}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            >
                <Alert
                    severity='error'
                    onClose={() => setSnackbar((prev) => ({...prev, open: false}))}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
            <EditBookDialog
                book={book}
                open={editBookDialogOpen}
                onClose={() => setEditBookDialogOpen(false)}
                onEdit={handleEdit}
            />
            <DeleteBookDialog
                book={book}
                open={deleteBookDialogOpen}
                onClose={() => setDeleteBookDialogOpen(false)}
                onDelete={handleDelete}
            />
        </>

    );
};

export default BookCard;