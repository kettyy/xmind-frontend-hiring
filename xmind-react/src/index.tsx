import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { RootStore } from "@/stores/index.store";
import history from "@/history";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "mobx-react";
import { Router } from "react-router";
import "moment/locale/zh-cn";

ReactDOM.render(
  <Provider {...new RootStore()}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
