import axiosInstance from '../axios/axios.ts';
import type { Book, BookDetails } from "./types/book.ts";

const bookApi = {
    findAll: async () => {
        return await axiosInstance.get<Book[]>('/books');
    },
    findWithDetailsById: async (id: string) => {
        return await axiosInstance.get<BookDetails>(`/books/${id}/details`);
    }
};

export default bookApi;
