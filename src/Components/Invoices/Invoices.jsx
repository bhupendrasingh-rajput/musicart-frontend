import React, { useEffect } from 'react';
import BrandHeader from '../BrandHeader/BrandHeader';
import style from './Invoices.module.css'
import Invoice from '../../Assets/Icons/Invoice.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoices } from '../../Store/Apis/invoiceApi';
import { useNavigate } from 'react-router-dom';
import MobileBrandHeader from '../BrandHeader/MobileBrandHeader';
import BlackInvoice from '../../Assets/Icons/BlackInvoice.png'


const Invoices = ({ isAuthenticated, setIsAuthenticated, mobileView }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const invoices = useSelector(state => state?.invoice);

    const handleGetInvoice = (invoiceId) => {
        navigate(`/invoice/${invoiceId}`)
    }
    useEffect(() => { dispatch(fetchInvoices()) }, [dispatch]);
    return (
        <div className={style.mainContainer}>
            {!mobileView ?
                <BrandHeader /> :
                <MobileBrandHeader />
            }
            <div className={style.buttonRow}>
                {mobileView ?
                    <button onClick={() => { navigate(-1) }}>🡨</button> : 
                    <button onClick={() => { navigate('/') }}>Back to Home</button>
                }
            </div>
            <div className={style.invoiceHeading}>
                {mobileView && <img src={BlackInvoice} alt='black_invoice'/>}My Invoices
            </div>
            <div className={style.invoicesContainer}>
                {invoices?.allInvoices?.map((invoice, index) => (
                    <div className={style.invoiceBox} key={index}>
                        <div>
                            <img src={Invoice} alt='invoice-icon' />
                            <span>{invoice?.userName}<br /><p>{invoice?.address}</p></span>
                        </div>
                        <button onClick={() => { handleGetInvoice(invoice?._id) }}>View Invoice</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Invoices;