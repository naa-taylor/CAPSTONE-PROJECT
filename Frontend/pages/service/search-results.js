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

  // 🔍 Fetch businesses from backend based on search term and location
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

      const response = await axios.get(`http://localhost:5000/api/businesses/search?${params.toString()}`);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Header />

      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-6">
          Search Results for "{query}"
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : results.length === 0 ? (
          <p>No businesses found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((business, index) => (
              <SearchResultCard key={index} business={business} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}