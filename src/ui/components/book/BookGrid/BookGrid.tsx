import type { Book, BookFormData } from '../../../../api/types/book.ts';
import { Grid } from '@mui/material';
import BookCard from '../BookCard/BookCard.tsx';

interface BookGridProps {
    books: Book[],
    onEdit: (id: number, data: BookFormData) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

const BookGrid = ({ books, onEdit, onDelete }: BookGridProps) => {
    return (
        <Grid container spacing={{ xs: 2, md: 3 }}>
            {books.map((book) => (
                <Grid key={book.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <BookCard book={book} onEdit={onEdit} onDelete={onDelete}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default BookGrid;
