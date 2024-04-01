import React, { useState } from 'react';
import styles from './ImageCarousel.module.css';
import Prev from '../../Assets/Icons/Prev.png'
import Next from '../../Assets/Icons/Next.png'

const ImageCarousel = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(0);

    if (!images || images.length === 0) {
        return <div className={styles['error-message']}>No images provided.</div>;
    }

    const handleNext = () => {
        setCurrentImage((currentImage + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentImage((currentImage - 1 + images.length) % images.length);
    };

    const renderIndicators = () => {
        return images.map((image, index) => (
            <button
                key={index}
                className={`${styles['carousel-indicator']} ${index === currentImage ? styles.active : ''}`}
                onClick={() => setCurrentImage(index)}
            />
        ));
    };

    return (
        <div className={styles['carousel-container']}>
            <img className={styles['carousel-image']} src={images[currentImage]} alt="" />
            <div className={styles['carousel-navigation']}>
                <img className={styles['carousel-button']} onClick={handlePrev} src={Prev}/>
                <div className={styles['carousel-indicators']}>{renderIndicators()}</div>
                <img className={styles['carousel-button']} onClick={handleNext} src={Next}/>
            </div>
        </div>
    );
};

export default ImageCarousel;
