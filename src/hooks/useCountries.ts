import { useCallback, useEffect, useState } from 'react';
import countryApi from '../api/countryApi.ts';
import type { Country, CountryFormData } from "../api/types/country.ts";

const useCountries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);


    const fetch = useCallback(async () => {
        setLoading(true);

        try {
            const response = await countryApi.findAll();
            setCountries(response.data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An unknown error occurred.'));
        } finally {
            setLoading(false);
        }

    }, []);

    const onAdd = useCallback(async (data: CountryFormData) => {
        await countryApi.add(data);
        await fetch();
    }, [fetch]);

    const onEdit = useCallback(async (id: number, data: CountryFormData) => {
        await countryApi.edit(id.toString(), data);
        await fetch();
    }, [fetch]);

    const onDelete = useCallback(async (id: number) => {
        await countryApi.delete(id.toString());
        await fetch();
    }, [fetch]);

    useEffect(() => {
        void fetch();
    }, [fetch]);

    return { countries, loading, error, fetch, onAdd, onEdit, onDelete };

};

export default useCountries;
