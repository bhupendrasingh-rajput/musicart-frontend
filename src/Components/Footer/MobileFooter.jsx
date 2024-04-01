import React from 'react';
import style from './MobileFooter.module.css';
import MobileHome from '../../Assets/Icons/MobileHome.png'
import MobileCart from '../../Assets/Icons/MobileCart.png'
import MobileInvoice from '../../Assets/Icons/MobileInvoice.png'
import MobileUser from '../../Assets/Icons/MobileUser.png'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Store/Slices/userSlice';

const MobileFooter = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const cart = useSelector(state => state?.cart);

    const handleLoginLogout = () => {
        if (isAuthenticated) {
            dispatch(logout());
            navigate('/login');
        } else {
            navigate('/login');
        }
    }
    return (
        <div className={style.footer}>
            <div>
                <img src={MobileHome} alt="home-icon" onClick={() => { navigate('/') }} />
                <p>Home</p>
            </div>
            <div>
                <div>
                    <img src={MobileCart} alt="home-icon" onClick={() => { navigate('/cart') }} />
                    <small>{cart?.products?.length || 0}</small>
                </div>
                <p>Cart</p>
            </div>

            {!(location.pathname.startsWith('/product') ||
                location.pathname.startsWith('/cart') ||
                location.pathname.startsWith('/checkout')) && isAuthenticated &&
                <div>
                    <img src={MobileInvoice} alt="home-icon" onClick={() => { navigate('/invoices') }} />
                    <p>Invoice</p>
                </div>
            }




            <div>
                <img src={MobileUser} alt="home-icon" onClick={handleLoginLogout} />
                <p>{isAuthenticated ? 'Logout' : 'Login'}</p>
            </div>
        </div >
    )
}

export default MobileFooter