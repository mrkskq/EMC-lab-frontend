import {Box, Button, Card, CardActions, CardContent, Snackbar, Typography, Alert} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type {Author} from '../../../../api/types/author.ts';
import {useNavigate} from "react-router-dom";
import {useState} from 'react';
import type {AuthorFormData} from "../../../../api/types/author";
import EditAuthorDialog from '../EditAuthorDialog/EditAuthorDialog.tsx';
import DeleteAuthorDialog from '../DeleteAuthorDialog/DeleteAuthorDialog.tsx';
import useAuth from '../../../../hooks/useAuth.ts';

interface AuthorCardProps {
    author: Author,
    onEdit: (id: number, data: AuthorFormData) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

const AuthorCard = ({author, onEdit, onDelete}: AuthorCardProps) => {
    const { user } = useAuth();
    const isAdmin = user?.roles.includes('ROLE_ADMINISTRATOR') ?? false;

    const navigate = useNavigate();

    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
        open: false,
        message: ''
    });

    const [editAuthorDialogOpen, setEditAuthorDialogOpen] = useState<boolean>(false);
    const [deleteAuthorDialogOpen, setDeleteAuthorDialogOpen] = useState<boolean>(false);

    const handleEdit = async (id: number, data: AuthorFormData) => {
        try {
            await onEdit(id, data);
        } catch (err) {
            setSnackbar({
                open: true,
                message: err instanceof Error ? err.message : 'Failed to edit author.'
            });
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await onDelete(id);
        } catch (err) {
            setSnackbar({
                open: true,
                message: err instanceof Error ? err.message : 'Failed to delete author.'
            });
        }
    };

    return (
        <>
            <Card sx={{maxWidth: 300, bgcolor: '#f1e9f7'}}>
                <CardContent>
                    <Typography variant='h5'>{author.name} {author.surname}</Typography>
                </CardContent>
                <CardActions sx={{justifyContent: 'space-between'}}>
                    {/*<Button startIcon={<InfoIcon/>}>Info</Button>*/}
                    <Button
                        startIcon={<InfoIcon/>}
                        onClick={() => navigate(`/authors/${author.id}`)}
                        color='secondary'
                    >
                        Info
                    </Button>

                    <Box>
                        {isAdmin && (
                            <Button startIcon={<EditIcon/>} color='warning'
                                    onClick={() => setEditAuthorDialogOpen(true)}>Edit</Button>
                        )}
                        {isAdmin && (
                            <Button startIcon={<DeleteIcon/>} color='error'
                                    onClick={() => setDeleteAuthorDialogOpen(true)}>Delete</Button>
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
            <EditAuthorDialog
                author={author}
                open={editAuthorDialogOpen}
                onClose={() => setEditAuthorDialogOpen(false)}
                onEdit={handleEdit}
            />
            <DeleteAuthorDialog
                author={author}
                open={deleteAuthorDialogOpen}
                onClose={() => setDeleteAuthorDialogOpen(false)}
                onDelete={handleDelete}
            />
        </>
    );
};

export default AuthorCard;