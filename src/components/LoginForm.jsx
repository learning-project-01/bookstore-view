import React, { useState } from "react";
import { post } from "../clients/HttpClient";

const LoginForm = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const onSuccess = (response) => {
      if (response.data.value) {
        localStorage.setItem("token", response.data.value);
      }

      console.log("Login successful:", response.data);
    };

    const onError = (error) => {
      console.error("Login error:", error);
      setError("Invalid email or password!");
    };
    const apiUrl = "http://localhost:8081/user/login";
    const userData = { email, password };
    post(apiUrl, userData, onSuccess, onError);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginForm;
