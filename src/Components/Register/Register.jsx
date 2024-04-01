import React, { useEffect, useState } from 'react'
import AppLogo from '../../Assets/Icons/AppLogo.png'
import style from './Register.module.css'
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../Store/Apis/userApi';
import { ToastContainer } from 'react-toastify';
import MobileBrandHeader from '../BrandHeader/MobileBrandHeader';


const Register = () => {
    const [userData, setUserData] = useState({ name: '', phone: '', email: '', password: '' });
    const [errorData, setErrorData] = useState({ name: '', phone: '', email: '', password: '' });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const [mobileView, setMobileView] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setMobileView(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (isAuthenticated) navigate('/')
    }, [navigate, isAuthenticated])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
        setErrorData({ ...errorData, [name]: '' })
    }

    const handleRegister = (e) => {
        e.preventDefault();
        const { name, phone, email, password } = userData;

        const errors = {};

        if (!name.trim()) {
            errors.name = "Name is Required*";
        }

        if (!phone.trim()) {
            errors.phone = 'Mobile Number is Required*';
        }


        if (!email.trim()) {
            errors.email = "Email is required*";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid*";
        }

        if (!password.trim()) {
            errors.password = 'Password is Required*';
        }

        if (Object.keys(errors).length > 0) {
            setErrorData(errors);
            return;
        }

        dispatch(register({ name, phone, email, password }));
    }
    return (
        <div className={style.container}>
            {mobileView ?
                <MobileBrandHeader /> :
                <div className={style.header}>
                    <img src={AppLogo} alt="app-logo" />
                    <span>Musicart</span>
                </div>
            }
            <div className={style.main}>
                {mobileView && <heading>Welcome</heading>}
                <div className={style.form}>
                    <div className={style.formHeading}>Create Account {mobileView && <small>Don’t have an account?</small>}</div>

                    <div className={style.input}>
                        <label htmlFor="name">Your name</label>
                        <input type="text" id='name' name='name' onChange={handleChange} />
                        {errorData.name && <p className={style.error}>{errorData.name}</p>}
                    </div>

                    <div className={style.input}>
                        <label htmlFor="phone">Mobile number</label>
                        <input type="number" id='phone' name='phone' onChange={handleChange} />
                        {errorData.phone && <p className={style.error}>{errorData.phone}</p>}
                    </div>

                    <div className={style.input}>
                        <label htmlFor="email">Email Id</label>
                        <input type="text" id='email' name='email' onChange={handleChange} />
                        {errorData.email && <p className={style.error}>{errorData.email}</p>}
                    </div>

                    <div className={style.input}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' name='password' onChange={handleChange} />
                        {errorData.password && <p className={style.error}>{errorData.password}</p>}
                    </div>

                    <div className={style.terms}>By enrolling your mobile phone number, you consent to receive automated security notifications via text message from Musicart. Message and data rates may apply.</div>
                    <button className={style.submitButton} onClick={handleRegister}>Continue</button>
                    <div className={style.formFooter}>By continuing, you agree to Musicart privacy notice and conditions of use.</div>
                </div>
                <div className={style.breakline}>Already have an account? <span onClick={() => { navigate('/login') }}>Sign in</span></div>
            </div>
            <Footer />
            <ToastContainer hideProgressBar={true} />
        </div >
    )
}

export default Register;