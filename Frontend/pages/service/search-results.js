import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Header from "../../components/Header";
import Footer from "../../components/footer";
import SearchResultCard from "../../components/SearchResultCard";

export default function SearchResults() {
  const router = useRouter();
  const { query, lat, lng } = router.query;

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      fetchResults();
    }
  }, [query]);

  const fetchResults = async () => {
    try {
      const params = new URLSearchParams({ query });
      if (lat && lng) {
        params.append("lat", lat);
        params.append("lng", lng);
      }

      const response = await axios.get(
        `http://localhost:5000/api/businesses/search?${params.toString()}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-white text-gray-800">
      <Header />

      <main className="container mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-6">
          Search Results for{" "}
          <span className="italic text-blue-600">"{query}"</span>
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : results.length === 0 ? (
          <p className="text-gray-600">No businesses found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results
              .filter((b) => b && typeof b === "object")
              .map((business, index) => (
                <SearchResultCard
                  key={business._id || index}
                  business={business}
                  userCoords={
                    lat && lng
                      ? { latitude: parseFloat(lat), longitude: parseFloat(lng) }
                      : null
                  }
                />
              ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
