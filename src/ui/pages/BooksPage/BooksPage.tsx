import './BooksPage.css'
import useBooks from '../../../hooks/useBooks.ts';
import { Box, CircularProgress } from '@mui/material';
import BookGrid from '../../components/book/BookGrid/BookGrid.tsx';

const BooksPage = () => {
    const { books, loading } = useBooks();

    return (
        <Box className='books-box'>
            {loading && (
                <Box className='progress-box'>
                    <CircularProgress/>
                </Box>
            )}
            {!loading && <BookGrid books={books}/>}
        </Box>

    );
};

export default BooksPage;
