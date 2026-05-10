import axiosInstance from '../axios/axios.ts';
import type { Book, BookDetails, BookFormData } from "./types/book.ts";

const bookApi = {
    findAll: async () => {
        return await axiosInstance.get<Book[]>('/books');
    },
    findWithDetailsById: async (id: string) => {
        return await axiosInstance.get<BookDetails>(`/books/${id}/details`);
    },
    getStates: async () => {
        return await axiosInstance.get<string[]>('/books/states');
    },
    getCategories: async () => {
        return await axiosInstance.get<string[]>('/books/categories');
    },
    add: async (data: BookFormData) => {
        return await axiosInstance.post<Book>('/books/add', data);
    },
    edit: async (id: string, data: BookFormData) => {
        return await axiosInstance.put<Book>(`/books/${id}/edit`, data);
    },
    delete: async (id: string) => {
        return await axiosInstance.delete<Book>(`/books/${id}/delete`);
    }
};

export default bookApi;
