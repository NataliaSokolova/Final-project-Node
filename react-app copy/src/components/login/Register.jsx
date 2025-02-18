// Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ switchToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [message, setMessage] = useState('');
    const [inputEnabled, setInputEnabled] = useState(true);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!inputEnabled || password1 !== password2) {
            setMessage('The passwords do not match.');
            return;
        }

        setInputEnabled(false);
        try {
            const response = await fetch('/api/v1/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password: password1 }),
            });
            const data = await response.json();
            if (response.status === 201) {
                setMessage(`Registration successful. Welcome ${data.user.name}`);
                navigate('/');
            } else {
                setMessage(data.msg);
            }
        } catch (error) {
            setMessage('A communications error occurred.');
        }
        setInputEnabled(true);
    };

    return (
        <div id="register-div">
            <h2>Register</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleRegister}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password1} onChange={(e) => setPassword1(e.target.value)} required />
                </label>
                <label>
                    Confirm Password:
                    <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
                </label>
                <div>
                    <button type="submit" disabled={!inputEnabled}>Register</button>
                    <button type="button" onClick={switchToLogin}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
