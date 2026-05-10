import { useState } from 'react';
import type { LoginRequest } from '../api/types/user.ts';
import userApi from '../api/userApi.ts';
import { useNavigate } from 'react-router';
import useAuth from './useAuth.ts';

const useLogin = () => {
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const login = async (data: LoginRequest) => {
        setLoading(true);
        setError(null);

        try {
            const response = await userApi.login(data);
            authLogin(response.data.token);
            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Login failed. Please try again!'));
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, login };
};

export default useLogin;
