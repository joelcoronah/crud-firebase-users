import "./login.scss";
import React, { useState, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { loginRequest } from "../../axios/auth";
import { Box, Button, TextField } from "@mui/material";
import { Typography } from "@mui/material";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        loginRequest(user.uid)
          .then((res) => {
            console.log({ res });

            const { token, user } = res.data.data;
            dispatch({ type: "LOGIN", payload: { token, user } });
            navigate("/");
          })
          .catch((error) => {
            console.error({ error });
            setError(true);
          });
      })
      .catch((error) => {
        console.error({ error });
        setError(true);
      });
  };

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      autoComplete="off"
    >
      <div className="login">
        {/* <h1>SIGN IN</h1> */}
        <Typography variant="h6" component="h2">
          SIGN IN
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            type="email"
            required
            variant="filled"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            required
            variant="filled"
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value)}
          />
          {/* <button type="submit">Login</button> */}
          <Button variant="contained" type="submit">
            Login
          </Button>

          {error && <span>wrong email or password or ⬇️</span>}
        </form>
        <div className="signup">
          Create an Account 👉 &nbsp;
          <Link to="/sign-up" className="link">
            Sign up
          </Link>
        </div>
      </div>
    </Box>
  );
};

export default Login;
