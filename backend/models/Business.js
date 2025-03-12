const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
    ownerName: { type: String, required: true }, 
    businessName: { type: String, required: true }, 
    category: { type: String, default: "Hair Salon" }, 
    location: {
        hasPhysicalLocation: { type: Boolean, required: true }, // Does the business have a salon? (true/false)
        address: { type: String }, // Only required if `hasPhysicalLocation` is true
        city: { type: String, required: true },
        province: { type: String, required: true },
        postalCode: { type: String },
        coordinates: {
            type: { type: String, default: "Point" },
            coordinates: [Number] // Longitude, Latitude
        }
    },
    isMobile: { type: Boolean, required: true }, // If true, they travel to clients
    travelRadius: { type: Number, default: 0 }, // Max distance in KM they will travel (if mobile)
    serviceAreas: { type: [String] }, // List of cities/regions where they serve (if mobile)
    contact: {
        phone: { type: String, required: true },
        email: { type: String, required: true }
    },
    website: { type: String },
    instagram: { type: String, required: true }, 
    facebook: { type: String }, 
    rating: { type: Number, default: 0 }, 
    priceRange: { type: String, enum: ["$", "$$", "$$$"] }, 
    services: { 
        type: [String], 
        enum: [
            "Haircut", "Hair Coloring", "Balayage", "Ombre", "Highlights", 
            "Deep Conditioning", "Hair Extensions", "Scalp Treatment", 
            "Silk Press", "Perms", "Blowout", "Braiding", "Locs Retwist", "Keratin Treatment"
        ] 
    }, 
    availability: {
        openTime: { type: String }, 
        closeTime: { type: String } 
    },
    images: { type: [String] }, 
    reviews: [
        {
            customerName: { type: String },
            comment: { type: String },
            rating: { type: Number, min: 1, max: 5 }
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

// Index for geolocation-based search
BusinessSchema.index({ "location.coordinates": "2dsphere" });

module.exports = mongoose.model("Business", BusinessSchema);
