import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email } = req.body;
  const db = await connectToDatabase();

  const user = await db.collection("users").findOne({ email });

  return res.json({ exists: !!user });
}
