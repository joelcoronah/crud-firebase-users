// import "./signup.scss";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { loginRequest, registerRequest } from "../../axios/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Box, Button, TextField, Typography } from "@mui/material";

const SignUp = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();

    registerRequest({ email, password, firstName, lastName })
      .then((res) => {
        handleLogin(email, password);
      })
      .catch((error) => {
        console.error({ error });
        setError(true);
      });
  };

  const handleLogin = (email, password) => {
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
        setError(true);
      });
  };

  return (
    <Box
      // component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div className="login">
        {/* <h1>Register User</h1> */}
        <Typography variant="h6" component="h2">
          Register User
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            type="firstName"
            required
            variant="filled"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            type="LastName"
            required
            variant="filled"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
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
          {/* <input
          type="firstName"
          required
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        /> */}
          {/* <input
          type="LastName"
          required
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        /> */}
          {/* <input
          type="email"
          required
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        /> */}
          {/* <input
          type="password"
          placeholder="Password"
          onChange={(e) => setpassword(e.target.value)}
        /> */}
          {/* <button type="submit">Register</button> */}
          <Button variant="contained" type="submit">
            Register
          </Button>
          {error && <span>There is an error, try again.</span>}
        </form>
        <div className="signup">
          Do you have an account?👉 &nbsp;
          <Link to="/login" className="link">
            Login
          </Link>
        </div>
      </div>
    </Box>
  );
};

export default SignUp;
