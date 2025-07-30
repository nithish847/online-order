import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    products: [],  // Array to hold product objects
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProducts: (state, action) => {
      // Set entire products array (e.g. after fetch)
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      // Add a new product to the list
      state.products.push(action.payload);
    },
    clearProducts: (state) => {
      // Clear all products (optional)
      state.products = [];
    },
  },
});

export const { setLoading, setProducts, addProduct, clearProducts } = productSlice.actions;

// ✅ Selector to get products array
export const selectProducts = (state) => state.product.products;

// ✅ Selector to get loading state
export const selectProductLoading = (state) => state.product.loading;

export default productSlice.reducer;
