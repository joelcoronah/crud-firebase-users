import "./App.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import List from "./pages/List";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import SignUp from "./pages/signup/SignUp";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";

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
          <Route path="products">
            <Route index element={<ProductList />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
