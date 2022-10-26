import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Software from "./components/Software";
import OtherHardware from "./components/OtherHardware";
import Administration from "./components/Administration";
import Timetable from "./components/Scheduler";
import Reports from "./components/Reports";
import Repairs from "./components/Repairs";
import ComputersManagerAdmin from "./components/ComputersManagerAdmin";
import Register from "./components/Register";
import Login from "./components/Login";
import React, {useContext} from "react";
import Home from "./components/Home";
import {AuthContext} from "./context/AuthContext";
import {userInputs} from "./formSource";
import NewUser from "./components/NewUser";
import UserList from "./components/UserList";
import AdministratorLog from "./components/AdministratorLog";
import ComputersUser from "./components/ComputersUser";

function App() {

    const {currentUser} = useContext(AuthContext);

    const RequireAuth = ({ children }) => {
        return currentUser ? children : <Navigate to="/login" />;
    };

  return (
          <BrowserRouter>
              <Routes>
                  <Route
                      path="/*"
                  >
                      <Route
                          index
                          path="home"
                          element={
                              <RequireAuth>
                                  <Home/>
                              </RequireAuth>
                          }
                      />
                      <Route
                          path="register"
                          element={
                              <RequireAuth>
                                  <Register/> />
                              </RequireAuth>
                          }
                      />
                      <Route
                          path="login"
                          element={
                                  <Login />
                          }
                      />
                      <Route
                          path="computers-manager-user"
                          element={
                              <RequireAuth>
                                  <ComputersUser />
                              </RequireAuth>
                          }
                      />
                      <Route
                          path="software"
                          element={
                              <RequireAuth>
                                  <Software />
                              </RequireAuth>
                          }
                      />
                      <Route path="otherHardware"
                             element={
                                 <RequireAuth>
                                     <OtherHardware />
                                 </RequireAuth>
                             }
                      />
                      <Route
                          path="administration"
                          element={
                              <RequireAuth>
                                  <Administration />
                              </RequireAuth>
                          }
                      />
                      <Route
                          path="timetable"
                          element={
                              <RequireAuth>
                                  <Timetable />
                              </RequireAuth>
                          }
                      />
                      <Route
                          path="reports"
                          element={
                              <RequireAuth>
                                  <Reports />
                              </RequireAuth>
                          }
                      />
                      <Route
                          path="repairs"
                          element={
                              <RequireAuth>
                                  <Repairs />
                              </RequireAuth>
                          }
                      />
                      <Route
                          path="administrator-log"
                          element={
                              <RequireAuth>
                                  <AdministratorLog />
                              </RequireAuth>
                          }
                      />
                      <Route
                          path="computers-manager-admin"
                          element={
                              <RequireAuth>
                                  <ComputersManagerAdmin />
                              </RequireAuth>
                          }
                      />
                      {/*<Route*/}
                      {/*    path="new-user"*/}
                      {/*    element={*/}
                      {/*        <RequireAuth>*/}
                      {/*            <NewUser inputs={userInputs} title="Add NewUser User" />*/}
                      {/*        </RequireAuth>*/}
                      {/*    }*/}
                      {/*/>*/}
                      <Route
                          path="user-list"
                          element={
                                  <UserList/>
                          }
                      />
                      <Route
                          path="new-user"
                          element={
                              <NewUser inputs={userInputs} title="Dodaj użytkownika" />
                          }
                      />
                      <Route
                          path="*"
                          element={
                          <Navigate to="/login"
                                    replace
                          />}
                      />
                  </Route>
              </Routes>
          </BrowserRouter>
  );
}

export default App;
