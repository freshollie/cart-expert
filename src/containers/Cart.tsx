import React from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../store/cart";
import { Discount, selectCheckoutDetails } from "../store/checkout";
import { selectItembyId, selectItemsLookup } from "../store/items";
import { isPriceOffer } from "../types";

const Cart: React.FC = () => {
  const items = useSelector(selectCartItems);
  const itemLookup = useSelector(selectItemsLookup);
  const { total, subTotal, discounts } = useSelector(selectCheckoutDetails);

  return (
    <div>
      <h2>Cart</h2>
      {items.length > 0 ? (
        <table>
          <tbody>
            {items
              .map(({ item, amount }) =>
                new Array(item.price.perKg ? 1 : amount).fill(0).map((_, i) => (
                  <>
                    <tr key={item.id + i}>
                      <td>{item.name}</td>
                      <td>
                        {!item.price.perKg &&
                          (item.price.amount / item.price.divisor).toFixed(2)}
                      </td>
                    </tr>
                    {item.price.perKg && (
                      <tr key={item.id + "kg"}>
                        <td>
                          {amount.toFixed(3)} kg @{" "}
                          {item.price.amount / item.price.divisor}/kg
                        </td>
                        <td>
                          {(
                            (item.price.amount / item.price.divisor) *
                            amount
                          ).toFixed(2)}
                        </td>
                      </tr>
                    )}
                  </>
                ))
              )
              .flat()}
            <tr>
              <td>---</td>
              <td></td>
            </tr>
            <tr>
              <td> </td>
              <td></td>
            </tr>
            <tr>
              <td>Sub Total</td>
              <td>{(subTotal.amount / subTotal.divisor).toFixed(2)}</td>
            </tr>
            {discounts
              .map(({ offer, savings }, i) => (
                <>
                  <tr key={JSON.stringify(offer) + i}>
                    <td>
                      {itemLookup[offer.itemId].name} {offer.qualifier} for{" "}
                      {isPriceOffer(offer)
                        ? Math.floor(
                            offer.price.amount / offer.price.divisor
                          ) ===
                          offer.price.amount / offer.price.divisor
                          ? `£${offer.price.amount / offer.price.divisor}`
                          : `${(
                              offer.price.amount / offer.price.divisor
                            ).toFixed(2)}p`
                        : offer.for}
                    </td>
                    <td>-{(savings.amount / savings.divisor).toFixed(2)}</td>
                  </tr>
                </>
              ))
              .flat()}
            {discounts.length > 0 && (
              <>
                <tr>
                  <td>----</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Total Savings</td>
                  <td>
                    -
                    {((subTotal.amount - total.amount) / total.divisor).toFixed(
                      2
                    )}
                  </td>
                </tr>
              </>
            )}
            <tr>
              <td>----------------------</td>
              <td></td>
            </tr>
            <tr>
              <td>Total</td>
              <td>{(total.amount / total.divisor).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div>No items in cart</div>
      )}
    </div>
  );
};

export default Cart;
