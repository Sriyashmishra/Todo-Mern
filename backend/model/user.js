const mongoose = require('mongoose');

// Schema for User account details
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true, // Email is mandatory for signup
        unique: true    // Prevents duplicate accounts with the same email
    },
    username: {
        type: String,
        unique: true    // Ensures every user has a unique display name
    },
    password: {
        type: String,
        required: true  // Password is required for security
    },
    // Array of references to the tasks in the 'List' collection
    List: [{
        type: mongoose.Types.ObjectId,
        ref: 'List'
    }]
});

// Export the model to perform CRUD operations
module.exports = mongoose.model('User', userSchema);