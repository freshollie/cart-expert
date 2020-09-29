import cart, { selectCartItems } from "./cart";
import store from ".";
import { selectAllItems } from "./items";

const useSelector = <T, S>(
  selector: (state: S) => T,
  store: { getState: () => S }
) => selector(store.getState());

beforeEach(() => store.dispatch(cart.actions.reset()));

describe("cart", () => {
  it("should initialise empty", () => {
    const items = useSelector(selectCartItems, store);
    expect(Object.entries(items).length).toBe(0);
  });

  it("should allow items to be added to the cart", () => {
    const [item1, item2] = useSelector(selectAllItems, store);
    {
      store.dispatch(cart.actions.add(item1));

      const items = useSelector(selectCartItems, store);
      expect(items).toEqual([
        {
          item: item1,
          amount: 1,
        },
      ]);
    }
    {
      store.dispatch(cart.actions.add(item2));

      const items = useSelector(selectCartItems, store);
      expect(items).toEqual([
        {
          item: item1,
          amount: 1,
        },
        {
          item: item2,
          amount: 1,
        },
      ]);
    }

    {
      store.dispatch(cart.actions.add(item1));
      store.dispatch(cart.actions.add(item1));
      store.dispatch(cart.actions.add(item1));
      store.dispatch(cart.actions.add(item1));

      const items = useSelector(selectCartItems, store);
      expect(items).toEqual([
        {
          item: item1,
          amount: 5,
        },
        {
          item: item2,
          amount: 1,
        },
      ]);
    }
  });

  it("should allow amounts of items to removed from the cart", () => {
    const [item1, item2, item3] = useSelector(selectAllItems, store);
    {
      store.dispatch(cart.actions.add(item1));
      store.dispatch(cart.actions.remove(item1));

      const items = useSelector(selectCartItems, store);
      expect(items).toEqual([
      ]);
    }
    {
      store.dispatch(cart.actions.add(item2));
      store.dispatch(cart.actions.add(item2));
      store.dispatch(cart.actions.remove(item2));
      store.dispatch(cart.actions.remove(item2));
      store.dispatch(cart.actions.remove(item2));

      const items = useSelector(selectCartItems, store);
      expect(items).toEqual([
      ]);
    }

    {
      store.dispatch(cart.actions.remove(item3));

      const items = useSelector(selectCartItems, store);
      expect(items).toEqual([
      ]);
    }
  });
});
