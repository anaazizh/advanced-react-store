import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase";

const productsRef = collection(db, "products");

export async function getProducts() {
  const snapshot = await getDocs(productsRef);

  return snapshot.docs.map((productDoc) => ({
    id: productDoc.id,
    ...productDoc.data(),
  }));
}

export function createProduct(product) {
  return addDoc(productsRef, {
    ...product,
    createdAt: new Date().toISOString(),
  });
}

export function updateProduct(productId, updates) {
  return updateDoc(doc(db, "products", productId), updates);
}

export function deleteProduct(productId) {
  return deleteDoc(doc(db, "products", productId));
}