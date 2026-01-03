MERN Stack Todo Application

This is a full-stack task management application built with the MERN stack. It provides a seamless experience for users to organize their daily tasks with a secure authentication system and a responsive user interface.



Live Project URL: https://todo-mern-tp4g.onrender.com


🏠 Home & Dashboard

A clean and intuitive landing page to get users started immediately.

🔐 Authentication (Sign In / Sign Up)

Secure user access using specialized API routes for registration and login.

📋 Task Management

Add, update, and delete tasks with instant UI updates and persistent cloud storage.

🛠️ Tech Stack & Architecture

Frontend: React.js with Redux for state management, Axios for API calls, and React-Toastify for notifications.

Backend: Node.js and Express.js handling the business logic and routing.

Database: MongoDB Atlas for scalable, cloud-based data persistence.

Deployment: Render, utilizing a single-server architecture where the backend serves the production build of the frontend.

🚀 Key Deployment Features

To ensure this application runs smoothly in a production environment like Render, several specific configurations were used:

Relative API Paths: Switched from hardcoded localhost URLs to relative paths (e.g., /api/v1) so the frontend and backend communicate on the same domain automatically.

SPA Routing Fix: Implemented a Rewrite Rule (/* to /index.html) in the Render dashboard to prevent 404 errors when refreshing pages like /todo.

Environment Security: Sensitive database credentials (the MONGO_URI) are stored in Render's environment variables, keeping them off public code for safety.

Static Asset Serving: The Express server is optimized to serve the React build folder as static files.

💻 How to Run Locally

Clone the Repo

Bash

git clone https://github.com/Sriyashmishra/Todo-Mern.git
cd Todo-Mern
Install All Dependencies

Bash

npm install && cd frontend && npm install && cd ..
Configure Environment Create a .env file in the backend folder:

Plaintext

MONGO_URI=your_mongodb_connection_string
PORT=1000
Launch
