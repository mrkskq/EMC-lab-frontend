import axiosInstance from '../axios/axios.ts';
import type { Country, CountryDetails } from "./types/country.ts";

const countryApi = {
    findAll: async () => {
        return await axiosInstance.get<Country[]>('/countries');
    },
    findWithDetailsById: async (id: string) => {
        return await axiosInstance.get<CountryDetails>(`/countries/${id}/details`);
    }
};

export default countryApi;
