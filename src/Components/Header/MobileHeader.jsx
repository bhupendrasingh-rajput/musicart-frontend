import React, { useState } from 'react';
import style from './MobileHeader.module.css';
import Search from '../../Assets/Icons/Search.png';
import { useNavigate } from 'react-router-dom';


const MobileHeader = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== '') {
            navigate('/', { state: { search: searchQuery } }); 
        }
    }

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    }
    return (
        <div className={style.header}>
            <div>
                <img src={Search} alt="search-icon" />
                <input type="text" placeholder='Search Musicart'
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    )
}

export default MobileHeader