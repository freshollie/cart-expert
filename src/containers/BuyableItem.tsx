import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Item } from "../types";
import cart, { selectCartAmount } from "../store/cart";

const BuyableItem: React.FC<{ item: Item }> = ({ item }) => {
  const dispatch = useDispatch();
  const cartAmount = useSelector(selectCartAmount(item.id));
  const [inputAmount, setAmount] = useState(1);

  const price = item.price.amount / item.price.divisor;
  return (
    <div>
      <div>{item.name}</div>

      <div>
        {price >= 1 && "£"}
        {price.toFixed(2)}
        {price < 1 && "p"}
        {item.price.perKg ? " Per KG" : " Each"}
      </div>
      {item.price.perKg ? (
        <div>
          <button
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
        <div>
          {" "}
          <button
            disabled={cartAmount < 1}
            onClick={() => dispatch(cart.actions.remove(item))}
          >
            -
          </button>
          <div>{cartAmount}</div>
          <button onClick={() => dispatch(cart.actions.add(item))}>+</button>
        </div>
      )}
    </div>
  );
};

export default BuyableItem;
