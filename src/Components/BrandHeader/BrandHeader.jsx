import React from 'react'
import style from './BrandHeader.module.css';
import AppLogo from '../../Assets/Icons/AppLogo.png'
import Profile from '../Profile/Profile';
import { useLocation, useNavigate } from 'react-router-dom';


const BrandHeader = ({ isAuthenticated, setIsAuthenticated, productName }) => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <div className={style.brandRow}>
            <div className={style.leftBrandRow}>
                <img src={AppLogo} alt="app-logo" />
                <h3>Musicart</h3>
                {isAuthenticated &&
                    <span>
                        <span onClick={() => { navigate('/') }}>Home</span>
                        {location.pathname === '/' ? <span onClick={()=>{navigate('/invoices')}}>Invoice</span> : null}
                        {location.pathname.startsWith('/product') && productName && <span>/{productName}</span>}
                        {location.pathname.startsWith('/cart') && <span>/ View Cart</span>}
                        {location.pathname.startsWith('/checkout') && <span>/ Checkout</span>}
                        {location.pathname.startsWith('/invoices') && <span>/ Invoices</span>}
                        {location.pathname.startsWith('/invoice/') && <span>/ Invoices</span>}
                    </span>
                }
            </div>
            {isAuthenticated && <Profile setIsAuthenticated={setIsAuthenticated} />}
        </div>
    )
}

export default BrandHeader