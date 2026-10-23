import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore, persistReducer,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from "redux-persist";
import storage from "redux-persist/es/storage";
import productsReducer from "./productsSlice";
import cartReducer from "./cartSlice";
import favoritesReducer from "./favoritesSlice";
import authReducer from "./authSlice";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  favorites: favoritesReducer,
  auth: authReducer,
});

const persistConfig = {
  key: "shopkart",
  storage,
  whitelist: ["cart", "favorites", "auth"],
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);