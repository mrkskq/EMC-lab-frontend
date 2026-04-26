import axiosInstance from '../axios/axios.ts';
import type { Author, AuthorDetails } from "./types/author.ts";

const authorApi = {
    findAll: async () => {
        return await axiosInstance.get<Author[]>('/authors');
    },
    findWithDetailsById: async (id: string) => {
        return await axiosInstance.get<AuthorDetails>(`/authors/${id}/details`);
    }
};

export default authorApi;
