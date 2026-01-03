// Import mongoose
const mongoose = require("mongoose");

// MongoDB connection function
const conn = async () => {
    try {
        // Connect to MongoDB Atlas
        await mongoose.connect(
            "mongodb+srv://sriyashmishra0510_db_user:yash0510@cluster0.g5ixjjt.mongodb.net/todoDB"
        );

        console.log("MongoDB connected");
    } catch (error) {
        // Log error and stop server
        console.error("DB connection failed:", error.message);
        process.exit(1);
    }
};

// Export connection function
module.exports = conn;

