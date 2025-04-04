// pages/api/register.js
import { connectToDatabase } from "../../utils/mongodb"; // Adjust the path as needed
import Customer from "../../../backend/models/Customer"; // Make sure this path is correct for your project
import bcrypt from "bcryptjs";

const uri = process.env.MONGODB_URI;

// Connect to the database
const connectDatabase = async () => {
  const client = await connectToDatabase();
  return client;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Destructure body fields
    const { firstName, lastName, username, email, address, phone, password } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !username || !email || !address || !phone || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Connect to the database and check if the email or username already exists
    const client = await connectDatabase();
    const existingUser = await Customer.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email or Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance and save it to the database
    const newCustomer = new Customer({
      firstName,
      lastName,
      username,
      email,
      address,
      phone,
      password: hashedPassword,
    });

    // Save the new customer
    await newCustomer.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
