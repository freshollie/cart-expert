import { RootState } from ".";
import { selectCheckoutDetails } from "./checkout";

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

const largerOffers = [
  {
    itemId: "34583",
    qualifier: 50,
    name: "50 for 42 on all Beans",
    for: 42,
  },
  {
    itemId: "39845",
    qualifier: 100,
    name: "100 for £13.50 on all coke",
    price: {
      amount: 1350,
      divisor: 100,
    },
  },
];

describe("checkoutDetails", () => {
  it("should return the checkout total along with all savings", () => {
    const state: RootState = {
      items: exampleItems,
      offers: exampleOffers,
      cart: {
        "34583": 3,
        "39845": 2,
      },
    };

    const total = selectCheckoutDetails(state);
    expect(total).toEqual({
      discounts: [
        {
          offer: exampleOffers[0],
          savings: {
            amount: 50,
            divisor: 100,
          },
        },
        {
          offer: exampleOffers[1],
          savings: {
            amount: 40,
            divisor: 100,
          },
        },
      ],
      subTotal: {
        amount: 290,
        divisor: 100,
      },
      total: {
        amount: 200,
        divisor: 100,
      },
    });
  });

  it("should handle multiple discounts being used", () => {
    const state: RootState = {
      items: exampleItems,
      offers: exampleOffers,
      cart: {
        "34583": 10, // 10 beans expects 3 discounts
        "39845": 21, // 21 cokes expects 10 discounts
      },
    };

    const total = selectCheckoutDetails(state);
    expect(total).toEqual({
      discounts: [
        {
          offer: exampleOffers[0],
          savings: {
            amount: 50,
            divisor: 100,
          },
        },
        {
          offer: exampleOffers[0],
          savings: {
            amount: 50,
            divisor: 100,
          },
        },
        {
          offer: exampleOffers[0],
          savings: {
            amount: 50,
            divisor: 100,
          },
        },
        ...new Array(10).fill(0).map(() => ({
          offer: exampleOffers[1],
          savings: {
            amount: 40,
            divisor: 100,
          },
        })),
      ],
      subTotal: {
        amount: 1970,
        divisor: 100,
      },
      total: {
        amount: 1420,
        divisor: 100,
      },
    });
  });

  it("should handle larger bundle sizes", () => {
    const state: RootState = {
      items: exampleItems,
      offers: largerOffers,
      cart: {
        "34583": 70,
        "39845": 120,
      },
    };

    const total = selectCheckoutDetails(state);
    expect(total).toEqual({
      discounts: [
        {
          offer: largerOffers[0],
          savings: {
            amount: 400,
            divisor: 100,
          },
        },
        {
          offer: largerOffers[1],
          savings: {
            amount: 5650,
            divisor: 100,
          },
        },
      ],
      subTotal: {
        amount: 11900,
        divisor: 100,
      },
      total: {
        amount: 5850,
        divisor: 100,
      },
    });
  });

  it("should not give discount where it does not apply", () => {
    const state: RootState = {
      items: exampleItems,
      offers: exampleOffers,
      cart: {
        "34583": 2,
        "39845": 1,
        "32844": 10.5,
      },
    };

    const total = selectCheckoutDetails(state);
    expect(total).toEqual({
      discounts: [],
      subTotal: {
        amount: 2259.5,
        divisor: 100,
      },
      total: {
        amount: 2259.5,
        divisor: 100,
      },
    });
  });

  it("should handle an empty cart", () => {
    const state: RootState = {
      items: exampleItems,
      offers: exampleOffers,
      cart: {},
    };
    const total = selectCheckoutDetails(state);
    expect(total).toEqual({
      discounts: [],
      subTotal: {
        amount: 0,
        divisor: 100,
      },
      total: {
        amount: 0,
        divisor: 100,
      },
    });
  });
});
