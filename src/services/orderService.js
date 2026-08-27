import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase";

export async function createOrder(userId, cartItems) {
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const orderRef = await addDoc(collection(db, "orders"), {
    userId,
    products: cartItems,
    totalPrice,
    createdAt: new Date().toISOString(),
    status: "placed",
  });

  return orderRef.id;
}

export async function getUserOrders(userId) {
  const ordersQuery = query(
    collection(db, "orders"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(ordersQuery);

  return snapshot.docs
    .map((orderDoc) => ({
      id: orderDoc.id,
      ...orderDoc.data(),
    }))
    .sort(
      (first, second) =>
        new Date(second.createdAt) - new Date(first.createdAt)
    );
}