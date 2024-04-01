import React from 'react'
import style from './MobileHeader.module.css';
import Search from '../../Assets/Icons/Search.png'


const MobileHeader = () => {
    return (
        <div className={style.header}>
            <div>
                <img src={Search} alt="search-icon" />
                <input type="text" placeholder='Search Musicart'/>
            </div>
        </div>
    )
}

export default MobileHeader