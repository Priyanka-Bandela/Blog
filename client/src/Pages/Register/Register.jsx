import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";

// export default function Register() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/auth/register", {
//         username,
//         email,
//         password,
//       });
//       // console.log(res);

//       res.data && window.location.replace("/login");
//     } catch (e) {
//       // console.log(e);
//       setError(true);
//     }
//   };
//   return (
//     <div className="register">
//       <span className="registerTitle">Register</span>
//       <form className="registerForm" onSubmit={handleSubmit}>
//         <label className="registerLabel">Username</label>
//         <input
//           type="text"
//           placeholder="Username"
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <label className="registerLabel">Email</label>
//         <input
//           type="text"
//           placeholder="email"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <label className="registerLabel">Password</label>
//         <input
//           type="password"
//           placeholder="Enter Password"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button className="registerButton" type="submit">
//           Register
//         </button>
//       </form>
//       <button className="registerLoginButton">
//         <Link className="link" to="/login">
//           Login
//         </Link>
//       </button>
//     </div>
//   );
// }

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      error: false,
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/register", {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      });
      res.data && window.location.replace("/login");
    } catch (e) {
      debugger;
      console.log(e);
      this.setState({
        error: true,
        errorMessage: e?.response?.data?.message || e.message,
      });
    }
  };

  render() {
    return (
      <div className="register">
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={this.handleSubmit}>
          <label className="registerLabel">Username</label>
          <input
            type="text"
            autoComplete="new-username"
            placeholder="Username"
            value={this.state.username}
            onChange={(e) => this.setState({ username: e.target.value })}
          />
          <label className="registerLabel">Email</label>
          <input
            type="email"
            placeholder="email"
            autoComplete="new-email"
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <label className="registerLabel">Password</label>
          <input
            type="password"
            autoComplete="new-password"
            placeholder="Enter Password"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <button className="registerButton" type="submit">
            Register
          </button>
        </form>
        <button className="registerLoginButton">
          <Link className="link" to="/login">
            Login
          </Link>
        </button>
        {this.state.error && (
          <span style={{ color: "red", marginTop: "8px" }}>
            {" "}
            {this.state.errorMessage
              ? this.state.errorMessage
              : "Something went wrong"}
          </span>
        )}
      </div>
    );
  }
}

export default Register;
