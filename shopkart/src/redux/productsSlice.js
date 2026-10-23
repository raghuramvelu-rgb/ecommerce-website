import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "https://fakestoreapi.com/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("Failed to load products");
      return await res.json();
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API}/${id}`);
      if (!res.ok) throw new Error("Failed to load product");
      return await res.json();
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle", 
    error: null,
    selected: null,
    selectedStatus: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(fetchProducts.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.items = a.payload;
      })
      .addCase(fetchProducts.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload || a.error.message;
      })
      .addCase(fetchProductById.pending, (s) => {
        s.selectedStatus = "loading";
      })
      .addCase(fetchProductById.fulfilled, (s, a) => {
        s.selectedStatus = "succeeded";
        s.selected = a.payload;
      })
      .addCase(fetchProductById.rejected, (s) => {
        s.selectedStatus = "failed";
      });
  },
});

export default productsSlice.reducer;