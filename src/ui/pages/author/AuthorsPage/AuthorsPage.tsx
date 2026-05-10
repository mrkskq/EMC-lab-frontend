import './AuthorsPage.css'
import useAuthors from '../../../../hooks/useAuthors.ts';
import { Alert, Box, Button, CircularProgress, Snackbar, Typography } from '@mui/material';
import AuthorGrid from '../../../components/author/AuthorGrid/AuthorGrid.tsx';
import { useState } from 'react';
import type { AuthorFormData } from '../../../../api/types/author.ts';
import AddAuthorDialog from '../../../components/author/AddAuthorDialog/AddAuthorDialog.tsx';
import useAuth from '../../../../hooks/useAuth.ts';
import AddIcon from '@mui/icons-material/Add';

const AuthorsPage = () => {
    const { user } = useAuth();
    const isAdmin = user?.roles.includes('ROLE_ADMINISTRATOR') ?? false;

    const { authors, loading, onAdd, onEdit, onDelete } = useAuthors();

    const [addAuthorDialogOpen, setAddAuthorDialogOpen] = useState<boolean>(false);

    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
        open: false,
        message: ''
    });

    const handleAdd = async (data: AuthorFormData) => {
        try {
            await onAdd(data);
        } catch (err) {
            setSnackbar({
                open: true,
                message: err instanceof Error ? err.message : 'Failed to add author.'
            });
        }
    };

    return (
        <Box className='authors-box'>
            {loading && (
                <Box className='progress-box'>
                    <CircularProgress/>
                </Box>
            )}
            {!loading &&
                <>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, position: 'relative' }}>
                        <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
                            ALL AUTHORS
                        </Typography>
                        {isAdmin && (
                            <Box sx={{ position: 'absolute', right: 0 }}>
                                <Button startIcon={<AddIcon/>} variant='contained' color='secondary' onClick={() => setAddAuthorDialogOpen(true)}>
                                    Add Author
                                </Button>
                            </Box>
                        )}
                    </Box>
                    <AuthorGrid authors={authors} onEdit={onEdit} onDelete={onDelete}/>
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
                    <AddAuthorDialog
                        open={addAuthorDialogOpen}
                        onClose={() => setAddAuthorDialogOpen(false)}
                        onAdd={handleAdd}
                    />
                </>}
        </Box>
    );
};

export default AuthorsPage;
