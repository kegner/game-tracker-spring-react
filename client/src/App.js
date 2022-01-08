import React from 'react';
import { Provider } from "react-redux";
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/layout/Header';
import Body from './components/layout/Body';
import Cookies from 'js-cookie';
import axios from 'axios';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.min.js';

const token = Cookies.get("XSRF-TOKEN");
axios.defaults.headers.common["CSRFToken"] = token;

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Body />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
