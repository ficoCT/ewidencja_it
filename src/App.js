import React from "react";
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from "./components/Login";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import ComputersManagerAdmin from "./components/ComputersManagerAdmin";
import ComputersUser from "./components/ComputersUser";
import Software from "./components/Software";
import OtherHardware from "./components/OtherHardware";
import Scheduler from "./components/Scheduler";
import Reports from "./components/Reports";
import Repairs from "./components/Repairs";
import AdministratorLog from "./components/AdministratorLog";
import UserList from "./components/UserList";
import NewUser from "./components/NewUser";
import Unauthorized from "./components/Unauthorized";
import NavbarApp from "./components/NavbarApp";
import { AuthContextProvider } from "./context/AuthContext";
import { userInputs } from "./formSource";

function App() {

  return (
      <div>
          <AuthContextProvider>
          <Routes>
              <Route
                  path="login"
                  element={
                       <Login />
                  }
              />
              <Route
                  path="/"
                  element={
                      <ProtectedRoute>
                          <NavbarApp/>
                      </ProtectedRoute>
                  }
              >
                  <Route
                      path="home"
                      element={
                          <ProtectedRoute>
                              <Home/>
                          </ProtectedRoute>
                      }
                  />
                  <Route
                      path="computer-user"
                      element={
                          <ProtectedRoute>
                              <ComputersUser />
                          </ProtectedRoute>
                      }
                  />
                  <Route
                      path="software"
                      element={
                          <ProtectedRoute>
                              <Software />
                          </ProtectedRoute>
                      }
                  />
                  <Route path="otherHardware"
                         element={
                             <ProtectedRoute>
                                 <OtherHardware />
                             </ProtectedRoute>
                         }
                  />
                  <Route
                      path="timetable"
                      element={
                          <ProtectedRoute>
                              <Scheduler />
                          </ProtectedRoute>
                      }
                  />
                  <Route
                      path="reports"
                      element={
                          <ProtectedRoute>
                              <Reports />
                          </ProtectedRoute>
                      }
                  />
                  <Route
                      path="repairs"
                      element={
                          <ProtectedRoute>
                              <Repairs />
                          </ProtectedRoute>
                      }
                  />
                  <Route
                      path="administrator-log"
                      element={
                          <ProtectedRoute>
                              <AdministratorLog />
                          </ProtectedRoute>
                      }
                  />
                  <Route
                      path="user-list"
                      element={
                          <ProtectedRoute>
                              <UserList/>
                          </ProtectedRoute>
                      }
                  />
                  <Route
                      path="new-user"
                      element={
                          <ProtectedRoute>
                              <NewUser inputs={userInputs} title="Dodaj użytkownika" />
                          </ProtectedRoute>
                      }
                  />
                  <Route
                      path="computers-manager-admin"
                      element={
                          <ProtectedRoute>
                              <ComputersManagerAdmin />
                          </ProtectedRoute>
                      }
                  />
              </Route>
              <Route
                  path="*"
                  element={
                      <Unauthorized />
                  }
              />
          </Routes>
          </AuthContextProvider>

      </div>
  );
}

export default App;
