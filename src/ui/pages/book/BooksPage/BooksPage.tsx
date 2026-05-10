import './BooksPage.css'
import useBooks from '../../../../hooks/useBooks.ts';
import { Alert, Box, Button, CircularProgress, Snackbar, Typography } from '@mui/material';
import BookGrid from '../../../components/book/BookGrid/BookGrid.tsx';
import { useState } from 'react';
import AddBookDialog from '../../../components/book/AddBookDialog/AddBookDialog.tsx';
import type { BookFormData } from '../../../../api/types/book.ts';
import useAuth from '../../../../hooks/useAuth.ts';
import AddIcon from '@mui/icons-material/Add';

const BooksPage = () => {
    const { user } = useAuth();
    const isAdmin = user?.roles.includes('ROLE_ADMINISTRATOR') ?? false;

    const { books, loading, onAdd, onEdit, onDelete } = useBooks();

    const [addBookDialogOpen, setAddBookDialogOpen] = useState<boolean>(false);

    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
        open: false,
        message: ''
    });

    const handleAdd = async (data: BookFormData) => {
        try {
            await onAdd(data);
        } catch (err) {
            setSnackbar({
                open: true,
                message: err instanceof Error ? err.message : 'Failed to add book.'
            });
        }
    };


    return (
        <Box className='books-box'>
            {loading && (
                <Box className='progress-box'>
                    <CircularProgress/>
                </Box>
            )}
            {!loading &&
                <>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, position: 'relative' }}>
                        <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
                            ALL BOOKS
                        </Typography>
                        {isAdmin && (
                            <Box sx={{ position: 'absolute', right: 0 }}>
                                <Button startIcon={<AddIcon/>} variant='contained' color='secondary' onClick={() => setAddBookDialogOpen(true)}>
                                    Add Book
                                </Button>
                            </Box>
                        )}
                    </Box>
                    <BookGrid books={books} onEdit={onEdit} onDelete={onDelete}/>
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
                    <AddBookDialog
                        open={addBookDialogOpen}
                        onClose={() => setAddBookDialogOpen(false)}
                        onAdd={handleAdd}
                    />
                </>}
        </Box>
    );
};

export default BooksPage;
