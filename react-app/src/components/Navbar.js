import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'

function Navbar() {
    return (
        <nav className={styles.navbar}>
            {/* Navigation Links */}
            <Link to="/" className={styles.navLink}>Home</Link>
            <Link to="/exercises" className={styles.navLink}>Exercises</Link>
            <Link to="/favorite" className={styles.navLink}>Favorite exercises</Link>
            <Link to="/activities" className={styles.navLink}>My Activities</Link>
        </nav>
    );
}

export default Navbar;