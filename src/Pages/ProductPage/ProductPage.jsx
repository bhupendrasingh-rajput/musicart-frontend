import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import ProductDetails from '../../Components/ProductDetails/ProductDetails';
import MobileHeader from '../../Components/Header/MobileHeader';
import MobileFooter from '../../Components/Footer/MobileFooter';

const ProductPage = () => {
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
            {mobileView ? <MobileHeader /> : <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
            <ProductDetails isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} mobileView={mobileView}/>
            {mobileView ? <MobileFooter /> : <Footer />}
        </div>
    )
}

export default ProductPage;