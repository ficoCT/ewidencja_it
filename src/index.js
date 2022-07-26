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
import ComputersManagerUser from "./components/ComputersManagerUser";
import Software from "./components/Software";
import OtherHardware from "./components/OtherHardware";
import Administration from "./components/Administration";
import Timetable from "./components/Timetable";
import Reports from "./components/Reports";
import Repairs from "./components/Repairs";
import 'bootstrap/dist/css/bootstrap.min.css';
import ComputersManagerAdmin from "./components/ComputersManagerAdmin";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />} >
                  <Route path="computers-manager-user" element={<ComputersManagerUser />} />
                  <Route path="software" element={<Software />} />
                  <Route path="otherHardware" element={<OtherHardware />} />
                  <Route path="administration" element={<Administration />} />
                  <Route path="timetable" element={<Timetable />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="repairs" element={<Repairs />} />

                  <Route path="computers-manager-admin" element={<ComputersManagerAdmin />} />
              </Route>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
