import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import AddQuestion from "./components/AddQuestion";
import Home from "./components/Home";
import Login from "./components/Login";
import { useEffect } from "react";
import getInitialData from "./actions/Initial";
import { useDispatch, useSelector } from "react-redux";
import Question from "./components/Question";
import Leaderboard from "./components/Leaderboard";
import P404 from "./components/404";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    return dispatch(getInitialData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const AuthedUser = useSelector((s) => s.AuthedUser);
  return (
    <Router>
      <Navigation />
      <Switch>
        {!AuthedUser && <Route to="/" component={Login} />}
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/add" component={AddQuestion} />
        <Route path="/questions/:id" component={Question} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route component={P404} />
      </Switch>
    </Router>
  );
}

export default App;
