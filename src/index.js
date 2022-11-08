import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter,
    Routes,
    Route, Navigate,
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
import {AuthContext, AuthContextProvider} from "./context/AuthContext";
import Navbar from "./components/NavbarApp";
import Home from "./components/Home";
import ComputersUser from "./components/ComputersUser";
import AdministratorLog from "./components/AdministratorLog";
import UserList from "./components/UserList";
import NewUser from "./components/NewUser";
import {userInputs} from "./formSource";
import {useContext} from "react";

//const {currentUser} = useContext(AuthContext);

// const RequireAuth = ({ children }) => {
//     return currentUser ? children : <Navigate to="/login" />;
// };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthContextProvider>
          <BrowserRouter>
              {/*<Routes>*/}
              {/*    /!*<Route*!/*/}
              {/*    /!*    path="/"*!/*/}
              {/*    /!*    element={*!/*/}
              {/*    /!*            <App/>*!/*/}
              {/*    /!*    }*!/*/}
              {/*    /!*>*!/*/}
              {/*        <Route*/}
              {/*            index*/}
              {/*            path="home"*/}
              {/*            element={*/}
              {/*                <RequireAuth>*/}
              {/*                    <Home/>*/}
              {/*                </RequireAuth>*/}
              {/*            }*/}
              {/*        />*/}
              {/*        <Route*/}
              {/*            path="register"*/}
              {/*            element={*/}
              {/*                <RequireAuth>*/}
              {/*                    <Register/> />*/}
              {/*                </RequireAuth>*/}
              {/*            }*/}
              {/*        />*/}
              {/*        <Route*/}
              {/*            path="login"*/}
              {/*            element={*/}
              {/*                    <Login />*/}
              {/*            }*/}
              {/*        />*/}
              {/*        <Route*/}
              {/*            path="computers-manager-user"*/}
              {/*            element={*/}
              {/*                <RequireAuth>*/}
              {/*                    <ComputersUser />*/}
              {/*                </RequireAuth>*/}
              {/*            }*/}
              {/*        />*/}
              {/*        <Route*/}
              {/*            path="software"*/}
              {/*            element={*/}
              {/*                <RequireAuth>*/}
              {/*                    <Software />*/}
              {/*                </RequireAuth>*/}
              {/*            }*/}
              {/*        />*/}
              {/*        <Route path="otherHardware"*/}
              {/*               element={*/}
              {/*                   <RequireAuth>*/}
              {/*                       <OtherHardware />*/}
              {/*                   </RequireAuth>*/}
              {/*               }*/}
              {/*        />*/}
              {/*        <Route*/}
              {/*            path="administration"*/}
              {/*            element={*/}
              {/*                <RequireAuth>*/}
              {/*                    <Administration />*/}
              {/*                </RequireAuth>*/}
              {/*            }*/}
              {/*        />*/}
              {/*        <Route*/}
              {/*            path="timetable"*/}
              {/*            element={*/}
              {/*                <RequireAuth>*/}
              {/*                    <Timetable />*/}
              {/*                </RequireAuth>*/}
              {/*            }*/}
              {/*        />*/}
              {/*        <Route*/}
              {/*            path="reports"*/}
              {/*            element={*/}
              {/*                <RequireAuth>*/}
              {/*                    <Reports />*/}
              {/*                </RequireAuth>*/}
              {/*            }*/}
              {/*        />*/}
              {/*        <Route*/}
              {/*            path="repairs"*/}
              {/*            element={*/}
              {/*                <RequireAuth>*/}
              {/*                    <Repairs />*/}
              {/*                </RequireAuth>*/}
              {/*            }*/}
              {/*        />*/}
              {/*        <Route*/}
              {/*            path="administrator-log"*/}
              {/*            element={*/}
              {/*                <RequireAuth>*/}
              {/*                    <AdministratorLog />*/}
              {/*                </RequireAuth>*/}
              {/*            }*/}
              {/*        />*/}
              {/*        <Route*/}
              {/*            path="computers-manager-admin"*/}
              {/*            element={*/}
              {/*                <RequireAuth>*/}
              {/*                    <ComputersManagerAdmin />*/}
              {/*                </RequireAuth>*/}
              {/*            }*/}
              {/*        />*/}
              {/*        /!*<Route*!/*/}
              {/*        /!*    path="new-user"*!/*/}
              {/*        /!*    element={*!/*/}
              {/*        /!*        <RequireAuth>*!/*/}
              {/*        /!*            <NewUser inputs={userInputs} title="Add NewUser User" />*!/*/}
              {/*        /!*        </RequireAuth>*!/*/}
              {/*        /!*    }*!/*/}
              {/*        /!*//*/}
              {/*        <Route*/}
              {/*            path="user-list"*/}
              {/*            element={*/}
              {/*                    <UserList/>*/}
              {/*            }*/}
              {/*        />*/}
              {/*        <Route*/}
              {/*            path="new-user"*/}
              {/*            element={*/}
              {/*                //<NewUser inputs={userInputs} title="Dodaj użytkownika" />*/}
              {/*                <NewUser inputs={userInputs} title="Dodaj użytkownika" />*/}
              {/*            }*/}
              {/*        />*/}
              {/*        <Route*/}
              {/*            path="*"*/}
              {/*            element={*/}
              {/*            <Navigate to="/login"*/}
              {/*                      replace*/}
              {/*            />}*/}
              {/*        />*/}
              {/*    /!*</Route>*!/*/}
              {/*</Routes>*/}
              <Routes>
                  <Route
                      path="/"
                      element={
                          <App/>
                      }
                  >
                      <Route
                          path="home"
                          element={

                              <Home/>

                          }
                      />
                      <Route
                          path="register"
                          element={

                              <Register/>

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

                              <ComputersUser />

                          }
                      />
                      <Route
                          path="software"
                          element={

                              <Software />

                          }
                      />
                      <Route path="otherHardware"
                             element={

                                 <OtherHardware />

                             }
                      />
                      <Route
                          path="administration"
                          element={

                              <Administration />

                          }
                      />
                      <Route
                          path="timetable"
                          element={

                              <Timetable />

                          }
                      />
                      <Route
                          path="reports"
                          element={

                              <Reports />

                          }
                      />
                      <Route
                          path="repairs"
                          element={

                              <Repairs />

                          }
                      />
                      <Route
                          path="administrator-log"
                          element={

                              <AdministratorLog />

                          }
                      />
                      <Route
                          path="computers-manager-admin"
                          element={

                              <ComputersManagerAdmin />

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
                              //<NewUser inputs={userInputs} title="Dodaj użytkownika" />
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
      </AuthContextProvider>
  </React.StrictMode>
);

reportWebVitals();
