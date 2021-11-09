import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Home,
  QuestionDetails,
  LeaderBoards,
  Login,
  ProtectedRoute,
  LogOut,
  NavBar,
  NotFound,
  CreatePoll,
} from "./components";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/404">
            <NotFound />
          </Route>
          <ProtectedRoute exact path="/leaderboard" component={LeaderBoards} />
          <ProtectedRoute exact path="/add" component={CreatePoll} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/questions/:id"
            component={QuestionDetails}
          />
          <ProtectedRoute exact path="/logout" component={LogOut} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
