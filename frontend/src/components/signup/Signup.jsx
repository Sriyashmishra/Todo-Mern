import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const history = useNavigate();
  const [Inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });

  // --- FIXED FOR DEPLOYMENT ---
  // We removed "http://localhost:1000". Now it uses the current domain on Render.
  const BASE_URL = "/api/v1"; 

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      // This will now correctly call https://your-app.onrender.com/api/v1/register
      const response = await axios.post(`${BASE_URL}/register`, Inputs);
      
      if (response.data.message === "User already exists") {
        alert(response.data.message);
      } else {
        alert(response.data.message);
        setInputs({
          email: "",
          username: "",
          password: "",
        });
        history("/signin");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        // Updated error message to be more helpful for production
        alert("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="signup-container d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="signup-card p-4 p-md-5 shadow-lg">
              <h2 className="text-center mb-4 font-weight-bold">Sign Up</h2>
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

                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    name="username"
                    type="text"
                    className="form-control"
                    placeholder="Choose a username"
                    onChange={change}
                    value={Inputs.username}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter strong password"
                    onChange={change}
                    value={Inputs.password}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-signup w-100 mb-3">
                  Sign Up
                </button>

                <p className="text-center mt-3 text-black">
                  Already have an account?{" "}
                  <Link to="/signin" className="signin-link">
                    Sign In
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

export default Signup;