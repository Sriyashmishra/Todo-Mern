const mongoose = require('mongoose');

// Schema for individual Todo tasks
const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true // Title must be provided
    },
    body: {
        type: String,
        required: true // Description must be provided
    },
    // Reference to the User who owns this task
    user: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
}, { 
    timestamps: true // Automatically creates 'createdAt' and 'updatedAt' fields
});

// Export the model for use in routes
module.exports = mongoose.model('List', listSchema);