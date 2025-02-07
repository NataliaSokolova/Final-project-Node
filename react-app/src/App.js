import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About'
import Exercises from './pages/Exercises';

function App() {
    return (
        <BrowserRouter>
            {/* Navbar */}
            <Navbar />

            {/* Routes */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/exercises" element={<Exercises />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;