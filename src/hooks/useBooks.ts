import { useCallback, useEffect, useState } from 'react';
import bookApi from '../api/bookApi.ts';
import type {Book, BookFormData} from "../api/types/book.ts";

const useBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [states, setStates] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    const fetch = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await bookApi.findAll();
            setBooks(response.data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An unknown error occurred.'));
        } finally {
            setLoading(false);
        }

    }, []);

    const onAdd = useCallback(async (data: BookFormData) => {
        await bookApi.add(data);
        await fetch();
    }, [fetch]);

    const onEdit = useCallback(async (id: number, data: BookFormData) => {
        await bookApi.edit(id.toString(), data);
        await fetch();
    }, [fetch]);

    const onDelete = useCallback(async (id: number) => {
        await bookApi.delete(id.toString());
        await fetch();
    }, [fetch]);


    useEffect(() => {
        void fetch();
    }, [fetch]);

    useEffect(() => {
        bookApi.getStates()
            .then((res) => {
                setStates(res.data);
            });
    }, []);

    useEffect(() => {
        bookApi.getCategories()
            .then((res) => {
                setCategories(res.data);
            });
    }, []);

    return { books, loading, error, fetch, onAdd, onEdit, onDelete, states, categories };
};

export default useBooks;
