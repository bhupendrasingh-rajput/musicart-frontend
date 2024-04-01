import { createSlice } from "@reduxjs/toolkit";
import { addToCart, getCartByUserId, updateCart, deleteCart } from "../Apis/cartApi";

const cartSlice = createSlice({
    name: "cart",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.fulfilled, (state, action) => {
                if (action.payload) {
                    state = { ...action.payload }
                    return state;
                }
            })
            .addCase(getCartByUserId.fulfilled, (state, action) => {
                if (action.payload) {
                    state = { ...action.payload }
                    return state;
                }
            })
            .addCase(updateCart.fulfilled, (state, action) => action.payload)
            .addCase(deleteCart.fulfilled, (state) => {
                state = null;
            })
    },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
