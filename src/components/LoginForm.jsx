import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/user/login', { email, password });
      // Assuming backend responds with a token upon successful login
      const token = response.data.token;
      // Store token in local storage or state for future requests
      localStorage.setItem('token', token);
      // Redirect or perform other actions upon successful login
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>email</label>
          <input type="text" value={email} onChange={(e) => setemail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginForm;