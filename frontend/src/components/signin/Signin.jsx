import React, { useState } from "react";
import "./Signin.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";

const Signin = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  // --- FIXED FOR DEPLOYMENT ---
  // We removed "http://localhost:1000".
  // This tells the browser to use the domain where the app is hosted (Render).
  const BASE_URL = "/api/v1"; 

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      // This will now call https://your-app.onrender.com/api/v1/signin
      const response = await axios.post(`${BASE_URL}/signin`, Inputs);

      if (response.data.user && response.data.user._id) {
        console.log("Login Successful, ID:", response.data.user._id);

        // 1. Save ID to sessionStorage so Todo.jsx can use it
        sessionStorage.setItem("id", response.data.user._id);

        // 2. Update Redux global state
        dispatch(authActions.login());

        // 3. Clear inputs and navigate
        setInputs({ email: "", password: "" });
        history("/todo");
      }
    } catch (error) {
      if (error.response) {
        // Backend returned an error like "User not found" or "Wrong password"
        alert(error.response.data.message || "Invalid Credentials");
      } else {
        // Updated for production: User shouldn't see "port 1000" errors anymore
        alert("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="signin-container d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="signin-card p-4 p-md-5 shadow-lg">
              <h2 className="text-center mb-4 font-weight-bold">Sign In</h2>
              <form onSubmit={submit}>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    onChange={change}
                    value={Inputs.email}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={change}
                    value={Inputs.password}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-signin w-100 mb-3">
                  Sign In
                </button>
                <p className="text-center mt-3 text-black">
                  New to TODO? <br />
                  <Link to="/signup" className="signup-link">
                    Create an account
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;