import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Software from "./components/Software";
import OtherHardware from "./components/OtherHardware";
import Administration from "./components/Administration";
import Timetable from "./components/Scheduler";
import Reports from "./components/Reports";
import Repairs from "./components/Repairs";
import 'bootstrap/dist/css/bootstrap.min.css';
import ComputersManagerAdmin from "./components/ComputersManagerAdmin";
import Login from "./components/Login";
import Register from "./components/Register";
import {AuthContextProvider} from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthContextProvider>
          <App />
      </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
