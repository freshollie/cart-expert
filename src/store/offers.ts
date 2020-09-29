import { createSelector, createSlice } from "@reduxjs/toolkit";
import { create } from "domain";
import { RootState } from ".";
import { Offer } from "../types";

// Offers are in a list as there could be more than 1 discount to apply on an item
const OFFERS: readonly Offer[] = [
  {
    itemId: "34583",
    qualifier: 3,
    name: "3 for 2 on all Beans",
    for: 2,
  },
  {
    itemId: "39845",
    qualifier: 2,
    name: "2 for £1 on all coke",
    price: {
      amount: 100,
      divisor: 100,
    },
  },
];

export default createSlice({
  initialState: OFFERS,
  name: "offers",
  reducers: {},
});

export const selectOffers = (state: RootState) => state.offers;
