import React, { useState } from "react";

import {
  signInWithEmailAndPassword,
  signInWithGoogle,
  signUpWithEmailAndPassword,
  signOut,
} from "../../Firebase/auth";

export default function Login({ type }) {
  //
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //
  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "Login In") {
      signInWithEmailAndPassword(email, password);
    } else {
      signUpWithEmailAndPassword(email, password);
    }
  };

  return (
    <div>
      <h2> {type} </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            className="email"
            autoComplete="true"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            className="password"
            autoComplete="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">{type}</button>
      </form>
    </div>
  );
}
