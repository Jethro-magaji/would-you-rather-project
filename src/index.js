import React from "react";
import ReactDOM from "react-dom";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/index";
import { getAllUsers } from "./store/reducers";

let persistor = persistStore(store);

//dispatches the initial action to get all users
store.dispatch(getAllUsers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
