import type {Country} from "./country.ts";

export interface Author {
    id: number;
    name: string;
    surname: string;
    countryId: number;
}

export interface AuthorDetails {
    id: number;
    name: string;
    surname: string;
    country: Country;
}

export interface AuthorFormData {
    name: string;
    surname: string;
    countryId: number;
}