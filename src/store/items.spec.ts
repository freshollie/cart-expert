import * as items from "./items";
import store from ".";

describe("items", () => {
  it("should provide the list of available items", () => {
    const list = items.selectAllItems(store.getState());
    expect(list.length).toBeGreaterThanOrEqual(3);
    expect(list).toMatchSnapshot();
  });

  it("should allow items to be quiried by id", () => {
    const item = items.selectAllItems(store.getState())[2];
    expect(items.selectItembyId(store.getState(), { id: item.id})).toBe(item);
  })
});
