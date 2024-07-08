import { useState } from "react";
import axiosApi from "../../src/conf/axios";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      username,
      password
    };

    try {
      const response = await axiosApi.post('/admin/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (response.status === 201) {
        console.log('Login successful:', response.data);
        setIsLoggedIn(true); // set state to true for successful login
        console.log('Token:', Cookies.get('token'));

      } else {
        console.log('Login failed:', response.status);
        if (response.status === 401) {
          alert('Invalid credentials');
        } else {
          alert('Login failed');
        }
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred while logging in');
      setUsername('');
      setPassword('');
    }
  }

  if (isLoggedIn) {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="flex w-full py-10 justify-center">
      <div>
        <form action="" method="post" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              autoComplete="on"
              value={username}
              className="bg-transparent"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              id="username"
              placeholder="Username"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              autoComplete="on"
              value={password}
              className="bg-transparent"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
