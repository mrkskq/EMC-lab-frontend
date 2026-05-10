import LoginForm from '../../../components/auth/LoginForm/LoginForm.tsx';
import { Box } from '@mui/material';

const LoginPage = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <LoginForm/>
        </Box>
    );
};

export default LoginPage;