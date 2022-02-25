import React, { useState, useContext } from "react";
import './styledAuth.css';
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { LoggedUserConsumer } from "../../context/loggedUser";

function Login({ setCurrentLoggedInUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const body = {
      username,
      password,
    };
    try {
       const response = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/login`,
        body,
        { withCredentials: true }
      );
        toast.success("Login success");
        console.log(response.data);
        setCurrentLoggedInUser(response.data);
        navigate('/posts');
    } catch (e) {
      toast.error("Invalid login");
    }
  };

  return (
    <div className="auth-container">
        <h2 className="page-title">Login</h2>
        <form className="input-form" onSubmit={handleFormSubmit}>
          <input
            placeholder="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="user-input"
          />

          <input
          placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="user-input"
          />
          <p>Don't have an account? Signup <NavLink to="/signup">here!</NavLink></p>
          <button className="submit-button" type="submit">Enter</button>
        </form>
    </div>
  );
}

export default Login;