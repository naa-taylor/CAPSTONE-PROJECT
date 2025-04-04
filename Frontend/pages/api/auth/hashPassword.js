import bcrypt from "bcryptjs";
import clientPromise from "../mongodb"; // Adjust path based on your setup

async function hashPasswords() {
  const client = await clientPromise;
  const db = client.db("GlowGuide"); // Use your actual DB name
  const usersCollection = db.collection("users");

  const users = await usersCollection.find({}).toArray();

  for (const user of users) {
    if (!user.password.startsWith("$2a$")) { // Skip already hashed passwords
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await usersCollection.updateOne(
        { _id: user._id },
        { $set: { password: hashedPassword } }
      );
    }
  }

  console.log("Passwords hashed successfully!");
  process.exit();
}

hashPasswords().catch(console.error);
