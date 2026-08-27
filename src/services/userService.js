import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase";

export async function registerUser({ email, password, name, address }) {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const user = result.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    name: name || "",
    address: address || "",
    createdAt: new Date().toISOString(),
  });

  return user;
}

export async function loginUser(email, password) {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

export function logoutUser() {
  return signOut(auth);
}

export async function getUserProfile(uid) {
  const snapshot = await getDoc(doc(db, "users", uid));
  return snapshot.exists() ? snapshot.data() : null;
}

export function updateUserProfile(uid, updates) {
  return updateDoc(doc(db, "users", uid), updates);
}

export async function removeUserAccount() {
  const user = auth.currentUser;

  await deleteDoc(doc(db, "users", user.uid));
  await deleteUser(user);
}