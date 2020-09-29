import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import createMockStore from "redux-mock-store";
import { RootState } from "../store";
import ItemList from "./ItemList";

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

const mockStore = createMockStore<RootState>();

describe("ItemList", () => {
  it("should display the list of items in the store", () => {
    const { asFragment, getByText } = render(
      <Provider
        store={mockStore({
          items: exampleItems,
          offers: [],
          cart: {},
        })}
      >
        <ItemList />
      </Provider>
    );

    exampleItems.forEach((item) => expect(getByText(item.name)).toBeVisible());
    expect(asFragment()).toMatchSnapshot();
  });

  it("should display nothing when there are no items", () => {
    const { asFragment, queryByTestId } = render(
      <Provider
        store={mockStore({
          items: [],
          offers: [],
          cart: {},
        })}
      >
        <ItemList />
      </Provider>
    );

    exampleItems.forEach((item) =>
      expect(queryByTestId(item.name)).toBeFalsy()
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
