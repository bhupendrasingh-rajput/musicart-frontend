import React, { useEffect, useState } from 'react'
import Footer from '../../Components/Footer/Footer';
import Order from '../../Components/Order/Order';
import MobileFooter from '../../Components/Footer/MobileFooter'
const OrderPlacedPage = () => {
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
            <Order mobileView={mobileView} />
            {mobileView ? <MobileFooter /> : <Footer />}
        </div>
    )
}

export default OrderPlacedPage;