import './App.css';
// import { Container } from '@mui/material';
import BooksPage from './ui/pages/book/BooksPage/BooksPage.tsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./ui/components/layout/Layout/Layout.tsx";
import HomePage from "./ui/pages/home/HomePage/HomePage.tsx";
import BookDetailsPage from "./ui/pages/book/BookDetailsPage/BookDetailsPage.tsx";
import AuthorsPage from "./ui/pages/author/AuthorsPage/AuthorsPage.tsx";
import CountriesPage from "./ui/pages/country/CountriesPage/CountriesPage.tsx";
import AuthorDetailsPage from "./ui/pages/author/AuthorDetailsPage/AuthorDetailsPage.tsx";
import CountryDetailsPage from "./ui/pages/country/CountryDetailsPage/CountryDetailsPage.tsx";
import RegisterPage from './ui/pages/auth/RegisterPage/RegisterPage.tsx';
import LoginPage from './ui/pages/auth/LoginPage/LoginPage.tsx';
import ProtectedRoute from './ui/components/routing/ProtectedRoute/ProtectedRoute.tsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route element={<ProtectedRoute/>}>
                        <Route path='books' element={<BooksPage/>}/>
                        <Route path='authors' element={<AuthorsPage/>}/>
                        <Route path='countries' element={<CountriesPage/>}/>
                        <Route path='books/:id' element={<BookDetailsPage/>}/>
                        <Route path='authors/:id' element={<AuthorDetailsPage/>}/>
                        <Route path='countries/:id' element={<CountryDetailsPage/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>)
}

export default App;
