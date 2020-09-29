import React from "react";
import { useSelector } from "react-redux";
import { selectAllItems } from "../store/items";
import BuyableItem from "./BuyableItem";
import "./ItemList.css";

const ItemList: React.FC = () => {
  const items = useSelector(selectAllItems);

  return (
    <div className="item-list">
      {items.map((item) => (
        <BuyableItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ItemList;
