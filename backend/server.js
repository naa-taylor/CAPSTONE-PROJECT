require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // For handling JWT tokens
const bcrypt = require("bcryptjs");
const businessRoutes = require("./routes/businessRoutes");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());


// Simple route to confirm server is running
app.get("/", async (req, res) => {
  res.send("Server is running...");
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (error) {
    console.error("❌ Error fetching businesses:", error);
    res.status(500).json({ error: error.message });
  }
});


// Use MONGO_URI from .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ MongoDB Atlas Connection Error:", err));

// GET route to fetch all customers
app.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers); // Send the list of customers as the response
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST route to create a new customer
app.post("/customers", async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT route to update a customer
app.put('/customers/:id', async (req, res) => {
  try {
    const user = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to fetch customer profile by email (or username)
app.get('/profile', async (req, res) => {
  try {
    const { email } = req.query; // Assuming you pass email as a query parameter
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(customer); // Return the user's profile details
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST route to handle booking for a customer
app.post('/bookings', async (req, res) => {
  const { customerName, businessId, date } = req.body;

  try {
    // Assuming the customer is logged in and their email is in the request headers or token
    const email = req.headers.email; // Use token or email from frontend for authenticated user
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Find the customer by email
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Create a new booking linked to the customer
    const newBooking = new Booking({
      customerId: customer._id,
      businessId,
      date,
    });

    // Save the booking
    await newBooking.save();

    res.status(201).json({ message: 'Booking successful!', booking: newBooking });
  } catch (error) {
    console.error("❌ Error creating booking:", error);
    res.status(500).json({ error: error.message });
  }
});


// Customer Schema
const CustomerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true }
});

const BookingSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  date: { type: Date, required: true },
});

const Booking = mongoose.model('Booking', BookingSchema);


// ✅ Use business routes properly
app.use("/api/businesses", businessRoutes);
const Customer = mongoose.model('Customer', CustomerSchema);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
