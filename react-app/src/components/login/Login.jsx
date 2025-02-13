// Login.jsx
import React, { useState } from 'react';

const Login = ({ switchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [inputEnabled, setInputEnabled] = useState(true);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!inputEnabled) return;

        setInputEnabled(false);
        try {
            const response = await fetch('/api/v1/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.status === 200) {
                setMessage(`Login successful. Welcome ${data.user.name}`);
                // You can redirect to a jobs page or set token here
            } else {
                setMessage(data.msg);
            }
        } catch (error) {
            setMessage('A communications error occurred.');
        }
        setInputEnabled(true);
    };

    return (
        <div id="login-div">
            <h2>Login</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleLogin}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <div>
                    <button type="submit" disabled={!inputEnabled}>Log In</button>
                    <button type="button" onClick={switchToRegister}>Register</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
