import React from 'react';
import style from './MobileBrandHeader.module.css';
import AppLogo from '../../Assets/Icons/AppLogo.png';

const MobileBrandHeader = () => {
    return (
        <div className={style.mobileHeader}>
            <img src={AppLogo} alt="app-logo" />
            <span>Musicart</span>
        </div>
    )
}

export default MobileBrandHeader