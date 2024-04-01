import React, { useEffect, useState } from 'react'
import style from './Header.module.css'
import Phone from '../../Assets/Icons/Phone.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../../Store/Slices/userSlice';

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleLogout = () => {
        dispatch(logout());
        setIsAuthenticated(null);
        navigate('/login');
    }
    return (
        <div className={style.header}>
            <div className={style.leftSection}>
                <img src={Phone} alt="phone-icon" /><span>912121131313</span>
            </div>
            <div className={style.middleSection}>
                <span>Get 50% off on selected items</span><hr /><span>Shop Now</span>
            </div>

            {!isAuthenticated &&
                <div className={style.rightSection}>
                    <span onClick={() => navigate('/login')}>Login</span><hr /><span onClick={() => navigate('/register')}>Sign in</span>
                </div>
            }
            {isAuthenticated && location.pathname !== '/' ?
                <div className={style.rightSection}>
                    <span onClick={handleLogout}>Logout</span>
                </div> : null
            }

        </div >
    )
}

export default Header;