import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { getUserOrders } from "../services/orderService";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (!user) {
      setOrders([]);
      return;
    }

    try {
      setError("");

      const userOrders = await getUserOrders(user.uid);

      setOrders(userOrders);
    } catch (loadError) {
      console.error(
        "Could not load orders:",
        loadError.code,
        loadError.message
      );

      setError("Could not load order history.");
    }
  });

  return unsubscribe;
}, []);

  return (
    <section>
      <h2>Order History</h2>

      {error && <p>{error}</p>}

      {orders.length === 0 ? (
        <p>No previous orders yet.</p>
      ) : (
        orders.map((order) => (
          <article key={order.id}>
            <h3>Order ID: {order.id}</h3>
            <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
            <p>Total: ${order.totalPrice.toFixed(2)}</p>

            <button onClick={() => setSelectedOrder(order)}>
              View Details
            </button>
          </article>
        ))
      )}

      {selectedOrder && (
        <section>
          <h3>Order Details</h3>
          <p>Order ID: {selectedOrder.id}</p>
          <p>Total: ${selectedOrder.totalPrice.toFixed(2)}</p>

          {selectedOrder.products.map((product) => (
            <div key={product.id}>
              <p>{product.title}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Price: ${(product.price * product.quantity).toFixed(2)}</p>
            </div>
          ))}

          <button onClick={() => setSelectedOrder(null)}>
            Close Details
          </button>
        </section>
      )}
    </section>
  );
}