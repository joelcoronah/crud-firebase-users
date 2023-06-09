import "./App.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
// import SignUp from "./pages/SignUp";
import List from "./pages/List";
import Home from "./pages/Home";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import SignUp from "./pages/signup/SignUp";

function App() {
  const { currentUser, token } = useContext(AuthContext);

  console.log(token);

  const RequireAuth = ({ children }) => {
    return currentUser && token ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route
              index
              element={
                <RequireAuth>
                  <List />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="users">
            {/* <Route
              index
              element={
                // <RequireAuth>
                <List />
                // </RequireAuth>
              }
            /> */}
            {/* <Route
                path=":userId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
