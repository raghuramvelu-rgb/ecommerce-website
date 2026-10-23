import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { items: [] },
  reducers: {
    toggleFavorite: (state, { payload: product }) => {
      const exists = state.items.some((item) => item.id === product.id);
      if (exists) state.items = state.items.filter((item) => item.id !== product.id);
      else state.items.push(product);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const selectFavorites = (state) => state.favorites.items;
export const selectIsFavorite = (id) => (state) =>
  state.favorites.items.some((item) => item.id === id);

export default favoritesSlice.reducer;