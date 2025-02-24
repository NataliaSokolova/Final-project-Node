import React from 'react';
import { useEffect } from 'react'; 
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Home from '../../pages/Home';
import FavoriteExercises from '../../pages/FavoriteExercises'
import ExerciseCard from '../../pages/ExerciseCard';
import useLoggedInStatus from './app.hooks'
import LoginRegister from '../login/LoginRegister';
import Register from '../login/Register';
import Login from '../login/Login';
import ActivityCard from '../../pages/ActivityCard';
import AddActivity from '../../pages/AddActivity'


const App = () => {
    const { isLoggedIn, checkLoggedIn } = useLoggedInStatus(); 
 
    // useEffect(() => {
    //     checkLoggedIn();
    // }, [checkLoggedIn]);

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
            <Route path="/activity" element={<AddActivity />} /> 
            <Route path="/activity-card" element={<ActivityCard />} /> 




            {/* Protected routes (only accessible if logged in) */}
            <Route 
                path="/" 
                element={isLoggedIn ? <Home /> : <Navigate to="/login-register" />} 
            />
            <Route 
                path="/exercises" 
                element={isLoggedIn ? <ExerciseCard /> : <Navigate to="/login-register" />} 
            />
            <Route 
                path="/favorite" 
                element={isLoggedIn ? <FavoriteExercises /> : <Navigate to="/login-register" />} 
            />
            <Route 
                path="/activities" 
                element={isLoggedIn ? <ActivityCard /> : <Navigate to="/login-register" />} 
            />
            
        </Routes>

        <Footer />
    </BrowserRouter>
    );
}

export default App;







