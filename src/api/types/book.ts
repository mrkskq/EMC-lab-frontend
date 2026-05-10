import type { Author } from './author.ts'

export interface Book {
    id: number;
    name: string;
    category: string;
    author: Author;
    state: string;
    availableCopies: number;
    authorId: number;
}

export interface BookDetails {
    id: number;
    name: string;
    category: string;
    author: Author;
    state: string;
    availableCopies: number;
}

export interface BookFormData {
    name: string;
    category: string;
    authorId: number;
    state: string;
    availableCopies: number;
}