require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const businessRoutes = require("./routes/businessRoutes"); // ✅ Business Routes
//const userRoutes = require("./routes/userRoutes"); // ✅ If you have user routes

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB (Remove duplicate calls)
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Simple Route to Check API Status
app.get("/", (req, res) => {
    res.send("API is running...");
});

// ✅ Use business routes properly
app.use("/api/businesses", businessRoutes);

// ✅ If you have user routes, include them
// app.use("/api/users", userRoutes);  <-- Uncomment if you have user authentication

// --------------------------- Start Server ---------------------------
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
