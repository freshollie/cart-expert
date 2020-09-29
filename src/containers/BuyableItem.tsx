import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Item } from "../types";
import cart, { selectCartAmount } from "../store/cart";
import "./BuyableItem.css";

const BuyableItem: React.FC<{ item: Item }> = ({ item }) => {
  const dispatch = useDispatch();
  const cartAmount = useSelector(selectCartAmount(item.id));

  const price = item.price.amount / item.price.divisor;

  return (
    <div className="item" data-testid={`item-${item.name.split(" ").join("-").toLowerCase()}`}>
      <h4>{item.name}</h4>

      <div data-testid="item-price">
        {price >= 1 && "£"}
        {price.toFixed(2)}
        {price < 1 && "p"}
        {item.price.perKg ? " Per KG" : " Each"}
      </div>
      {item.price.perKg ? (
        <div className="item-controls">
          <button
            data-testid="item-remove-all"
            onClick={() =>
              dispatch(cart.actions.remove({ id: item.id, amount: cartAmount }))
            }
            disabled={cartAmount === 0}
          >
            Remove
          </button>
          {new Array(6).fill(0).map((_, i) => (
            <button
              key={i * 100}
              onClick={() =>
                dispatch(
                  cart.actions.add({ id: item.id, amount: (i + 1) / 10 })
                )
              }
            >
              {(i + 1) * 100}g
            </button>
          ))}
        </div>
      ) : (
        <div className="item-controls">
          {" "}
          <button
            data-testid="item-remove"
            disabled={cartAmount < 1}
            onClick={() => dispatch(cart.actions.remove({ id: item.id }))}
          >
            -
          </button>
          <div data-testid="cart-amount">{cartAmount}</div>
          <button
            data-testid="item-add"
            onClick={() => dispatch(cart.actions.add({ id: item.id }))}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default BuyableItem;
