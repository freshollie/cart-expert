import { createSelector } from "@reduxjs/toolkit";
import { isPriceOffer, Offer, Price } from "../types";
import { selectCartItems } from "./cart";
import { selectOffers } from "./offers";

export type Discount = { offer: Offer, savings: Price };
type CheckoutDetails = {
  total: Price;
  subTotal: Price;
  discounts: Discount[];
};

export const selectCheckoutDetails = createSelector(
  [selectCartItems, selectOffers],
  (cart, offers): CheckoutDetails => {
    // find all the discounts which apply to this cart
    const discounts = offers
      .map((offer) => {
        const cartItem = cart.find(({ item }) => offer.itemId === item.id);
        const numDiscounts = Math.floor(
          (cartItem?.amount ?? 0) / offer.qualifier
        );

        if (cartItem && numDiscounts > 0) {
          return new Array(numDiscounts).fill(0).map(() => ({
            offer,
            savings: {
              amount:
                offer.qualifier * cartItem.item.price.amount -
                (isPriceOffer(offer)
                  ? offer.price.amount
                  : offer.for * cartItem.item.price.amount),
              divisor: 100,
            },
          }));
        }
        return [];
      })
      .flat();

    // create totals and subtotals
    const subTotal = {
      amount: cart.reduce(
        (acc, { amount, item }) => acc + amount * item.price.amount,
        0
      ),
      divisor: 100,
    };
    const total = {
      amount:
        subTotal.amount -
        discounts.reduce((acc, discount) => acc + discount.savings.amount, 0),
      divisor: 100,
    };

    return {
      discounts,
      subTotal,
      total,
    };
  }
);
