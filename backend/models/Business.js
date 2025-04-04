const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const BusinessSchema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  businessName: { type: String, required: true },
  category: { type: String, default: "Hair Salon" },

  location: {
    hasPhysicalLocation: { type: Boolean, required: false },

    address: {
      type: String,
      required: function () {
        return this.location?.hasPhysicalLocation;
      },
    },

    city: {
      type: String,
      required: function () {
        return this.location?.hasPhysicalLocation;
      },
    },

    province: {
      type: String,
      required: function () {
        return this.location?.hasPhysicalLocation;
      },
    },

    postalCode: {
      type: String,
      required: false,
    },

    coordinates: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: {
        type: [Number],
        required: function () {
          return this.location?.hasPhysicalLocation;
        }
      }
    }
  },

  isMobile: { type: Boolean, default: false },
  mobileOnly: { type: Boolean, default: false },

  travelRadius: {
    type: Number,
    default: 0,
    required: function () {
      return this.isMobile;
    }
  },

  serviceAreas: {
    type: [String],
    required: function () {
      return this.isMobile;
    }
  },

  contact: {
    phone: { type: String, required: true },
    email: { type: String, required: true }
  },

  password: { type: String, required: true },

  website: { type: String },
  instagram: { type: String },
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

  searchTags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

// Pre-save hook to hash password
BusinessSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// ✅ Geospatial index
BusinessSchema.index({ "location.coordinates": "2dsphere" });

module.exports = mongoose.model("Business", BusinessSchema);
