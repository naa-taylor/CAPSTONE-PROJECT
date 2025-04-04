import Header from "../../components/loggedInHeader";
import Footer from "../../components/footer";
import { useState } from "react";
import { Card } from "@heroui/react";
import { useRouter } from "next/navigation";
import ImageGrid from "../../components/imagegrid";


export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasMoreResults, setHasMoreResults] = useState(false);

  // Function to trigger search when Enter is pressed
  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
      const res = await fetch(`/api/search?query=${searchQuery}`);
      const data = await res.json();

      setSearchResults(data);
      setHasMoreResults(data.length >= 2); // Show "View More" if there are more results
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  // Function to handle the Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();  // Trigger search on Enter key press
    }
  };
  
  return (
    <div className="w-full">
      {/* Header */}
      <Header />

      {/* Hero Section with Image Grid */}
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center text-center bg-black pb-40">
        <h1 className="text-white text-5xl md:text-6xl font-bold mt-10">Welcome to GlowGuide</h1>
        <p className="mt-2 text-lg md:text-xl text-gray-300">
          Discover and book top hair salon professionals near you.
        </p>
        
        {/* Search Bar */}
        <div className="mt-6 w-full max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search hair salons"
            className="w-full p-4 pl-10 rounded-full border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <span className="absolute left-3 top-4 text-gray-400">🔍</span>
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="mt-6 w-full max-w-md mx-auto">
          {searchResults.map((result) => (
            <Card key={result._id} className="mb-4 p-4 bg-white">
              <h3 className="text-lg font-semibold">{result.name}</h3>
              <p><strong>Location:</strong> {result.location || "Not available"}</p>
              <p><strong>Services:</strong> {result.services?.join(", ") || "Not available"}</p>
            </Card>
          ))}

          {/* View More Button (Only if there are more results) */}
          {hasMoreResults && (
            <button
              onClick={() => router.push(`/customer/explore?query=${searchQuery}&all=true`)} // 'all=true' for Explore page
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              View More
            </button>
          )}
        </div>
      )}



        {/* FUTURISTIC IMAGE GRID SECTION */}
        <div className="relative w-full mt-16 z-0">
          <ImageGrid />
        </div>
      </div>


      {/* Footer */}
      <Footer />
    </div>
  );
}