const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  businessName: { type: String, required: true },
  category: { type: String, default: "Hair Salon" },

  location: {
    hasPhysicalLocation: { type: Boolean, required: true },
    address: { type: String }, // Only required if hasPhysicalLocation is true
    city: { type: String, required: true },
    province: { type: String, required: true },
    postalCode: { type: String },

    // GeoJSON format for spatial queries
    coordinates: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: function () {
          return this.hasPhysicalLocation || this.isMobile;
        }
      }
    }
  },

  isMobile: { type: Boolean, required: true },
  mobileOnly: { type: Boolean, default: false }, // Optional flag for filtering

  travelRadius: { type: Number, default: 0 }, // In KM (if mobile)
  serviceAreas: { type: [String] }, // List of cities/regions for mobile service

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
      // General / Salon
      "Haircut", "Blowout", "Hair Coloring", "Highlights", "Balayage", "Ombre",
      "Deep Conditioning", "Scalp Treatment", "Silk Press", "Keratin Treatment",
      "Perms", "Relaxer Treatment",
  
      // Men’s Cuts & Styling
      "Men's Haircut", "Beard Trim", "Fade", "Line Up", "Men’s Hair Styling",
  
      // Protective Styles / Extensions
      "Hair Extensions", "Tape-In Extensions", "Weave Install", "Wig Install",
      "Wig Customization",
  
      // Braids & Locs
      "Braiding", "Box Braids", "Knotless Braids", "Cornrows", "Faux Locs",
      "Locs Retwist", "Twist Out", "Curly Hair Styling"
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

  searchTags: { type: [String], default: [] }, // Extra keywords for improved search

  createdAt: { type: Date, default: Date.now }
});

// ✅ Geospatial index for location-based queries
BusinessSchema.index({ "location.coordinates": "2dsphere" });

module.exports = mongoose.model("Business", BusinessSchema);


