import './AuthorsPage.css'
import useAuthors from '../../../hooks/useAuthors.ts';
import { Box, CircularProgress } from '@mui/material';
import AuthorGrid from '../../components/author/AuthorGrid/AuthorGrid.tsx';

const AuthorsPage = () => {
    const { authors, loading } = useAuthors();

    return (
        <Box className='authors-box'>
            {loading && (
                <Box className='progress-box'>
                    <CircularProgress/>
                </Box>
            )}
            {!loading && <AuthorGrid authors={authors}/>}
        </Box>

    );
};

export default AuthorsPage;
