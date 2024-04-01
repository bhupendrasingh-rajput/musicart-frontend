import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "../Apis/productApi";

let initialState = [];

const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            if (action.payload) {
                state.splice(0, state.length);
                state.push(...action.payload);
            }
        })
    },

});

export default productSlice.reducer;