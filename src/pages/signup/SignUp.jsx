import "./signup.scss";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { loginRequest, registerRequest } from "../../axios/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

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
    <div className="login">
      <h1>Register User</h1>
      <form onSubmit={handleRegister}>
        <input
          type="firstName"
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="LastName"
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <button type="submit">Register</button>
        {error && <span>wrong email or password or ⬇️</span>}
      </form>
      <div className="signup">
        Do you have an account?👉 &nbsp;
        <Link to="/login" className="link">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
