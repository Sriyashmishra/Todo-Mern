import React, { useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/footer/Footer";
import About from "./components/about/About";
import Signup from "./components/signup/Signup";
import Signin from "./components/signin/Signin";
import Todo from "./components/todo/Todo";
import { useDispatch } from "react-redux";
import { authActions } from "./store";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();

  // Effect hook to persist login state after page refresh
  useEffect(() => {
    // Check if a user ID exists in session storage
    const id = sessionStorage.getItem("id");
    if (id) {
      // Re-trigger the login action in Redux store if ID is found
      dispatch(authActions.login(id)); 
    }
  }, [dispatch]);
 
  return (
    <div className="app-wrapper">
      <Router>
        {/* Navigation bar is visible on all pages */}
        <Navbar />
        
        {/* Define application routes and their respective components */}
        <div className="main-content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
        </div>

        {/* Footer stays at the bottom of every page */}
        <Footer />
      </Router>
    </div>
  );
};

export default App;