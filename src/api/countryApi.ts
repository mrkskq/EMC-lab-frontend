import axiosInstance from '../axios/axios.ts';
import type { Country, CountryDetails, CountryFormData } from "./types/country.ts";

const countryApi = {
    findAll: async () => {
        return await axiosInstance.get<Country[]>('/countries');
    },
    findWithDetailsById: async (id: string) => {
        return await axiosInstance.get<CountryDetails>(`/countries/${id}/details`);
    },
    add: async (data: CountryFormData) => {
        return await axiosInstance.post<Country>('/countries/add', data);
    },
    edit: async (id: string, data: CountryFormData) => {
        return await axiosInstance.put<Country>(`/countries/${id}/edit`, data);
    },
    delete: async (id: string) => {
        return await axiosInstance.delete<Country>(`/countries/${id}/delete`);
    }
};

export default countryApi;
