import React, { useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    // simple fade-in animation on load
    const hero = document.querySelector(".home");
    hero.classList.add("show");
  }, []);

  return (
    <div className="home">
      <div className="container">
        <h1>
          Organize your <br /> work and life, finally.
        </h1>

        <p>
          Become focused, organized, and calm with <br />
          the world’s #1 task manager app.
        </p>

        <div className="home-buttons">
          <button className="btn primary">
            <Link to="/signup" className="click">Get Started</Link>
          </button>
          <button className="btn secondary">
            <Link to="/about" className="click utt">Learn more</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
