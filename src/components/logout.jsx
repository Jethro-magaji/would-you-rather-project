import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const LogOut = () => {
  const dispatch = useDispatch();

  const isUserLoggedIn = useSelector((state) => {
    return state.app.loggedInUser.loggedIn;
  });

  useEffect(() => {
    dispatch({ type: "LOGOUT" });
  });

  if (!isUserLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <p>Logging out...</p>
    </>
  );
};

export default LogOut;
