import React, { useEffect, useState } from 'react';
import AppLogo from '../../Assets/Icons/AppLogo.png';
import style from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Store/Apis/userApi';
import { ToastContainer } from 'react-toastify';
import MobileBrandHeader from '../BrandHeader/MobileBrandHeader';


const Login = () => {
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [errorData, setErrorData] = useState({ username: false, password: false });
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
        setLoginData({ ...loginData, [name]: value })
        setErrorData({ ...errorData, [name]: false })
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const { username, password } = loginData;

        const errors = {};

        if (!username.trim()) {
            errors.username = true;
        }

        if (!password.trim()) {
            errors.password = true;
        }

        if (Object.keys(errors).length > 0) {
            setErrorData(errors);
            return;
        }

        dispatch(login({ username, password }));
    }

    return (
        <div className={style.container}>

            {mobileView ?
                <MobileBrandHeader/>:
                <div className={style.header}>
                    <img src={AppLogo} alt="app-logo" />
                    <span>Musicart</span>
                </div>
            }
            <div className={style.main}>
                {mobileView && <heading>Welcome</heading>}
                <div className={style.form}>
                    <div className={style.formHeading}>Sign in {mobileView && <small>Already a customer?</small>}</div>
                    <div className={style.input}>
                        <label htmlFor="emailPhone">Enter your email or mobile number</label>
                        <input type="text" id='emailPhone' name='username' onChange={handleChange} />
                        {errorData.username && <p className={style.error}>Field is Required*</p>}
                    </div>

                    <div className={style.input}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' name='password' onChange={handleChange} />
                        {errorData.password && <p className={style.error}>Field is Required*</p>}
                    </div>
                    <button className={style.submitButton} onClick={handleLogin}>Continue</button>
                    <div className={style.formFooter}>By continuing, you agree to Musicart privacy notice and conditions of use.</div>
                </div>
                <div className={style.breakline}>New to Musicart?</div>
                <button className={style.button} onClick={() => { navigate('/register') }}>Create your Musicart account</button>
            </div>
            <Footer />
            <ToastContainer hideProgressBar={true} />
        </div>
    )
}

export default Login;