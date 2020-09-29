import cart from "./cart";
import items from "./items";
import { configureStore } from "@reduxjs/toolkit";
import offers from "./offers";

const store = configureStore({
  reducer: {
    cart: cart.reducer,
    items: items.reducer,
    offers: offers.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;