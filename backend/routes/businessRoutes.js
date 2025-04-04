const express = require("express");
const router = express.Router();
const Business = require("../models/Business");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// ✅ Create a New Business (matches frontend structure)
router.post("/", async (req, res) => {
  try {
    // You already structured the frontend to match this schema, so just pass the body directly
    const newBusiness = new Business(req.body);

    await newBusiness.save();
    res.status(201).json(newBusiness);
  } catch (error) {
    console.error("❌ Business creation failed:", error.message);
    res.status(400).json({ error: error.message });
  }
});



// ✅ Get All Businesses
router.get("/", async (req, res) => {
    try {
      const businesses = await Business.find();
      
      // ✅ Debugging Log
      console.log("✅ Businesses Retrieved:", businesses);
  
      // ✅ Check if data exists
      if (businesses.length === 0) {
        console.log("⚠️ No businesses found in MongoDB!");
      }
  
      res.json(businesses);
    } catch (error) {
      console.error("❌ Error fetching businesses:", error);
      res.status(500).json({ error: error.message });
    }
  });

// ✅ Search Businesses by Name, Service, or Location
router.get("/search", async (req, res) => {
    const { query, lat, lng, maxDistance = 10000 } = req.query;
  
    console.log("🔍 Search Query:", query);
    console.log("📍 Latitude:", lat, "Longitude:", lng);

    try {
        let aggregationPipeline = [];

        // ✅ Geolocation Search Using `$geoNear`
        if (lat && lng) {
            const latitude = parseFloat(lat);
            const longitude = parseFloat(lng);
            const maxDist = parseInt(maxDistance);

            console.log("🗺️ Searching Near:", longitude, latitude);

            aggregationPipeline.push({
                $geoNear: {
                    near: {
                        type: "Point",
                        coordinates: [longitude, latitude]
                    },
                    distanceField: "distance",
                    spherical: true,
                    maxDistance: maxDist
                }
            });
        }

        // ✅ Text Search for Business Name or Services
        let searchCriteria = {};
        if (query) {
            searchCriteria.$or = [
                { businessName: { $regex: query, $options: "i" } },
                { services: { $regex: query, $options: "i" } }
            ];
        }

        // Apply Search Filter Only if Query Exists
        if (query) {
            aggregationPipeline.push({ $match: searchCriteria });
        }

        // ✅ Execute Aggregation Query
        const businesses = await Business.aggregate(aggregationPipeline);
        console.log("✅ Search Results:", businesses);

        

        res.json(businesses);
    } catch (error) {
        console.error("❌ Search Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});
    // ✅ Get Single Business by ID
    router.get("/:id", async (req, res) => {
        try {
        const business = await Business.findById(req.params.id);
    
        if (!business) {
            return res.status(404).json({ error: "Business not found" });
        }
    
        res.json(business);
        } catch (error) {
        console.error("❌ Error fetching business:", error.message);
        res.status(500).json({ error: error.message });
        }
    });

    // 🔐 Business Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const business = await Business.findOne({ email });
    if (!business) return res.status(401).json({ message: "Email not found" });

    const match = await bcrypt.compare(password, business.password);
    if (!match) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: business._id }, "your-secret-key", { expiresIn: "1d" });

    res.json({ token, business });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
