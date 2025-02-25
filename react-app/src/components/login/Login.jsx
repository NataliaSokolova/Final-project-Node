import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../utils/token';

const Login = ({ switchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLoading) return; // Prevent multiple submissions

    setIsLoading(true);
    setMessage(''); // Clear previous messages

    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setMessage(`Login successful. Welcome ${data.user.name}`);
        setToken(data.token); // Save token
        navigate('/'); // Redirect to home page
      } else {
        setMessage(data.msg || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setMessage('A communications error occurred. Please try again later.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false); // Re-enable the form
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div id="login-div" style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      {message && <p style={{ color: message.includes('successful') ? 'green' : 'red', textAlign: 'center' }}>{message}</p>}
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </label>
        <label>
          Password:
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {showPassword ? '🙈' : '👀'}
            </button>
          </div>
        </label>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
          <button type="submit" disabled={isLoading} style={{ padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
          <button
            type="button"
            onClick={switchToRegister}
            style={{ padding: '10px 20px', background: '#B3B3B3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;