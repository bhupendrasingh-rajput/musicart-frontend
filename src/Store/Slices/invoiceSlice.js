import { createSlice } from '@reduxjs/toolkit';
import { addinvoice, fetchInvoices, fetchInvoiceById } from '../Apis/invoiceApi';

const initialState = {
    allInvoices: [],
    selectedInvoice: null
};

const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addinvoice.fulfilled, (state, action) => {
                if (action.payload) {
                    state.allInvoices.push(action.payload.invoice);
                }
            })
            .addCase(fetchInvoices.fulfilled, (state, action) => {
                if (action.payload) {
                    state.allInvoices = action.payload;
                }
            })
            .addCase(fetchInvoiceById.fulfilled, (state, action) => {
                if (action.payload) {
                    state.selectedInvoice = action.payload.invoice;
                }
            })
    },
});

export default invoiceSlice.reducer;
