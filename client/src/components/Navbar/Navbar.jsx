import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import toast from "react-hot-toast";
import GeminiChat from "../GeminiAI/GeminiChat";

const Navbar = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    toast.success("Logged out successfully!");
  };

  const handleMenuClick = (menuName) => {
    setMenu(menuName);
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="logo" />
        </Link>
        <div className="navbar-right">
          <div className="navbar-chat">
          
          </div>
          <div className="navbar-search-icon">
            <Link to="/cart">
              <img src={assets.basket_icon} alt="Cart" />
            </Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
          {!token ? (
            <button onClick={() => setShowLogin(true)}>Sign In</button>
          ) : (
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="Profile" />
              <ul className="navbar-profile-dropdown">
                <li onClick={() => navigate("/myorders")}>
                  <img src={assets.bag_icon} alt="Orders" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="Logout" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
            <GeminiChat />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
