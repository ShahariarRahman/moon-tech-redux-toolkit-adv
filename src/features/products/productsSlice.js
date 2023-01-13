import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteProduct, fetchProducts, postProduct } from "./productsAPI";

const initialState = {
  products: [],
  isLoading: false,
  postSuccess: false,
  deleteSuccess: false,
  isError: false,
  error: "",
};

export const getProduct = createAsyncThunk("products/getProducts", async () => {
  const products = fetchProducts();
  return products;
});

export const addProduct = createAsyncThunk("products/addProduct", async (data) => {
  const products = postProduct(data);
  return products;
});

export const removeProduct = createAsyncThunk("products/removeProduct", async (id) => {
  const products = deleteProduct(id);
  return products;
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    togglePostSuccess: (state) => {
      state.postSuccess = false;
    },
    toggleDeleteSuccess: (state) => {
      state.deleteSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
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
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
        state.postSuccess = false;
        state.isError = false;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.postSuccess = true;
        state.isLoading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.postSuccess = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(removeProduct.pending, (state) => {
        state.isLoading = true;
        state.deleteSuccess = false;
        state.isError = false;
      })
      .addCase(removeProduct.fulfilled, (state) => {
        state.deleteSuccess = true;
        state.isLoading = false;
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.deleteSuccess = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const { togglePostSuccess } = productsSlice.actions;

export default productsSlice.reducer;