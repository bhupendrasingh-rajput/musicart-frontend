import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import productReducer from "./Slices/productSlice";
import cartReducer from './Slices/cartSlice';
import invoiceReducer from './Slices/invoiceSlice';

const Store = configureStore({
    reducer: {
        user: userReducer,
        products: productReducer,
        cart: cartReducer,
        invoice: invoiceReducer,
    }
})

export default Store;