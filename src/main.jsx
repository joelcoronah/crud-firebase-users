import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import { AuthContextProvider } from "./context/AuthContext";
// import { DarkModeContextProvider } from "./context/darkModeContext";

// ReactDOM.render(
//   <React.StrictMode>
//     <DarkModeContextProvider>
//       <AuthContextProvider>
//         <App />
//       </AuthContextProvider>
//     </DarkModeContextProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
