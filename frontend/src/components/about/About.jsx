import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about">
      <div className="about-container">
        <h1>About Us</h1>
        <p>
          Welcome to TODO, where simplicity meets performance in a digital sanctuary designed for those who believe that a clear mind starts with an organized list. Built using the modern MERN stack—MongoDB, Express.js, React, and Node.js—our platform provides a seamless, real-time environment to manage your daily tasks, projects, and personal goals with lightning-fast responsiveness. We recognize that the digital age has brought a level of noise that often leads to procrastination and mental fatigue, which is why we’ve stripped away the unnecessary clutter to offer a minimalist, high-speed interface that puts your focus back where it belongs. By providing a system that prioritizes speed and reduces visual distractions, we empower you to reclaim your time and find the mental space necessary to execute your most important work.
        </p>
        <p>
          TODO is engineered to be more than just a task manager; it is a high-performance partner built for everyone who values order in a chaotic world. Whether you are a student at JIIT tracking rigorous semester deadlines and lab assignments or a professional managing a complex team workflow, our mission is to provide a reliable system of record that is as intuitive as it is powerful. By integrating MongoDB for flexible data storage with a reactive frontend, we ensure that your data is synced in real-time across all your sessions, allowing you to move from thought to action instantly. We are dedicated to bridging the gap between complex project management software and simple pen-and-paper lists, offering you the ultimate tool to organize your work and life, finally.
        </p>
      </div>
    </div>
  );
};

export default About;