import { render, getByTestId, fireEvent, getByText, getAllByText } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

describe("App Smoke Test", () => {
  it("should add item to cart when item is clicked", () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const coke = getByTestId(container, "item-coke");
    fireEvent.click(getByTestId(coke, "item-add"));

    const cart = getByTestId(container, "cart");
    expect(getByText(cart, "Coke")).toBeVisible();
    expect(getAllByText(cart, "0.70")[0]).toBeVisible();
  });
});
