import axios from "axios";
import './styledNavBar.css';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import notTwitterLogo from '../../assets/not-twitter-logo.png'



function NavBar({loggedInUser, setCurrentLoggedInUser}){
    const navigate = useNavigate();

    const logoutUser = async () => {
        await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/logout`, {
          withCredentials: true,
        });
        setCurrentLoggedInUser("");
        navigate("/");
      };



    return !loggedInUser ? (
        <div className="nav-bar">
            <Link to={"/"}>
                <img className="nav-bar-logo" src={notTwitterLogo} alt="logo" />
            </Link>
            <div className="nav-bar-right">
                <Link className="primary-button" to={"/login"}>Login</Link>
                <Link className="secondary-button" to={"/signup"}>Signup</Link>
            </div>
        </div>
    ) : (
        <div className="nav-bar">
            <Link to={"/"}>
                <img className="nav-bar-logo" src={notTwitterLogo} alt="logo" />
            </Link>
            <div className="nav-bar-center">
                <Link className="third-button" to={"/posts"}>Posts</Link>
                <Link className="third-button" to={"/add-post"}>Add Post</Link>
            </div>
            <div className="nav-bar-right">
                <p className="username-placeholder">Hi {loggedInUser.username}!</p>
                <button className="primary-button" onClick={logoutUser}>Logout</button>
            </div>
        </div>
    );
}


export default NavBar;