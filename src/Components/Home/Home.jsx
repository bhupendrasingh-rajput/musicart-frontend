import React, { useEffect, useState } from 'react';
import style from './Home.module.css';
import Select from 'react-select';
import { selectStyles, selectStylesMobile, sortingStyle } from '../../Utils/CustomStyle';
import HomeBanner from '../../Assets/Images/HomeBanner.png'
import Search from '../../Assets/Icons/Search.png'
import Grid from '../../Assets/Icons/Grid.png';
import List from '../../Assets/Icons/List.png';
import AddtoCart from '../../Assets/Icons/AddToCart.png';
import { typeOptions, companyOptions, colourOptions, priceOptions, sortingOptions } from '../../Utils/Options';
import { ToastContainer } from 'react-toastify';
import Feedback from '../Feedback/Feedback';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../Store/Apis/productApi';
import BrandHeader from '../BrandHeader/BrandHeader';
import { useLocation, useNavigate } from 'react-router-dom';
import { addToCart } from '../../Store/Apis/cartApi';

const Home = ({ isAuthenticated, setIsAuthenticated, mobileView }) => {
    const [displayType, setDisplayType] = useState('grid');
    const [filters, setFilters] = useState({ type: null, brand: null, color: null, price: null });
    const [sortOption, setSortOption] = useState({ field: null, order: null });
    const [sortingLabel, setSortingLabel] = useState('Featured');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const products = useSelector(state => state?.products);

    const filteredProducts = searchQuery
        ? products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : products;


    const handleDisplayType = (type) => {
        setDisplayType(type);
    }


    const handleFilter = (name, value) => {
        setFilters({ ...filters, [name]: value });
    };

    const handleSorting = (selectedOption) => {
        setSortingLabel(selectedOption ? selectedOption.label : null);
        setSortOption(selectedOption ? selectedOption.value : null);
    }

    useEffect(() => {
        const { state } = location;
        if (state && state.search) {
            setSearchQuery(state.search);
        } else {
            setSearchQuery('');
        }
    }, [location]);


    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    }

    const handleAddToCart = (productId, name, color, image, price, event) => {
        event.stopPropagation();
        dispatch(addToCart({ productId, name, color, image, price }));
    }

    useEffect(() => {
        const params = { ...filters, sortOption };
        dispatch(getAllProducts(params))
    }, [dispatch, filters, sortOption]);

    return (
        <div className={style.home}>
            {!mobileView && <BrandHeader isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
            <div className={style.gradientBox}>
                <div>
                    <p>Grab upto 50% off on</p>
                    <p>Selected headphones</p>
                    {mobileView && <button>Buy Now</button>}
                </div>
                <img src={HomeBanner} alt="home_banner" />
            </div>

            <div className={style.searchContainer}>
                {!mobileView &&
                    <div className={style.searchBox}>
                        <img src={Search} alt="search_icon" />
                        <input type="text" name="search" placeholder='Search by Product Name' onChange={handleSearch} />
                    </div>
                }
                <div className={style.searchBottom}>
                    {!mobileView &&
                        <div className={style.displayIcons}>
                            <img id={style.grid} src={Grid} alt="grid_icon" onClick={() => handleDisplayType('grid')} />
                            <img id={style.list} src={List} alt="list_icon" onClick={() => handleDisplayType('list')} />
                        </div>
                    }
                    {mobileView &&
                        <div className={style.sortingBox}>
                            <Select
                                placeholder={`Sort by : ${sortingLabel} ⌵`}
                                value={`Sort by: `}
                                menuPortalTarget={document.body}
                                isSearchable={false}
                                options={sortingOptions}
                                styles={sortingStyle}
                                onChange={(selectedOption) => handleSorting(selectedOption)}
                            />
                        </div>
                    }
                    <div className={style.filterBox}>
                        <Select
                            name="type"
                            placeholder={"Headphone type ⌵"}
                            menuPortalTarget={document.body}
                            isSearchable={false}
                            options={typeOptions}
                            styles={mobileView ? selectStylesMobile : selectStyles}
                            onChange={(selectedOption) => handleFilter('type', selectedOption ? selectedOption.value : null)}
                        />
                        <Select
                            name="brand"
                            placeholder="Company ⌵"
                            menuPortalTarget={document.body}
                            isSearchable={false}
                            options={companyOptions}
                            styles={mobileView ? selectStylesMobile : selectStyles}
                            onChange={(selectedOption) => handleFilter('brand', selectedOption ? selectedOption.value : null)}
                        />
                        <Select
                            name="color"
                            placeholder="Colour ⌵"
                            menuPortalTarget={document.body}
                            isSearchable={false}
                            options={colourOptions}
                            styles={mobileView ? selectStylesMobile : selectStyles}
                            onChange={(selectedOption) => handleFilter('color', selectedOption ? selectedOption.value : null)}
                        />
                        <Select
                            name="price"
                            placeholder="Price ⌵"
                            menuPortalTarget={document.body}
                            isSearchable={false}
                            options={priceOptions}
                            styles={mobileView ? selectStylesMobile : selectStyles}
                            onChange={(selectedOption) => handleFilter('price', selectedOption ? selectedOption.value : null)}
                        />
                    </div>
                    {!mobileView &&
                        <div className={style.sortingBox}>
                            <Select
                                placeholder={`Sort by : ${sortingLabel} ⌵`}
                                value={`Sort by: `}
                                menuPortalTarget={document.body}
                                isSearchable={false}
                                options={sortingOptions}
                                styles={sortingStyle}
                                onChange={(selectedOption) => handleSorting(selectedOption)}
                            />
                        </div>
                    }
                </div>
            </div>
            {mobileView && <hr />}
            {displayType === 'grid' ?
                <div className={style.gridView}>
                    {filteredProducts.map((product, index) => (
                        <div className={style.gridBox} key={index}>
                            <div className={style.imageContainer} onClick={() => { navigate(`/product/${product?._id}`) }}>
                                <img src={product?.images[0]} alt="product_image" className={style.productImage} />
                                {isAuthenticated &&
                                    <div className={style.addToCartButtonGrid}>
                                        <img src={AddtoCart} alt="cart_icon" className={style.cartIcon}
                                            onClick={(event) => { handleAddToCart(product?._id, product?.name, product?.color, product?.images[0], product?.price, event) }} />
                                    </div>
                                }
                            </div>
                            <div className={style.gridDetailsContainer}>
                                <p>{product?.name}</p>
                                <p>Price - ₹ {product?.price}</p>
                                <p>{product?.color} | {product?.type} headphone</p>
                            </div>
                        </div>
                    ))}
                </div>
                :
                <div className={style.listView}>
                    {filteredProducts.map((product, index) => (
                        <div className={style.listBox} key={index}>
                            <div className={style.imageContainer} >
                                <img src={product?.images[0]} alt="product_image" className={style.productImage} />
                                {isAuthenticated &&
                                    <div className={style.addToCartButtonList}>
                                        <img src={AddtoCart} alt="cart_icon" className={style.cartIcon}
                                            onClick={(event) => { handleAddToCart(product?._id, product?.name, product?.color, product?.images[0], product?.price, event) }} />
                                    </div>
                                }
                            </div>
                            <div className={style.listDetailsContainer}>
                                <p className={style.productName}>{product?.name}</p>
                                <p>Price - ₹ {product?.price}</p>
                                <p>{product?.color} | {product?.type} headphone</p>
                                <p>{product?.features?.map((feature, index) => (
                                    <span key={index}>{feature}, </span>
                                ))}</p>
                                <button onClick={() => { navigate(`/product/${product?._id}`) }}>Details</button>
                            </div>
                        </div>
                    ))}
                </div>
            }

            {!mobileView && isAuthenticated && <Feedback />}
            <ToastContainer hideProgressBar={true} />
        </div >
    )
}

export default Home;