import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css'
import { setToken } from './utils/token';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken(null);
        navigate("/login-register");
    };
    return (
        <nav className={styles.navbar}>
            {/* Navigation Links */}
            <Link to="/" className={styles.navLink}>Home</Link>
            <Link to="/exercises" className={styles.navLink}>Exercises</Link>
            <Link to="/favorite" className={styles.navLink}>Favorite exercises</Link>
            <Link to="/activities" className={styles.navLink}>My Activities</Link>
            <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
            </button>
        </nav>
    );
}

export default Navbar;