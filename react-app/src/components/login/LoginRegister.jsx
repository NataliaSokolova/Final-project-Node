import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const LoginRegister = () => {
    const [currentView, setCurrentView] = useState('login');

    const handleSwitchToLogin = () => setCurrentView('login');
    const handleSwitchToRegister = () => setCurrentView('register');

    return (
        <div id="login-register">
            {currentView === 'login' && <Login switchToRegister={handleSwitchToRegister} />}
            {currentView === 'register' && <Register switchToLogin={handleSwitchToLogin} />}
        </div>
    );
};

export default LoginRegister;
