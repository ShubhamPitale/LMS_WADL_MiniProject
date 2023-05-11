import { useState, useRef } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { BsXLg } from 'react-icons/bs';
import logo from '../../img/logo.png';
import styles from './Navbar.module.css';

import MaterialButton from '@mui/material/Button';

function Navbar() {
  const navRef = useRef();
  const isAdmin = localStorage.getItem('admin') == 'true';
  const navigate = useNavigate();

  const showNavbar = () => {
    navRef.current.classList.toggle(styles['responsive_nav']);
  };
  const logoutHandler = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <header>
      <div className={styles.logo}>
        {' '}
        <img src={logo}></img>
      </div>

      <nav ref={navRef}>
        <Link to={`/dashboard`}>Dashboard</Link>

        {isAdmin && <Link to={`/addbook`}>Add Book</Link>}
        {isAdmin && <Link to={`/issue`}>View Issues</Link>}
        <MaterialButton
          variant="contained"
          style={{ backgroundColor: '#eddca9', color: '#b18857' }}
          size="large"
          onClick={logoutHandler}
        >
          Logout
        </MaterialButton>

        <button
          className={`${styles['nav-btn']} ${styles['nav-close-btn']}`}
          onClick={showNavbar}
        >
          <BsXLg />
        </button>
      </nav>
      <button className={styles['nav-btn']} onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;
