import {
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from ".";
import { Item } from "../types";

const ITEMS: readonly Item[] = [
  {
    id: "34583",
    name: "Beans",
    price: {
      amount: 50,
      divisor: 100,
    },
  },
  {
    id: "39845",
    name: "Coke",
    price: {
      amount: 70,
      divisor: 100,
    },
  },
  {
    id: "32844",
    name: "Oranges",
    price: {
      amount: 199,
      divisor: 100,
      perKg: true,
    },
  },
  {
    id: "34242",
    name: "Bananas",
    price: {
      amount: 199,
      divisor: 100,
      perKg: true,
    },
  },
];

export default createSlice({
  name: "items",
  initialState: ITEMS,
  reducers: {},
});

export const selectItemsLookup = createSelector(
  (state: RootState) => state.items,
  (items) =>
    items.reduce(
      (map, item) => ({ ...map, [item.id]: item }),
      {} as Record<string, Item>
    )
);

export const selectAllItems = (state: RootState) => state.items;

export const selectItembyId = createSelector(
  selectItemsLookup,
  (_: RootState, { id }: { id: string }) => id,
  (map, id) => map[id]
);
