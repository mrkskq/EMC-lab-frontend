import './BooksPage.css'
import { useState } from 'react';
import useBooks from '../../../hooks/useBooks.ts';
import { Box, CircularProgress } from '@mui/material';
import BookGrid from '../../components/book/BookGrid/BookGrid.tsx';
import { Button } from '@mui/material';

const BooksPage = () => {
    const [filter, setFilter] = useState<'GOOD' | 'BAD' | ''>('');
    const { books, loading } = useBooks(filter || undefined);

    return (
        <Box className='books-box'>
            <Box>
                <Button onClick={() => setFilter('')}>All Books</Button>
                <Button onClick={() => setFilter('GOOD')} color="success">GOOD</Button>
                <Button onClick={() => setFilter('BAD')} color="error">BAD</Button>
            </Box>
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