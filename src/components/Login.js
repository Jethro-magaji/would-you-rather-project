import React from "react";
import Layout from "./Layout";
//import {_getUsers} from "../utils/_DATA"
import GetAuthedUser from "../actions/AuthedUser";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Redirect } from "react-router-dom";

const App = () => {
  const users = useSelector((state) => state.Users);
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(GetAuthedUser(user));
    setLoggedIn(true);
  };
  const handleInputChange = (event) => {
    setUser(event.target.value);
  };
  if (loggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <Layout>
      <form>
        <label htmlFor="user">User Name</label>
        <select
          required
          id="user"
          defaultValue="initial"
          type="select"
          className="form-control"
          onChange={handleInputChange}
        >
          <option disabled value="initial" hidden>
            Select a User
          </option>
          {Object.keys(users).map((e) => (
            <option value={e} key={e}>
              {users[e].name}
            </option>
          ))}
          )}
        </select>
        <p />
        <button
          disabled={user === null}
          onClick={handleLogin}
          className="form-control w-50 mx-auto btn-outline-primary"
        >
          sign in
        </button>
      </form>
    </Layout>
  );
};

export default App;
