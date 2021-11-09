import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const NavBar = () => {
  const loggedIn = useSelector((state) => state.app.loggedInUser.loggedIn);
  return loggedIn ? (
    <nav>
      <ul className="nav-items">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add">Create Poll</Link>
        </li>
        <li>
          <Link to="/leaderboard">LeaderBoards</Link>
        </li>
        <li>
          <Link to="/logout">log out</Link>
        </li>
      </ul>
    </nav>
  ) : (
    <ul className="nav-items">
      <li>
        <h2>Welcome to the Would You Rather App</h2>
      </li>
    </ul>
  );
};

export default NavBar;
