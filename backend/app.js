const express = require("express");
const path = require("path");
const cors = require("cors");
const conn = require("./conn/conn");
const auth = require("./routes/auth");
const list = require("./routes/list");

const app = express();

// Use path.resolve() to get the root directory
const _dirname = path.resolve();

// --- 1. Middleware ---
app.use(cors());
app.use(express.json());

// --- 2. Database ---
conn();

// --- 3. API Routes ---
app.use("/api/v1", auth);
app.use("/api/v2", list);

// --- 4. Serve Static Frontend Files ---
app.use(express.static(path.join(_dirname, "/frontend/build")));

// This RegEx handles all routes EXCEPT those starting with /api
app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"), (err) => {
    if (err) {
      // If the build folder is missing, this will help you debug
      res.status(500).send("Frontend build not found. Did you run 'npm run build'?");
    }
  });
});

// --- 5. Server Listening ---
const PORT = process.env.PORT || 1000; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});