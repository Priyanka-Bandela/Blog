import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";
import "./Login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();

  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // debugger;

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

      // console.log(res);
    } catch (e) {
      dispatch({ type: "LOGIN_FAILURE" });
      console.log(e);
    }
  };

  // console.log(user);
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" placeholder="username" ref={userRef} />
        <label>Password</label>
        <input
          type="password"
          autoComplete="new-password"
          placeholder="password"
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
