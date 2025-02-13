const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed password
    phone: { type: String }, // Optional phone number
    role: { type: String, enum: ["client", "business"], default: "client" }, // New role field
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Business" }], // Saved businesses
    reviews: [
        {
            business: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
            comment: { type: String },
            rating: { type: Number }
        }
    ],
    location: {
        type: { type: String, default: "Point" },
        coordinates: [Number] // Longitude, Latitude for location-based recommendations
    },
    createdAt: { type: Date, default: Date.now }
});

// Enable geolocation indexing
UserSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", UserSchema);
