import axiosInstance from '../axios/axios.ts';
import type { Author, AuthorDetails, AuthorFormData } from "./types/author.ts";

const authorApi = {
    findAll: async () => {
        return await axiosInstance.get<Author[]>('/authors');
    },
    findWithDetailsById: async (id: string) => {
        return await axiosInstance.get<AuthorDetails>(`/authors/${id}/details`);
    },
    add: async (data: AuthorFormData) => {
        return await axiosInstance.post<Author>('/authors/add', data);
    },
    edit: async (id: string, data: AuthorFormData) => {
        return await axiosInstance.put<Author>(`/authors/${id}/edit`, data);
    },
    delete: async (id: string) => {
        return await axiosInstance.delete<Author>(`/authors/${id}/delete`);
    }
};

export default authorApi;
