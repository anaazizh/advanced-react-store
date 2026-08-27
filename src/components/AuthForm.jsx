import { useState } from "react";
import { loginUser, registerUser } from "../services/userService";

export default function AuthForm() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      if (isRegistering) {
        await registerUser({ email, password, name, address });
      } else {
        await loginUser(email, password);
      }

      setName("");
      setAddress("");
      setEmail("");
      setPassword("");
    } catch (firebaseError) {
      setError(firebaseError.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isRegistering ? "Create Account" : "Log In"}</h2>

      {isRegistering && (
        <>
          <input
            placeholder="Full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <input
            placeholder="Address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            required
          />
        </>
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        minLength="6"
        required
      />

      {error && <p>{error}</p>}

      <button type="submit">
        {isRegistering ? "Register" : "Log In"}
      </button>

      <button
        type="button"
        onClick={() => setIsRegistering(!isRegistering)}
      >
        {isRegistering
          ? "Already have an account? Log in"
          : "Need an account? Register"}
      </button>
    </form>
  );
}