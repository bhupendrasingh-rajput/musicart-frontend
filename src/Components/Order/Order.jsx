import React from 'react';
import style from './Order.module.css';
import BrandHeader from '../BrandHeader/BrandHeader';
import Crackers from '../../Assets/Images/Crackers.png';
import { useNavigate } from 'react-router-dom';
import MobileBrandHeader from '../BrandHeader/MobileBrandHeader';

const Order = ({ mobileView }) => {
    const navigate = useNavigate();
    return (
        <div className={style.order}>
            {mobileView ?
                <MobileBrandHeader /> : <BrandHeader />
            }

            <div className={style.orderContainer}>
                <div className={style.orderBox}>
                    <img src={Crackers} alt="crackers-image" />
                    <span>Order is placed successfully!</span>
                    <p>You  will be receiving a confirmation email with order details</p>
                    <button onClick={() => { navigate('/') }}>Go back to Home page</button>
                </div>
            </div >
        </div >
    )
}

export default Order