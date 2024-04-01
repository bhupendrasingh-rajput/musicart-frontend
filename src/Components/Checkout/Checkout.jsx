import React, { useEffect, useState } from 'react';
import BrandHeader from '../BrandHeader/BrandHeader';
import style from './Checkout.module.css';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { paymentOptions } from '../../Utils/Options';
import { paymentSelectStyles } from '../../Utils/CustomStyle';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart, getCartByUserId } from '../../Store/Apis/cartApi';
import { addinvoice, fetchInvoiceById } from '../../Store/Apis/invoiceApi';


const Checkout = ({ isAuthenticated, setIsAuthenticated, invoiceId, mobileView }) => {
    const [userName, setUserName] = useState(localStorage.getItem('name'));
    const [selectedProduct, setSelectedProduct] = useState({ name: '', color: '' });
    const [address, setAddress] = useState('');
    const [paymentMode, setPaymentMode] = useState(null);
    const [addressError, setAddressError] = useState('');
    const [paymentModeError, setPaymentModeError] = useState('');
    const [invoiceProducts, setInvoiceProducts] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(state => state?.cart);
    const invoice = useSelector(state => state?.invoice?.selectedInvoice);

    const handleProductClick = (product) => {
        setSelectedProduct({ ...product });
    }

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
        setAddressError('');
    }

    const handlePaymentModeChange = (selectedOption) => {
        setPaymentMode(selectedOption);
        setPaymentModeError('');
    }

    const handlePlaceOrder = () => {
        if (!address) {
            setAddressError('* Please enter delivery address!');
        }
        if (!paymentMode) {
            setPaymentModeError('* Please select a payment mode!');
        }

        if (address && paymentMode) {
            const orderDetails = {
                userName: userName || localStorage.getItem('name'),
                address: address,
                paymentMode: paymentMode.value,
                cart: cart?.products,
                totalPrice: cart?.totalPrice
            };

            dispatch(addinvoice(orderDetails)).then(() => {
                dispatch(deleteCart());
            })
            navigate('/order');
        }
    }

    useEffect(() => {
        if (cart?.products?.length > 0) {
            setSelectedProduct({ ...cart.products[0] });
        }
    }, [cart]);

    useEffect(() => {
        if (invoiceId) {
            dispatch(fetchInvoiceById(invoiceId));
        }
    }, [dispatch, invoiceId]);

    useEffect(() => {
        if (invoiceId && invoice) {
            const { userName, address, paymentMode, products, totalPrice } = invoice;
            setUserName(userName);
            setAddress(address);
            setPaymentMode(paymentMode);
            setInvoiceProducts(products);
            setSelectedProduct({ ...products[0] })
        }
    }, [invoiceId, invoice]);

    useEffect(() => { dispatch(getCartByUserId()) }, [dispatch])

    return (
        <div className={style.checkout}>
            {!mobileView && <BrandHeader isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
            {mobileView && invoiceId && invoice ? 
            <></>:<></>}
            <div className={style.buttonRow}>
                {mobileView ?
                    <button onClick={() => { navigate(-1) }}>🡨</button> :
                    <button onClick={() => { navigate('/') }}>Back to products</button>
                }
            </div>
            {!mobileView && <div className={style.buttonRow}>
                <button onClick={() => { navigate('/cart') }}>Back to cart</button>
            </div>}
            <div className={style.checkoutRow}>{invoiceId && invoiceProducts ? 'Invoice' : 'Checkout'}</div>
            <div className={style.checkoutBox}>
                <div className={style.leftContainer}>
                    <div className={style.leftFirstRow} id={style.commonRow}>
                        <div className={style.boxContainer}><p>1. Delivery address</p></div>
                        <div className={style.boxContainer}>
                            <span>{userName}</span>
                            <textarea value={address} onChange={handleAddressChange}
                                readOnly={invoiceId && invoiceProducts}
                                style={invoiceId && invoiceProducts && { border: 'none' }}></textarea>
                            {addressError && <div className={style.error}>{addressError}</div>}
                        </div>
                    </div>
                    <hr />
                    <div className={style.leftSecondRow} id={style.commonRow}>
                        <div className={style.boxContainer}><p>2. Payment method</p></div>
                        <div className={style.boxContainer}>
                            {invoiceId && invoiceProducts ? (
                                <input
                                    type="text"
                                    value={invoice.paymentMode}
                                    readOnly
                                    className={style.readOnlyInput}
                                />
                            ) : (
                                <Select
                                    placeholder="Mode of payment"
                                    styles={paymentSelectStyles}
                                    options={paymentOptions}
                                    value={paymentMode}
                                    onChange={handlePaymentModeChange}
                                />
                            )}

                            {paymentModeError && <div className={style.error}>{paymentModeError}</div>}
                        </div>
                    </div>
                    <hr />
                    <div className={style.leftThirdRow} id={style.commonRow}>
                        <div className={style.boxContainer}><p>3. Review items and delivery</p></div>
                        <div className={style.boxContainer}>
                            <div className={style.imagesContainer}>
                                {(invoiceId && invoiceProducts) ? invoiceProducts.map((product, index) => (
                                    <img src={product?.image} alt="product-image" key={index} className={style.img}
                                        onClick={() => { handleProductClick(product) }}
                                    />
                                )) : cart?.products?.map((product, index) => (
                                    <img src={product?.image} alt="product-image" key={index} className={style.img}
                                        onClick={() => { handleProductClick(product) }}
                                    />
                                ))}
                            </div>
                            <p id={style.productName}>{selectedProduct?.name}</p>
                            <span>Clour : {selectedProduct?.color}</span>
                            {mobileView && <span>In Stock</span>}
                            <div id={style.deliveryTime}>Estimated delivery : <br />Monday — FREE Standard Delivery</div>
                        </div>
                    </div>
                    <hr />
                    {!mobileView &&
                        <div className={style.leftFourthRow} id={style.commonRow}>
                            {!invoiceId && !invoiceProducts &&
                                <div className={style.placeOrderRow}>
                                    <button onClick={handlePlaceOrder}>Place your order</button>
                                    <div>
                                        <p>Order Total : ₹{invoiceId && invoiceProducts ? invoice.totalPrice : (cart?.totalPrice + 45 || 45)}.00</p>
                                        <span>By placing your order, you agree to Musicart privacy notice and conditions of use.</span>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>
                <div className={style.rightContainer}>
                    {!mobileView &&
                        <div className={style.placeOrderBox}>
                            {!invoiceId && !invoiceProducts &&
                                <div className={style.firstRow}>
                                    <button onClick={handlePlaceOrder}>Place your order</button>
                                    <p>By placing your order, you agree to Musicart privacy notice and conditions of use.</p>
                                    <hr />
                                </div>
                            }
                            <div className={style.secondRow}>
                                <p>Order Summary</p>
                                <div>
                                    <span>Items :</span>
                                    <span>₹{invoiceId && invoiceProducts ? invoice.totalPrice : cart?.totalPrice}.00</span>
                                </div>
                                <div>
                                    <span>Delivery :</span>
                                    <span>₹45.00</span>
                                </div>
                            </div>
                            <hr />
                            <div className={style.thirdRow}>
                                <span>Order total :</span>
                                <span>₹{invoiceId && invoiceProducts ? (invoice.totalPrice + 45) : (cart?.totalPrice + 45 || 45)}.00</span>
                            </div>
                        </div>
                    }

                    {mobileView &&
                        <div className={style.placeOrderBox}>
                            {!invoiceId && !invoiceProducts &&
                                <div className={style.firstRow}>
                                    <button onClick={handlePlaceOrder}>Place your order</button>
                                </div>
                            }
                            <hr />
                            <div className={style.thirdRow}>
                                <p>Order total :</p>
                                <span>₹{invoiceId && invoiceProducts ? (invoice.totalPrice + 45) : (cart?.totalPrice + 45 || 45)}.00</span>
                            </div>

                            <div className={style.secondRow}>
                                <p>Order Summary</p>
                                <div>
                                    <span>Items :</span>
                                    <span>₹{invoiceId && invoiceProducts ? invoice.totalPrice : cart?.totalPrice}.00</span>
                                </div>
                                <div>
                                    <span>Delivery :</span>
                                    <span>₹45.00</span>
                                </div>
                            </div>

                        </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default Checkout;
