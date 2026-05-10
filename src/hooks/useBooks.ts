import { useCallback, useEffect, useState } from 'react';
import bookApi from '../api/bookApi.ts';
import type {Book} from "../api/types/book.ts";

const useBooks = (state? : string) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);


    const fetch = useCallback(async () => {
        setLoading(true);

        try {
            const response = await bookApi.findAll();
            const filtered = state
                ? response.data.filter(book => book.state === state)
                : response.data;
            setBooks(filtered);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An unknown error occurred.'));
        } finally {
            setLoading(false);
        }

    }, [state]);

    useEffect(() => {
        void fetch();
    }, [fetch]);

    return { books, loading, error, fetch };

};

export default useBooks;
