import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Login = () => {
  const [user, setUser] = useState("");
  const dispatch = useDispatch();

  const users = useSelector((state) => {
    return state.app.users;
  });
  const isUserLoggedIn = useSelector((state) => {
    return state.app.loggedInUser.loggedIn;
  });
  let selectedUser = "";
  const availableUsers = Object.keys(users);

  const handleChange = (e) => {
    selectedUser = e.target.value;
    setUser(selectedUser);
  };
  const handleLogin = () => {
    dispatch({ type: "LOGIN", payload: user });
  };

  if (isUserLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="user-login">
        <h2>Login</h2>
        <div className="login-container">
          <label htmlFor="users">Login as</label>
          <select onChange={handleChange}>
            <option>select user</option>
            {availableUsers.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </>
  );
};

export default Login;
