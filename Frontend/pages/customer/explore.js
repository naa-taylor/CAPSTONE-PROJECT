import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@heroui/react";
import Header from "../../components/loggedInHeader";
import Footer from "../../components/footer";
import FilterModal from "../../components/FilterModal";

export default function Explore() {
  const router = useRouter();
  const query = router.query?.query;

  const [searchQuery, setSearchQuery] = useState(query || "");
  const [searchResults, setSearchResults] = useState([]);
  const [filters, setFilters] = useState({
    services: [], // Filter by selected services
    rating: [],   // Filter by rating (if needed)
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [allLocations, setAllLocations] = useState([]); // Fetch locations from DB
  const [userLocation, setUserLocation] = useState(null);


    // Fetch all salons if there is no search query and no filters
    const fetchSalons = async () => {
        const params = new URLSearchParams();
        
        if (searchQuery) params.append("query", searchQuery);
        if (filters.services.length > 0) params.append("services", filters.services.join(","));
        if (filters.rating > 0) params.append("rating", filters.rating);
        
        // Always fetch all results in Explore page
        params.append("all", "true");
        
        const response = await fetch(`/api/search?${params.toString()}`);
        const data = await response.json();
        setSearchResults(data);
    };
      
    useEffect(() => {
        fetchSalons().catch((error) => console.error("Error fetching salons:", error));
    }, [searchQuery, filters]); // Re-run when searchQuery or filters change
      

  const handleFilterIconClick = () => {
    setIsModalOpen(true);
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setIsModalOpen(false);
  };

  const applyFilters = ({ services, rating, distance }) => {
    const filtered = allLocations.filter((location) => {
      const matchesServices = services.length === 0 || services.some(service => location.services.includes(service));
      const matchesRating = rating === null || location.rating <= rating;
      const matchesDistance = getDistance(userLocation, location) <= distance;

      return matchesServices && matchesRating && matchesDistance;
    });

    setFilteredLocations(filtered);
  };



  return (
    <div>
      <Header />

      {/* Search Bar with Filter Icon */}
      <div className="mt-6 mb-6 w-full max-w-md mx-auto flex items-center space-x-2">
        {/* Search Input */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search hair salons"
            className="w-full p-4 pl-10 rounded-full border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Icon */}
        <svg
          onClick={handleFilterIconClick}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-gray-600 cursor-pointer"
        >
          <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
        </svg>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="mt-6 mb-6 w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {searchResults.map((result) => (
              <Card key={result._id} className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold">{result.name}</h3>
                
                {/* Location */}
                <p className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                  </svg>
                  {result.location || "Not available"}
                </p>

                {/* Services */}
                <p className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 108.05" className="size-6">
                    <path d="M1.99,34.01c-1.14,0.69-2.18-0.62-1.96-1.47C5.15,19.59,15.9,4.64,28.08,0.82c4.7-1.47,4.33-1.08,7.49,2.08 l85.32,85.32c7.77,9.06-9.07,25.69-19.41,17.72L69.32,65.76L48.4,78.9c-1.83,1.29-3.8-0.26-2.08-2.08l19.54-19.54l-1.63-1.63 L44.29,75.6c-0.63,0.63-1.67,0.62-2.32-0.02c-0.65-0.65-0.66-1.69-0.02-2.32l19.95-19.95l-2.64-2.64L39.3,70.62 c-0.63,0.63-1.67,0.62-2.32-0.02c-0.65-0.65-0.66-1.69-0.02-2.32l19.95-19.95l-2.26-2.26L34.7,66.01 c-0.63,0.63-1.67,0.62-2.32-0.02c-0.65-0.65-0.66-1.69-0.02-2.32L52.3,43.72l-2.26-2.26L30.09,61.41 c-0.63,0.63-1.67,0.62-2.32-0.02c-0.65-0.65-0.66-1.69-0.02-2.32L47.7,39.12l-2.26-2.26L25.49,56.8c-0.63,0.63-1.67,0.62-2.32-0.02 c-0.65-0.65-0.66-1.69-0.02-2.32l19.95-19.95l-2.26-2.26L20.88,52.19c-0.63,0.63-1.67,0.62-2.32-0.02 c-0.65-0.65-0.66-1.69-0.02-2.32L38.48,29.9l-2.26-2.26L16.27,47.59c-0.63,0.63-1.67,0.62-2.32-0.02 c-0.65-0.65-0.66-1.69-0.02-2.32L33.88,25.3l-2.26-2.26L11.67,42.98c-0.63,0.63-1.67,0.62-2.32-0.02 c-0.65-0.65-0.66-1.69-0.02-2.32l19.95-19.95l-2.64-2.64L6.68,38c-0.63,0.63-1.67,0.62-2.32-0.02c-0.65-0.65-0.66-1.69-0.02-2.32 l19.95-19.95l-2-2L1.99,34.01L1.99,34.01z"/>
                  </svg>
                  {result.services?.join(", ") || "Not available"}
                </p>

                {/* Rating */}
                <p className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                  </svg>
                  {result.rating || "Not available"}
                </p>

                <button
                  onClick={() => router.push(`/customer/explore?query=${searchQuery}&all=true`)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  View More
                </button>
              </Card>
            ))}
          </div>
        </div>
      )}




      {/* Filter Modal */}
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApplyFilters={handleApplyFilters}
      />

      <Footer />
    </div>
  );
}
