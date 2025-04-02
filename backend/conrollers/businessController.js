const Business = require("../models/Business");

// ✅ Search Businesses by Name, Service, and Location
exports.searchBusinesses = async (req, res) => {
    try {
        const { query, latitude, longitude, lat, lng, maxDistance = 10000 } = req.query; // Default max distance: 10km

        let searchCriteria = {};

        // ✅ Allow compatibility with different query parameter names
        const latValue = parseFloat(latitude || lat);
        const lngValue = parseFloat(longitude || lng);

        // ✅ Search by business name or service
        if (query) {
            searchCriteria.$or = [
                { businessName: { $regex: query, $options: "i" } }, // Case-insensitive name search
                { services: { $regex: query, $options: "i" } } // Case-insensitive service search
            ];
        }

        //changes: warp in Booleen
        // ✅ If geolocation is provided, find nearby businesses
        if (Boolean(latValue) && Boolean(lngValue)) {
            searchCriteria["location"] = {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lngValue, latValue] // Order: [longitude, latitude]
                    },
                    $maxDistance: parseInt(maxDistance) // Convert to integer
                }
            };
        }

        const businesses = await Business.find(searchCriteria);
        
        res.json(businesses);
    } catch (err) {
        console.error("Error searching businesses:", err);
        res.status(500).json({ error: "Server error" });
    }
};
