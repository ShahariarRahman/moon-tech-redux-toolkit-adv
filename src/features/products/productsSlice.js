import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productsAPI";

const initialState = {
    products: [],
    isLoading: false,
    isError: false,
    error: "",
};

export const getProduct = createAsyncThunk("products/getProducts", async () => {
    const products = fetchProducts();
    return products;
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getProduct.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.products = action.payload;
                state.isLoading = false;
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.products = [];
                state.isLoading = false;
                state.isError = false;
                state.error = action.error.message;
            })
    },
});

export default productsSlice.reducer;