import { useCallback, useEffect, useState } from 'react';
import authorApi from '../api/authorApi.ts';
import type { Author, AuthorFormData } from "../api/types/author.ts";

const useAuthors = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);


    const fetch = useCallback(async () => {
        setLoading(true);

        try {
            const response = await authorApi.findAll();
            setAuthors(response.data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An unknown error occurred.'));
        } finally {
            setLoading(false);
        }

    }, []);

    const onAdd = useCallback(async (data: AuthorFormData) => {
        await authorApi.add(data);
        await fetch();
    }, [fetch]);

    const onEdit = useCallback(async (id: number, data: AuthorFormData) => {
        await authorApi.edit(id.toString(), data);
        await fetch();
    }, [fetch]);

    const onDelete = useCallback(async (id: number) => {
        await authorApi.delete(id.toString());
        await fetch();
    }, [fetch]);

    useEffect(() => {
        void fetch();
    }, [fetch]);

    return { authors, loading, error, fetch, onAdd, onEdit, onDelete };

};

export default useAuthors;
