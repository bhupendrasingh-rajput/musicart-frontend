import React, { useEffect } from 'react';
import style from './MyCart.module.css';
import BrandHeader from '../BrandHeader/BrandHeader';
import { useNavigate } from 'react-router-dom';
import { quantityOptions } from '../../Utils/Options';
import { quantitySelectStyles } from '../../Utils/CustomStyle';
import Bag from '../../Assets/Icons/Bag.png'
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getCartByUserId, updateCart } from '../../Store/Apis/cartApi';

const MyCart = ({ isAuthenticated, setIsAuthenticated, mobileView }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(state => state?.cart);

    const handleQuantityChange = (productId, quantity) => {
        dispatch(updateCart({ productId, quantity }));
    };

    useEffect(() => { dispatch(getCartByUserId()) }, [dispatch])

    return (
        <div className={style.myCart}>
            {!mobileView && <BrandHeader isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
            <div className={style.buttonRow}>
                {mobileView ?
                    <button onClick={() => { navigate(-1) }}>🡨</button> : <button onClick={() => { navigate('/') }}>Back to products</button>
                }
            </div>
            {!mobileView &&
                <div className={style.MyCartRow}>
                    <img src={Bag} alt="bag-icon" /><span>My Cart</span>
                </div>
            }

            <div className={style.cartContainer}>
                <div className={style.leftContainer}>
                    <div className={style.leftUpper}>
                        {!mobileView && cart?.products?.map((prod, index) => (
                            <div className={style.cartProduct} key={index}>
                                <img src={prod.image} alt="product_image" />
                                <div className={style.detailsColumn}>
                                    <h4>{prod?.name}</h4>
                                    <p>Color - {prod?.color}</p>
                                    <p>In Stock</p>
                                </div>
                                <div className={style.detailsColumn}>
                                    <h4>Price</h4>
                                    <p>₹{prod?.price}</p>
                                </div>
                                <div className={style.detailsColumn}>
                                    <h4>Quantity</h4>
                                    <Select
                                        placeholder={prod?.quantity}
                                        options={quantityOptions}
                                        styles={quantitySelectStyles}
                                        onChange={(selectedOption) => { handleQuantityChange(prod?.productId, selectedOption.value) }}
                                    />
                                </div>
                                <div className={style.detailsColumn}>
                                    <h4>Total</h4>
                                    <p>₹{prod?.price * prod?.quantity}</p>
                                </div>

                            </div>
                        ))}

                        {mobileView && cart?.products?.map((prod, index) => (
                            <div className={style.cartProduct} key={index}>
                                <img src={prod.image} alt="product_image" />
                                <div className={style.detailsRow}>
                                    <p>{prod?.name}</p>
                                    <h4>₹{prod?.price}</h4>
                                    <span>Color : {prod?.color}</span>
                                    <span>In Stock</span>
                                </div>
                            </div>
                        ))}

                        {mobileView && <div className={style.mobileTotalPrice}>
                            <div>
                                <span>Convenience Fee</span>
                                <span>₹45</span>
                            </div>
                            <div>
                                <p>Total :</p>
                                <p>₹{(cart?.totalPrice + 45) || 0}</p>
                            </div>
                        </div>}
                    </div>
                    {!mobileView && <div className={style.leftLower}>
                        <span className={style.totalItems}>{cart?.products?.length || 'No'} Items</span>
                        <span className={style.totalPrice}>₹{(cart?.totalPrice) || 0}</span>
                    </div>}
                    {mobileView && <div className={style.leftLower}>
                        <span>Total Amount <b>₹{(cart?.totalPrice + 45) || 0}</b></span>
                        <button onClick={() => { navigate('/checkout') }}>PLACE ORDER</button>
                    </div>}
                </div>
                {!mobileView &&
                    <div className={style.rightContainer}>
                        <div className={style.rightUpper}>
                            <div className={style.priceDetails}>
                                <div>PRICE DETAILS</div>
                                <span><p>Total MRP</p> <p>₹{cart?.totalPrice}</p></span>
                                <span><p>Discount on MRP</p><p>₹0</p></span>
                                <span><p>Convenience Fee</p>₹45</span>
                            </div>
                            <div className={style.priceDetails}>
                                <div><p>Total Amount</p><p>₹{cart?.totalPrice ? cart?.totalPrice + 45 : 45}</p></div>
                            </div>
                        </div>
                        <div className={style.rightLower}>
                            <button onClick={() => { navigate('/checkout') }}>PLACE ORDER</button>
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}

export default MyCart
