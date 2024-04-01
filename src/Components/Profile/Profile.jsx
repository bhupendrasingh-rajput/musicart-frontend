import React, { useState, useEffect } from 'react'
import Cart from '../../Assets/Icons/Cart.png';
import style from './Profile.module.css';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Store/Slices/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCartByUserId } from '../../Store/Apis/cartApi';


const Profile = ({ setIsAuthenticated }) => {
    const [nameInitials, setNameInitials] = useState('');
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const cart = useSelector(state => state?.cart);


    const handleLogout = () => {
        dispatch(logout());
        setIsAuthenticated(null);
    }

    const formatName = () => {
        const name = localStorage.getItem('name');
        const wordArray = name.split(' ');
        if (wordArray.length === 1) {
            setNameInitials(wordArray[0].charAt(0).toUpperCase());
        } else {
            setNameInitials(wordArray[0].charAt(0).toUpperCase() + wordArray[1].charAt(0).toUpperCase());
        }
    }

    useEffect(() => {
        formatName();
        dispatch(getCartByUserId());
    }, [dispatch])

    return (
        <div className={style.rightBrandRow}>
            {!location.pathname.startsWith('/checkout') && !location.pathname.startsWith('/order')
                && !location.pathname.startsWith('/invoice/') &&
                <div className={style.cartContainer} onClick={() => { navigate('/cart') }}>
                    <img src={Cart} alt="cart-icon" />View Cart {cart?.products?.length || 0}
                </div>
            }
            {location.pathname === '/' &&
                <Menu menuButton={<MenuButton className={style.profileCircle}>{nameInitials}</MenuButton>}
                    transition menuClassName={style.menu}>
                    <MenuItem className={style.menuItem}>{localStorage.getItem('name')}</MenuItem>
                    <MenuItem className={style.menuItem} onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            }
        </div>
    )
}

export default Profile;