import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RemoveAuthedUser } from "../actions/AuthedUser";

const Navigation = () => {
  const AuthedUser = useSelector((s) => s.AuthedUser);
  const Users = useSelector((s) => s.Users);
  const dispatch = useDispatch();
  const handleLogout = () => {
    return dispatch(RemoveAuthedUser());
  };
  return (
    <div className="bg-light">
      {AuthedUser ? (
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/add">
              New Question
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/leaderboard">
              Leader Board
            </Link>
          </li>

          <li className="nav-item">
            <p className="nav-link text-dark">
              {AuthedUser && "Hello! " + Users[AuthedUser].name}
            </p>
          </li>
          <li className="nav-item">
            <p type="button" className="nav-link" onClick={handleLogout}>
              Logout
            </p>
          </li>
        </ul>
      ) : (
        <ul className="nav justify-content-center">
          <p className="nav-link">Login To continue</p>
        </ul>
      )}
      <hr className="text-secondary" />
    </div>
  );
};
export default Navigation;
