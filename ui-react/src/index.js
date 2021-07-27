import React from "react";
import ReactDOM from "react-dom";
import {Router} from "react-router";
import {createBrowserHistory} from "history";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.js';
import 'jquery';
import 'popper.js';

export const history = createBrowserHistory();

ReactDOM.render(
    <Router history={history}>
      <App />
    </Router>,
    document.getElementById("root")
);
