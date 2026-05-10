import { useState } from 'react';
import type { RegisterRequest } from '../api/types/user.ts';
import userApi from '../api/userApi.ts';
import { useNavigate } from 'react-router';

const useRegister = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const navigate = useNavigate();

    const register = async (data: RegisterRequest) => {
        setLoading(true);
        setError(null);

        try {
            await userApi.register(data);
            navigate('/login');
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Registration failed. Please try again!'));
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, register };
};

export default useRegister;
