import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    isLoading: false,
    isError: false,
    error: "",
};

export const getProduct = createAsyncThunk("products/getProducts", async () => {
    const res = await fetch('http://localhost:5000/product');
    const data = await res.json();
    return data;
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