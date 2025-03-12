require("dotenv").config();
console.log("MONGO_URI:", process.env.MONGO_URI); // Debugging line
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt =  require ("bcryptjs");
const jwt = require("jsonwebtoken")

const Business = require("./models/Business"); 
const User = require("./models/user"); 

const app = express();
app.use(express.json());
app.use(cors());

//connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("API is running...");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));
// ------------------------Business Routes-----------------

//add a Business
app.post("/businesses", async (req, res) => {
  try {
    const { name, category, location, contact, website, instagram, rating, priceRange, services } = req.body;
    const newBusiness = new Business({ name, category, location, contact, website, instagram, rating, priceRange, services });
    await newBusiness.save();
    res.status(201).json(newBusiness);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//get all businesses
app.get("/businesses", async (req, res) => {
  try {
    const businesses = await Business.find().populate("reviews.user", "name");
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// 🔎 Search Businesses by Category & Location
app.get("/search", async (req, res) => {
  const { category, lat, lng } = req.query;

  try {
    const businesses = await Business.find({
      category: { $regex: category, $options: "i" }, // Case-insensitive search
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: 10000, // 10km radius
        },
      },
    });

    res.json(businesses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ------------------User ROUTES----------------------------

// 🔐 User Registration (Signup)
app.post("/users/signup", async (req, res) => {
  try {
      const { name, email, password, phone, role } = req.body;

      if (!["client", "business"].includes(role)) {
          return res.status(400).json({ message: "Invalid role. Must be 'client' or 'business'." });
      }

      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "User already exists" });

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new User({ name, email, password: hashedPassword, phone, role });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// 🔑 User Login
app.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//save favourit business

//post a review

// ---------------------------start server-----------------------------------
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



