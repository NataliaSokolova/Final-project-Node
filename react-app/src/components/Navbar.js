import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'

function Navbar() {
    return (
        <nav className={styles.navbar}>
            {/* Navigation Links */}
            <Link to="/" className={styles.navLink}>Home</Link>
            <Link to="/about" className={styles.navLink}>About</Link>
            <Link to="/exercises" className={styles.navLink}>Exercises</Link>
        </nav>
    );
}

export default Navbar;