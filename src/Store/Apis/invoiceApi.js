import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const token = localStorage.getItem('token');

export const addinvoice = createAsyncThunk(
    'invoice/addinvoice',
    async (invoiceData, { rejectWithValue }) => {
        try {
            const requestUrl = `${backendUrl}/invoice/add`;
            axios.defaults.headers.common["Authorization"] = token;
            const response = await axios.post(requestUrl, invoiceData);
            return response.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchInvoices = createAsyncThunk(
    'invoice/fetchInvoices',
    async (_, { rejectWithValue }) => {
        try {
            const requestUrl = `${backendUrl}/invoice/get-all`;
            axios.defaults.headers.common["Authorization"] = token;
            const response = await axios.get(requestUrl);
            return response.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchInvoiceById = createAsyncThunk(
    'invoice/fetchInvoiceById',
    async (invoiceId, { rejectWithValue }) => {
        try {
            const requestUrl = `${backendUrl}/invoice/${invoiceId}`;
            axios.defaults.headers.common["Authorization"] = token;
            const response = await axios.get(requestUrl);
            return response.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data);
        }
    }
);
