import type { Book } from '../../../../api/types/book.ts';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface DeleteBookDialogProps {
    book: Book;
    open: boolean,
    onClose: () => void;
    onDelete: (id: number) => Promise<void>;
}

const DeleteBookDialog = ({ book, open, onClose, onDelete }: DeleteBookDialogProps) => {
    const handleSubmit = async () => {
        await onDelete(book.id);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Book</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete <strong>{book.name}</strong>? This action cannot be undone.
                </DialogContentText>
                <DialogActions>
                    <Button onClick={onClose} color='secondary'>Cancel</Button>
                    <Button onClick={handleSubmit} color='error' variant='contained'>Delete</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteBookDialog;
