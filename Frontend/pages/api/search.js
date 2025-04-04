import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

const connectToDatabase = async () => {
  const client = await MongoClient.connect(uri);
  return client;
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { query, all, services, rating } = req.query;

    try {
      const client = await connectToDatabase();
      const db = client.db();
      const collection = db.collection("businesses");

      // Construct filter conditions
      let filter = {};

      // If query exists, search in name or services
      if (query) {
        filter.$or = [
          { name: { $regex: query, $options: "i" } },
          { services: { $regex: query, $options: "i" } },
          { rating: { $regex: query, $options: "i" }}
        ];
      }

      // If services filter exists
      if (services) {
        const servicesArray = services.split(",");
        filter.services = { $in: servicesArray };
      }

      if (rating) {
        const ratingValue = parseFloat(rating);
        if (!isNaN(ratingValue)) {
          filter.rating = { $lte: ratingValue }; // Match businesses with rating <= selected rating
        }
      }
      
      console.log("Filter being used:", JSON.stringify(filter, null, all));

      // Fetch results from the database with the applied filter
      const limit = all === "true" ? 0 : 2;
      const results = await collection.find(filter).limit(limit).toArray();

      client.close();

      res.status(200).json(results); // Return filtered results
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}