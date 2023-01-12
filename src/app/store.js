import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cart/cartSlice";
import filterSlice from "../features/filter/filterSlice";
import logger from "redux-logger";
import productsSlice from "../features/products/productsSlice";

const store = configureStore({
    devTools: true,
    reducer: {
        cart: cartSlice,
        filter: filterSlice,
        products: productsSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger,),
});


export default store;