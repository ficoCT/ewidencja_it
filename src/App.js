import React from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import { Routes, Route, Navigate, } from 'react-router-dom';
import BackgroundImage from "./components/BackgroundImage";
import './App.css';
import {AuthContextProvider} from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
      <div>
      <BackgroundImage/>
      <div className="main-element">
          <AuthContextProvider>
          <Routes>
              <Route
                  path="login"
                  element={
                       <Login />
                  }
              />
              <Route
                  path="home"
                  element={
                      <ProtectedRoute>
                          <Home/>
                      </ProtectedRoute>
                  }
              />
          </Routes>
          </AuthContextProvider>
      </div>
      </div>
  );
}

export default App;
