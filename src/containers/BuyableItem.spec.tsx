import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import createMockStore from "redux-mock-store";
import { RootState } from "../store";
import cart from "../store/cart";
import BuyableItem from "./BuyableItem";

const exampleItems = [
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
      amount: 2010,
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
];

const mockStore = createMockStore<RootState>();

describe("BuyableItem", () => {
  it("should display the details of the given item", () => {
    const [, item2] = exampleItems;
    const { getByText, getByTestId } = render(
      <Provider
        store={mockStore({
          items: exampleItems,
          cart: { [item2.id]: 2 },
          offers: [],
        })}
      >
        <BuyableItem item={item2} />
      </Provider>
    );

    expect(getByText(item2.name)).toBeVisible();
    expect(getByTestId("cart-amount")).toHaveTextContent("2");
    expect(getByTestId("item-price")).toHaveTextContent("£20.10");
  });

  it("should add the item to the cart when the plus button is clicked, and not allow an item to be removed when the item is not in the cart", () => {
    const [, item1] = exampleItems;
    const store = mockStore({
      items: exampleItems,
      cart: { [item1.id]: 0 },
      offers: [],
    });
    const { getByTestId } = render(
      <Provider store={store}>
        <BuyableItem item={item1} />
      </Provider>
    );

    expect(getByTestId("item-remove")).toBeDisabled();
    fireEvent.click(getByTestId("item-add"));
    expect(store.getActions()).toEqual([cart.actions.add({ id: "39845" })]);
  });

  it("should remove the item when the remove button is clicked", () => {
    const [, item1] = exampleItems;
    const store = mockStore({
      items: exampleItems,
      cart: { [item1.id]: 2 },
      offers: [],
    });
    const { getByTestId } = render(
      <Provider store={store}>
        <BuyableItem item={item1} />
      </Provider>
    );

    fireEvent.click(getByTestId("item-remove"));
    expect(store.getActions()).toEqual([cart.actions.remove({ id: "39845" })]);
  });
});
