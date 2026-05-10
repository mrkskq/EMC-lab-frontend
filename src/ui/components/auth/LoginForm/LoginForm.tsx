import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import * as React from 'react';
import { useNavigate } from 'react-router';
import useLogin from '../../../../hooks/useLogin.ts';

interface FormData {
    username: string;
    password: string;
}

const initialFormData: FormData = {
    username: '',
    password: ''
};

const LoginForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>(initialFormData);

    const { login } = useLogin();

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        await login(formData);
    };

    return (
        <Container maxWidth='sm'>
            <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
                <Typography variant='h5' align='center' gutterBottom>Login</Typography>
                <Box>
                    <TextField
                        fullWidth
                        label='Username'
                        name='username'
                        margin='normal'
                        color='secondary'
                        required
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        label='Password'
                        name='password'
                        type='password'
                        margin='normal'
                        color='secondary'
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Button
                        fullWidth
                        variant='contained'
                        type='submit'
                        color='secondary'
                        sx={{ mt: 2 }}
                        onClick={handleSubmit}
                    >
                        Login
                    </Button>
                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                        <Button
                            fullWidth
                            variant='outlined'
                            color='secondary'
                            sx={{ fontWeight: 'bold' }}
                            onClick={() => navigate('/register')}
                        >
                            Register
                        </Button>
                        <Button
                            fullWidth
                            variant='outlined'
                            color='secondary'
                            onClick={() => navigate('/')}
                        >
                            Back
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginForm;
