import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchColors = createAsyncThunk(
  'store/fetchColors',
  async () => {
    const response = await fetch('https://headphones-server.onrender.com/colors');
    return response.json();
  }
);

export const fetchBrands = createAsyncThunk(
  'store/fetchBrands',
  async () => {
    const response = await fetch('https://headphones-server.onrender.com/brands');
    return response.json();
  }
);

export const fetchProducts = createAsyncThunk(
  'store/fetchProducts',
  async ({ selectedBrand, selectedColor }) => {
    let query = 'https://headphones-server.onrender.com/products';

    let params = [];
    if (selectedBrand) {
      params.push(`brand_name=${encodeURIComponent(selectedBrand)}`);
    }
    if (selectedColor) {
      params.push(`color_options_like=${encodeURIComponent(selectedColor)}`);
    }
    if (params.length) {
      query += `?${params.join('&')}`;
    }

    const response = await fetch(query);
    return response.json();
  }
);

const storeSlice = createSlice({
  name: 'store',
  initialState: {
    products: [],
    brands: [],
    colors: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchColors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchColors.fulfilled, (state, action) => {
        state.colors = action.payload;
        state.loading = false;
      })
      .addCase(fetchColors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.loading = false;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default storeSlice.reducer;
