import RegisterForm from '../../../components/auth/RegisterForm/RegisterForm.tsx';
import { Box } from '@mui/material';

const RegisterPage = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '90vh' }}>
            <RegisterForm/>
        </Box>
    );
};

export default RegisterPage;
