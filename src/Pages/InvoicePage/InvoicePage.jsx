import React, { useEffect, useState } from 'react'
import Invoices from '../../Components/Invoices/Invoices';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer'
import MobileFooter from '../../Components/Footer/MobileFooter';

const InvoicePage = () => {
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
            <Invoices isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} mobileView={mobileView} />
            {mobileView ? <MobileFooter /> : <Footer />}
        </div>
    )
}

export default InvoicePage;