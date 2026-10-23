import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] }, // {id, title, price, image, category, quantity}
  reducers: {
    addToCart: (state, { payload }) => {
      const { product, quantity = 1 } = payload;
      const found = state.items.find((i) => i.id === product.id);
      if (found) found.quantity += quantity;
      else
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity,
        });
    },
    increase: (state, { payload: id }) => {
      const item = state.items.find((i) => i.id === id);
      if (item) item.quantity += 1;
    },
    decrease: (state, { payload: id }) => {
      const item = state.items.find((i) => i.id === id);
      if (!item) return;
      if (item.quantity <= 1) state.items = state.items.filter((i) => i.id !== id);
      else item.quantity -= 1;
    },
    removeFromCart: (state, { payload: id }) => {
      state.items = state.items.filter((i) => i.id !== id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, increase, decrease, removeFromCart, clearCart } =
  cartSlice.actions;

export const selectCartItems = (s) => s.cart.items;
export const selectTotalItems = (s) =>
  s.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectTotalPrice = (s) =>
  s.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
export const selectQtyById = (id) => (s) =>
  s.cart.items.find((i) => i.id === id)?.quantity || 0;

export default cartSlice.reducer;