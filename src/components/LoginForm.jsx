import React, { useState } from "react";
import { post } from "../clients/HttpClient";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { APP_PROPS } from "../constants/AppConstants";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const pageNavigation = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const onSuccess = (response) => {
      if (response.data.value) {
        localStorage.setItem("token", response.data.value);
        pageNavigation("/catalog/all");
        console.log("Login successful:", response.data);
      } else if (response.data.message === "login failed") {
        console.log("Login unsuccessful :", response.data);
        setError("Invalid email or password!");
      } else {
        console.log("Unexpected Error", response.data);
        setError("Unexpected Error occurred")
      }
    };

    const onError = (error) => {
      console.error("Login error:", error);
      setError("Invalid email or password!");
    };

    const apiUrl = `${APP_PROPS.bookstoreUrl}/user/login`;
    const userData = { email, password };
    post(apiUrl, userData, onSuccess, onError);
  };

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button type="submit" color="primary">
          Login
        </Button>
      </Form>
      {error && <Alert color="danger">{error}</Alert>}
    </div>
  );
};

export default LoginForm;
