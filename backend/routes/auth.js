// Create router instance
const router = require("express").Router();

// Import bcrypt for hashing
const bcrypt = require("bcrypt");

// Import User model
const User = require("../model/user");


// ================= SIGN UP =================
router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // 1. Check if all fields are provided
        if (!email || !username || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        // 2. Check if user already exists (Optional but good for clarity)
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 3. Hash password asynchronously
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Create and save user
        const newUser = new User({
            email,
            username,
            password: hashedPassword
        });

        await newUser.save();
        res.status(200).json({ message: "Sign-Up successfully" });

    } catch (err) {
        console.error(err); // Log the actual error to your terminal for debugging
        res.status(500).json({ message: "Internal Server Error" });
    }
});



/// ================= SIGN IN =================
router.post("/signin", async (req, res) => {
    try {
        // 1. Find user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            // 404: The user does not exist in the database
            return res.status(404).json({ message: "Please sign up first" });
        }

        // 2. Compare the provided password with the hashed password in DB
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        
        if (!validPassword) {
            // 400: Bad Request (incorrect password)
            return res.status(400).json({ message: "Wrong password" });
        }

        // 3. Remove password from the response object for security
        const { password, ...others } = user._doc;

        // 4. Success: Send the user object back with a 200 status
        res.status(200).json({ user: others });

    } catch (err) {
        // 500: Unexpected server-side error
        res.status(500).json({ message: "Internal Server Error" });
    }
}); 
// Export router
module.exports = router;
