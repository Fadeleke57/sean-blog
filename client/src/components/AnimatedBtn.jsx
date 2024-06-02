import styles from './AnimatedBtn.module.css';
import React from 'react';

const Animatedbtn = ({ isActive , setIsActive, setMenuOpen, menuOpen}) => {

    const handleClick = () => {
        setIsActive(!isActive);
        setMenuOpen(!menuOpen)
    };

    return (
        <button className={isActive ? styles.menu_btn_active : styles.menu_btn} onClick={() => handleClick()}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
        </button>
    );
};

export default Animatedbtn