import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Cart from "./Cart";

vi.mock("../firebase", () => ({
  auth: {
    currentUser: {
      uid: "test-user-123"
    }
  }
}));

vi.mock("../services/orderService", () => ({
  createOrder: vi.fn()
}));

const renderCart = (items = []) => {
  const store = configureStore({
    reducer: {
      cart: () => ({ items })
    }
  });

  return render(
    <Provider store={store}>
      <Cart />
    </Provider>
  );
};

describe("Cart component", () => {
  test("renders an empty shopping cart", () => {
    renderCart();

    expect(
      screen.getByRole("heading", { name: /shopping cart/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/total products:\s*0/i)).toBeInTheDocument();
    expect(screen.getByText(/total price:\s*\$0\.00/i)).toBeInTheDocument();
  });

  test("shows the correct quantity and total price for cart items", () => {
    renderCart([
      {
        id: 1,
        title: "Test Headphones",
        price: 25,
        quantity: 2
      }
    ]);

    expect(screen.getByText(/total products:\s*2/i)).toBeInTheDocument();
    expect(screen.getByText(/total price:\s*\$50\.00/i)).toBeInTheDocument();
  });
});