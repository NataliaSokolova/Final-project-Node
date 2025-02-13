import React from 'react';
import { useEffect } from 'react'; 
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Home from '../../pages/Home';
import About from '../../pages/About'
import Exercises from '../../pages/Exercises';
import useLoggedInStatus from './app.hooks'
import LoginRegister from '../login/LoginRegister';
import Register from '../login/Register';
import Login from '../login/Login';

const App = () => {
    const { isLoggedIn, checkLoggedIn } = useLoggedInStatus(); 
 
    useEffect(() => {
        checkLoggedIn();
    }, [checkLoggedIn]);

 


    return (
 
        <BrowserRouter>
        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login-register" element={<LoginRegister />} />

            {/* Protected routes (only accessible if logged in) */}
            <Route 
                path="/" 
                element={isLoggedIn ? <Home /> : <Navigate to="/login-register" />} 
            />
            <Route 
                path="/exercises" 
                element={isLoggedIn ? <Exercises /> : <Navigate to="/login-register" />} 
            />
            <Route 
                path="/about" 
                element={isLoggedIn ? <About /> : <Navigate to="/login-register" />} 
            />
        </Routes>
    </BrowserRouter>
    );
}

export default App;







