import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import createMockStore from "redux-mock-store";
import { RootState } from "../store";
import Cart from "./Cart";

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
];

const exampleOffers = [
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

const mockStore = createMockStore<RootState>();

describe("Cart", () => {
  it("should handle displaying the current items in the cart", async () => {
    const [item1, item2] = exampleItems;
    const { asFragment, getByText } = render(
      <Provider
        store={mockStore({
          items: exampleItems,
          offers: exampleOffers,
          cart: {
            [item1.id]: 1,
            [item2.id]: 1,
          },
        })}
      >
        <Cart />
      </Provider>
    );

    expect(getByText(item1.name)).toBeVisible();
    expect(getByText(item2.name)).toBeVisible();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should display discounts of products", async () => {
    const [item1, item2] = exampleItems;
    const { getByText, asFragment } = render(
      <Provider
        store={mockStore({
          items: exampleItems,
          offers: exampleOffers,
          cart: {
            [item1.id]: 3,
            [item2.id]: 2,
          },
        })}
      >
        <Cart />
      </Provider>
    );

    expect(getByText(`${item1.name} 3 for 2`)).toBeVisible();
    expect(getByText(`${item2.name} 2 for £1`)).toBeVisible();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should display the total of all items correctly", () => {
    const [item1, item2] = exampleItems;
    const { getByText } = render(
      <Provider
        store={mockStore({
          items: exampleItems,
          offers: exampleOffers,
          cart: {
            [item1.id]: 3,
            [item2.id]: 2,
          },
        })}
      >
        <Cart />
      </Provider>
    );

    expect(getByText("2.00")).toBeVisible();
  });

  it("should display a message when there are no items in the cart", () => {
    const [item1] = exampleItems;
    const { getByTestId, asFragment } = render(
      <Provider
        store={mockStore({
          items: exampleItems,
          offers: exampleOffers,
          cart: {
            [item1.id]: 0,
          },
        })}
      >
        <Cart />
      </Provider>
    );

    expect(getByTestId("cart-no-items-message")).toBeVisible();
    expect(asFragment()).toMatchSnapshot();
  });
});
