import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer'
import Checkout from '../../Components/Checkout/Checkout';
import MobileFooter from '../../Components/Footer/MobileFooter';



const CheckoutPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated'));
    const [mobileView, setMobileView] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setMobileView(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div>
            {!mobileView && <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
            <Checkout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} mobileView={mobileView} />
            {mobileView ? <MobileFooter /> : <Footer />}
        </div>
    )
}

export default CheckoutPage;