import React, { useEffect, useState } from 'react'
import style from './ProductDetails.module.css';
import BrandHeader from '../BrandHeader/BrandHeader';
import { useNavigate, useParams } from 'react-router-dom';

import Star from '../../Assets/Icons/Star.png';
import { getProductById } from '../../Store/Apis/productApi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Store/Apis/cartApi';
import { ToastContainer } from 'react-toastify';
import ImageCarousel from '../Corousel/ImageCarousel';

const ProductDetails = ({ isAuthenticated, setIsAuthenticated, mobileView }) => {
    const [product, setProduct] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { productId } = useParams();

    const getProduct = async (productId) => {
        const response = await getProductById(productId);
        setProduct(response);
    }

    const handleAddToCart = (productId, name, color, image, price) => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            dispatch(addToCart({ productId, name, color, image, price }))
        }
    }

    const handleBuyNow = (productId, name, color, image, price) => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            dispatch(addToCart({ productId, name, color, image, price }))
            navigate('/cart');
        }
    }

    useEffect(() => {
        getProduct(productId);
    }, [dispatch])
    return (
        <div className={style.mainContainer}>
            {!mobileView && <BrandHeader isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} productName={product?.name} />}
            <div className={style.buttonRow}>
                {mobileView ?
                    <button onClick={() => { navigate(-1) }}>🡨</button> :
                    <button onClick={() => { navigate('/') }}>Back to products</button>
                }
            </div>
            {mobileView &&
                <button className={style.buyNowButton}
                    onClick={() => { handleBuyNow(product?._id, product?.name, product?.color, product?.images[0], product?.price) }}
                >Buy Now</button>
            }
            {!mobileView &&
                <div className={style.productfeatures}>
                    {product?.features?.map((feature, index) => (
                        <span key={index}>{feature}, </span>
                    ))}
                </div>
            }
            <div className={style.productDetails}>
                {!mobileView &&
                    <div className={style.imageContainer}>
                        <img src={product?.images[0]} alt="" />
                    </div>
                }

                {mobileView &&
                    <ImageCarousel images={product?.images} />
                }
                <div className={style.details}>
                    <p className={style.productName}>{product?.name}</p>
                    <div className={style.reviewRow}>
                        <div className={style.stars}>
                            <div className={style.stars}>
                                {product && typeof product.rating === 'number' && Array(product.rating).fill().map((_, index) => (
                                    <img key={index} src={Star} alt="star" />
                                ))}
                            </div>
                        </div>
                        <span>(50 Customer reviews)</span>
                    </div>
                    {mobileView &&
                        <div className={style.productfeatures}>
                            {product?.features?.map((feature, index) => (
                                <span key={index}>{feature}, </span>
                            ))}
                        </div>
                    }
                    <p className={style.priceRow}>Price - ₹ {product?.price}</p>
                    <p className={style.colorAndType}>{product?.color} | {product?.type} headphone</p>
                    <div className={style.description}>
                        <ul> About this item
                            {
                                product?.description?.map((desc, index) => (
                                    <li key={index}>{desc}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <p className={style.priceRow}>Available - <span>In stock</span></p>
                    <p className={style.priceRow}>Brand - <span>{product?.brand}</span></p>
                </div>
            </div>
            {!mobileView &&
                <div className={style.bottomRow}>
                    <div className={style.subImageContainer}>
                        {product?.images?.slice(1, 4).map((image, index) => (
                            <div className={style.subImage} key={index}>
                                <img src={image} alt="image" />
                            </div>
                        ))}
                    </div>
                    <div className={style.buttonContainer}>
                        <button className={style.addToCartBtn}
                            onClick={() => { handleAddToCart(product?._id, product?.name, product?.color, product?.images[0], product?.price) }}>Add to cart</button>
                        <button className={style.buyNowBtn}
                            onClick={() => { handleBuyNow(product?._id, product?.name, product?.color, product?.images[0], product?.price) }}>Buy Now</button>
                    </div>
                </div>
            }

            {mobileView &&
                <div className={style.buttonContainer}>
                    <button className={style.addToCartBtn}
                        onClick={() => { handleAddToCart(product?._id, product?.name, product?.color, product?.images[0], product?.price) }}
                    >Add to cart</button>
                    <button className={style.buyNowBtn}
                        onClick={() => { handleBuyNow(product?._id, product?.name, product?.color, product?.images[0], product?.price) }}
                    >Buy Now</button>
                </div>
            }
            <ToastContainer hideProgressBar={true} />
        </div >
    )
}

export default ProductDetails;