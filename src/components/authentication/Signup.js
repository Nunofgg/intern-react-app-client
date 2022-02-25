import React, { useState, useContext } from "react";
import './styledAuth.css';
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { LoggedUserConsumer } from "../../context/loggedUser";

function Signup({ setCurrentLoggedInUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loggedInUser = useContext(LoggedUserConsumer);


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const body = {
      username,
      password,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/signup`,
        body,
        { withCredentials: true }
      );
      if (response.data.username) {
        toast.success("Signup success");
        setCurrentLoggedInUser(response.data); //Comes from the app component
        navigate.push("/profile");
      }
    } catch (e) {
      toast.error("Invalid signup");
    }
  };

  return (
    <div className="auth-container">
        <h2 className="page-title">Signup</h2>
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
          <button className="submit-button" type="submit">Create</button>
        </form>
    </div>
  );
}

export default Signup;