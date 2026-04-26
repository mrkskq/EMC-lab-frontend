import type { Author } from './author.ts'

export interface Book {
    id: number;
    name: string;
    category: string;
    author: Author;
    state: string;
    availableCopies: number;
}

export interface BookDetails {
    id: number;
    name: string;
    category: string;
    author: Author;
    state: string;
    availableCopies: number;
}