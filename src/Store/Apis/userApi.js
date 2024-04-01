import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createAsyncThunk } from '@reduxjs/toolkit';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const token = localStorage.getItem('token');

export const register = createAsyncThunk('register', async ({ name, phone, email, password }, { rejectWithValue }) => {
    try {
        const requestUrl = `${backendUrl}/auth/register`;
        const requestPayload = { name, phone, email, password };
        const response = await axios.post(requestUrl, requestPayload);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
})

export const login = createAsyncThunk('login', async ({ username, password }, { rejectWithValue }) => {
    try {
        const requestUrl = `${backendUrl}/auth/login`;
        const requestPayload = { username, password };
        const response = await axios.post(requestUrl, requestPayload);
        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
});

export const addFeedback = createAsyncThunk(
    'addFeedback',
    async ({ type, content }, { rejectWithValue }) => {
        try {
            const requestUrl = `${backendUrl}/auth/add-feedback`;
            axios.defaults.headers.common["Authorization"] = token;
            const requestPayload = { type, content };
            const response = await axios.post(requestUrl, requestPayload);
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data.message);
        }
    }
);