import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../store/cart";
import { selectCheckoutDetails } from "../store/checkout";
import { selectItemsLookup } from "../store/items";
import { isPriceOffer, Offer, Price } from "../types";
import "./Cart.css";

const formatOfferPrice = (offer: Offer): string | number => {
  if (isPriceOffer(offer)) {
    const price = offer.price.amount / offer.price.divisor;
    return Math.floor(price) === price ? `£${price}` : `${price.toFixed(2)}p`;
  }
  return offer.for;
};

const toPriceValue = (price: Price): number => price.amount / price.divisor;

const formatPrice = (price: Price): string => toPriceValue(price).toFixed(2);

const Cart: React.FC = () => {
  const items = useSelector(selectCartItems);
  const itemLookup = useSelector(selectItemsLookup);
  const { total, subTotal, discounts } = useSelector(selectCheckoutDetails);

  return (
    <div className="cart-container" data-testid="cart">
      <h2>Cart</h2>
      {items.length > 0 ? (
        <table className="cart-details">
          <tbody>
            {items.map(({ item, amount }) =>
              new Array(item.price.perKg ? 1 : amount).fill(0).map((_, i) => (
                <Fragment key={item.id + i}>
                  <tr>
                    <td>{item.name}</td>
                    <td>{!item.price.perKg && formatPrice(item.price)}</td>
                  </tr>
                  {item.price.perKg && (
                    <tr key={item.id + "kg"}>
                      <td>
                        {amount.toFixed(3)} kg @ {toPriceValue(item.price)}/kg
                      </td>
                      <td>
                        {formatPrice({
                          amount: item.price.amount * amount,
                          divisor: item.price.divisor,
                        })}
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            )}
            <tr>
              <td>---</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>
                <b>Sub Total</b>
              </td>
              <td>
                <b>{formatPrice(subTotal)}</b>
              </td>
            </tr>
            {discounts.map(({ offer, savings }, i) => (
              <tr key={JSON.stringify(offer) + i}>
                <td>
                  {itemLookup[offer.itemId].name} {offer.qualifier} for{" "}
                  {formatOfferPrice(offer)}
                </td>
                <td>-{formatPrice(savings)}</td>
              </tr>
            ))}
            {discounts.length > 0 && (
              <>
                <tr>
                  <td>----</td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <b>Total Savings</b>
                  </td>
                  <td>
                    -
                    {formatPrice({
                      amount: subTotal.amount - total.amount,
                      divisor: total.divisor,
                    })}
                  </td>
                </tr>
              </>
            )}
            <tr>
              <td className="break" />
              <td className="break" />
            </tr>
            <tr>
              <td>
                <b>Total to pay</b>
              </td>
              <td>
                <b>{formatPrice(total)}</b>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <b data-testid="cart-no-items-message">No items in cart</b>
      )}
    </div>
  );
};

export default Cart;
