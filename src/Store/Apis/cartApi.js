import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const token = localStorage.getItem('token');

export const addToCart = createAsyncThunk("cart/addToCart", async ({ productId, name, color, image, price, quantity }, { rejectWithValue }) => {
    try {
        const requestUrl = `${backendUrl}/cart/add-product`;
        const reqPayload = { productId, name, color, image, price, quantity };
        // axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.post(requestUrl, reqPayload, headers:{ Authorization:token });
        toast.success(response.data.message);
        return response.data.response;
    } catch (error) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
}
);

export const getCartByUserId = createAsyncThunk("cart/getCart", async (_, { rejectWithValue }) => {
    try {
        const requestUrl = `${backendUrl}/cart/get-cart`;
        console.log(requestUrl);
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(requestUrl);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
}
);

export const updateCart = createAsyncThunk("cart/updateCart", async ({ productId, quantity }, { rejectWithValue }) => {
    try {
        const requestUrl = `${backendUrl}/cart/update`;
        const reqPayload = { productId, quantity };
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.put(requestUrl, reqPayload);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
}
);

export const deleteCart = createAsyncThunk(
    "cart/deleteCart",
    async (_, { rejectWithValue }) => {
        try {
            const requestUrl = `${backendUrl}/cart/delete`;
            axios.defaults.headers.common["Authorization"] = token;
            const response = await axios.delete(requestUrl);
            return response.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data.message);
        }
    }
);
