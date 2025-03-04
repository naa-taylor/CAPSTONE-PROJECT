const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true }, // e.g., "Lash Extensions"
    location: {
        type: { type: String, default: "Point" },
        coordinates: [Number] // Stores longitude & latitude
    },
    contact: { type: String },
    website: { type: String },
    instagram: { type: String },
    rating: { type: Number, default: 0 }, // Default rating is 0
    priceRange: { type: String }, // "$", "$$", "$$$"
    services: { type: [String] }, // e.g., ["Lash Lift", "Volume Lashes"]
    availability: {
        open: { type: String }, // Opening time
        close: { type: String } // Closing time
    },
    images: { type: [String] }, // URLs of uploaded images
    reviews: [
        {
            user: { type: String }, // Username of reviewer
            comment: { type: String }, // Review text
            rating: { type: Number } // Rating given
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

// Add geolocation index for searching nearby businesses
BusinessSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Business", BusinessSchema);
