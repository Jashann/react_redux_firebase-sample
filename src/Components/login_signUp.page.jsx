import React from "react";

import Login from "././templates/login.template";

export default function LoginSignUp() {
  return (
    <div className="d-flex container">
      <Login type="Login In" />
      <Login type="Sign Up" />
    </div>
  );
}
