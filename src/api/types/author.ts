import type {Country} from "./country.ts";

export interface Author {
    id: number;
    name: string;
    surname: string;
}

export interface AuthorDetails {
    id: number;
    name: string;
    surname: string;
    country: Country;
}