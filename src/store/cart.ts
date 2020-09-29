import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { selectItemsLookup } from "./items";

const initialState = {} as Record<string, number>;
export default createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (
      state,
      { payload: { id, amount = 1 } }: PayloadAction<{ id: string; amount?: number }>
    ) => ({
      ...state,
      [id]: (state[id] ?? 0) + amount,
    }),
    remove: (
      state,
      { payload: { id, amount = 1 } }: PayloadAction<{ id: string; amount?: number }>
    ) => ({
      ...state,
      [id]: (state[id] ?? 0) - amount > 0 ? state[id]! - amount : 0,
    }),
    reset: () => initialState,
  },
});

export const selectCartAmount = (itemId: string) => (state: RootState) =>
  state.cart[itemId] ?? 0;

export const selectCartItems = createSelector(
  [(state: RootState) => state.cart, selectItemsLookup],
  (cart, items) =>
    Object.entries(cart)
      .map(([id, amount]) => ({ item: items[id], amount }))
      .filter(({ item, amount }) => item && amount > 0)
      .sort((item1, item2) => item1.item.id.localeCompare(item2.item.id))
);
