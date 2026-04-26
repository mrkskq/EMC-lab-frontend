import './App.css';
// import { Container } from '@mui/material';
import BooksPage from './ui/pages/BooksPage/BooksPage.tsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./ui/components/layout/Layout/Layout.tsx";
import HomePage from "./ui/pages/HomePage/HomePage.tsx";
import BookDetailsPage from "./ui/pages/BookDetailsPage/BookDetailsPage.tsx";
import AuthorsPage from "./ui/pages/AuthorsPage/AuthorsPage.tsx";
import CountriesPage from "./ui/pages/CountriesPage/CountriesPage.tsx";
import AuthorDetailsPage from "./ui/pages/AuthorDetailsPage/AuthorDetailsPage.tsx";
import CountryDetailsPage from "./ui/pages/CountryDetailsPage/CountryDetailsPage.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path='books' element={<BooksPage/>}/>
                    <Route path='authors' element={<AuthorsPage/>}/>
                    <Route path='countries' element={<CountriesPage/>}/>
                    <Route path='books/:id' element={<BookDetailsPage/>}/>
                    <Route path='authors/:id' element={<AuthorDetailsPage/>}/>
                    <Route path='countries/:id' element={<CountryDetailsPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>)
}

export default App;
