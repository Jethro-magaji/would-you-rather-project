import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers/Index";
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";
import { logger } from "./middleware/Logger";

const store = createStore(reducers, applyMiddleware(thunk, logger));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
