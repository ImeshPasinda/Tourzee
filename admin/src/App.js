import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { emergencyColumns, placeColumns, roomColumns, userColumns } from "./datatablesource";
import NewPlace from "./pages/newPlace/NewPlace";
import NewRoom from "./pages/newRoom/NewRoom";
import EmergencyFacility from "./pages/emergency/EmergencyFacility";
import AdminEmergency from "./pages/emergency/adminEmergency";
import AdminDestinationEmergency from "./pages/emergency/adminDestinationEmergency";
import AdminUrgentHelp from "./pages/emergency/adminUrgentHelp";
import AdminSBYG from "./pages/emergency/adminSBYG";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="places">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={placeColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewPlace />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="rooms">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={roomColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewRoom />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="emergencyfacility">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={emergencyColumns} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <EmergencyFacility />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
          <Route
            path="adminEmergency"
            element={
              <ProtectedRoute>
                <AdminEmergency />
              </ProtectedRoute>
            }
          />
          <Route
            path="adminDesEmergency"
            element={
              <ProtectedRoute>
                <AdminDestinationEmergency />
              </ProtectedRoute>
            }
          />
          <Route
            path="adminUrgent"
            element={
              <ProtectedRoute>
                <AdminUrgentHelp />
              </ProtectedRoute>
            }
          />
          <Route
            path="adminSBYG"
            element={
              <ProtectedRoute>
                <AdminSBYG />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
