const router = require("express").Router();
const User = require("../model/user");
const List = require("../model/list");

// --- CREATE TASK ---
router.post("/addTask", async (req, res) => {
    try {
        const { title, body, id } = req.body;
        // Find user by ID to ensure they exist before adding task
        const existingUser = await User.findById(id);

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create new task document and link to user
        const list = new List({ title, body, user: existingUser._id });
        await list.save();

        // Push task ID to User's List array (Matches 'List' schema field)
        existingUser.List.push(list._id); 
        await existingUser.save();

        res.status(200).json({ list });
    } catch (err) {
        console.error(err); // Log crash details for debugging
        res.status(500).json({ message: "Server Error" });
    }
});

// --- UPDATE TASK ---
router.put("/UpdateTask/:id", async (req, res) => {
    try {
        const { title, body } = req.body;
        // Find specific task by URL param ID and update content
        await List.findByIdAndUpdate(req.params.id, { title, body });
        res.status(200).json({ message: "Task Updated" });
    } catch (err) { 
        res.status(500).json({ message: "Server Error" });
    }
});

// --- DELETE TASK ---
router.delete("/DeleteTask/:id", async (req, res) => {
    try {
        const { id } = req.body; // User ID required to remove task reference
        // Remove task reference from User's List array first
        await User.findByIdAndUpdate(id, { $pull: { List: req.params.id } });
        // Delete the actual task document from the database
        await List.findByIdAndDelete(req.params.id);
        
        res.status(200).json({ message: "Task Deleted" });
    } catch (err) { 
        res.status(500).json({ message: "Server Error" });
    }
});

// --- GET TASKS ---
router.get("/getTasks/:id", async (req, res) => {
    try {
        // Fetch all tasks belonging to user ID, newest first
        const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });
        res.status(200).json({ list });
    } catch (err) {
        res.status(400).json({ message: "Invalid user id" });
    }
});

module.exports = router;