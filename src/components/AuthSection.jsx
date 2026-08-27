import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { logoutUser } from "../services/userService";
import AuthForm from "./AuthForm";

export default function AuthSection() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  async function handleLogout() {
    await logoutUser();
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <section>
      <p>Logged in as: {user.email}</p>
      <button onClick={handleLogout}>Log Out</button>
    </section>
  );
}