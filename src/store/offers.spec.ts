import { selectOffers } from "./offers";
import store from ".";

describe("selectOffers", () => {
  it("should return a list of offers", () => {
    const offers = selectOffers(store.getState());

    expect(offers.length).toBeGreaterThanOrEqual(2);
    expect(offers).toMatchSnapshot();
  });
});
