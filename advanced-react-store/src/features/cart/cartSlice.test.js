import { beforeEach, describe, expect, test } from "vitest";
import cartReducer, { addToCart } from "./cartSlice";

describe("Cart integration", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test("adds a product to the cart", () => {
    const product = {
      id: 1,
      title: "Test Headphones",
      price: 25
    };

    const state = cartReducer(
      { items: [] },
      addToCart(product)
    );

    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toMatchObject({
      id: 1,
      title: "Test Headphones",
      price: 25,
      quantity: 1
    });
  });

  test("increases product quantity when the same product is added twice", () => {
    const product = {
      id: 1,
      title: "Test Headphones",
      price: 25
    };

    let state = cartReducer({ items: [] }, addToCart(product));
    state = cartReducer(state, addToCart(product));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });
});