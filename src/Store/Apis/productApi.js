import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createAsyncThunk } from '@reduxjs/toolkit';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getAllProducts = createAsyncThunk('getAllProducts', async ({ type, brand, color, price, sortOption }, { rejectWithValue }) => {
    try {
        const queryParams = new URLSearchParams();

        if (type) { queryParams.append('type', type) }
        if (brand) { queryParams.append('brand', brand) }
        if (color) { queryParams.append('color', color) }
        if (price && price.min !== undefined) queryParams.append('minPrice', price.min);
        if (price && price.max !== undefined) queryParams.append('maxPrice', price.max);
        if (sortOption && sortOption?.field !== undefined) { queryParams.append('field', sortOption.field) }
        if (sortOption && sortOption?.order !== undefined) { queryParams.append('order', sortOption.order) }

        const requestUrl = `${backendUrl}/product/get-all?${queryParams}`;
        const response = await axios.get(requestUrl);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
})

export const getProductById = async (productId) => {
    try {
        const requestUrl = `${backendUrl}/product/${productId}`;
        const response = await axios.get(requestUrl);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
    }
}