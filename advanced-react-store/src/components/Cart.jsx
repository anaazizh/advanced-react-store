import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkout, removeFromCart } from "../features/cart/cartSlice";

function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const totalItems = items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const totalPrice = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    if (items.length === 0) {
      setCheckoutMessage("Your cart is already empty.");
      return;
    }

    dispatch(checkout());
    setCheckoutMessage("Checkout successful! Your cart has been cleared.");
  };

  return (
    <aside>
      <h2>Shopping Cart</h2>

      <p>Total products: {totalItems}</p>

      <p>Total price: ${totalPrice.toFixed(2)}</p>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        items.map((item) => (
          <article key={item.id}>
            <img
              src={item.image}
              alt={item.title}
              width="80"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src =
                  "https://via.placeholder.com/80?text=No+Image";
              }}
            />

            <h3>{item.title}</h3>

            <p>Quantity: {item.quantity}</p>

            <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>

            <button onClick={() => dispatch(removeFromCart(item.id))}>
              Remove
            </button>
          </article>
        ))
      )}

      <button onClick={handleCheckout}>Checkout</button>

      {checkoutMessage && <p>{checkoutMessage}</p>}
    </aside>
  );
}

export default Cart;