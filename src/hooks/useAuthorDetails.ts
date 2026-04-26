import { useCallback, useEffect, useState } from 'react';
import authorApi from '../api/authorApi.ts';
import type { AuthorDetails } from '../api/types/author.ts';

const useAuthorDetails = (id?: string) => {
    const [authorDetails, setAuthorDetails] = useState<AuthorDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);


    const fetch = useCallback(async () => {
        if (!id) {
            return;
        }

        setLoading(true);

        try {
            const response = await authorApi.findWithDetailsById(id);
            setAuthorDetails(response.data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An unknown error occurred.'));
        } finally {
            setLoading(false);
        }

    }, [id]);

    useEffect(() => {
        void fetch();
    }, [fetch]);

    return { authorDetails, loading, error };
};

export default useAuthorDetails;
