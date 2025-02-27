import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [location, setLocation] = useState("");
    const [businesses, setBusinesses] = useState([]);

    // Function to fetch businesses based on search
    const fetchBusinesses = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/search`, {
                params: { search: searchTerm, location }
            });
            setBusinesses(response.data);
        } catch (error) {
            console.error("Error fetching businesses:", error);
        }
    };

    useEffect(() => {
        fetchBusinesses();
    }, []); // Fetch businesses on page load

    return (
        <div className="search-page">
            <h2>Find Beauty Services Near You</h2>
            
            {/* Search Inputs */}
            <div className="search-filters">
                <input
                    type="text"
                    placeholder="Search for a service (e.g., Lash Extensions)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <button onClick={fetchBusinesses}>Search</button>
            </div>

            {/* Business Results */}
            <div className="business-list">
                {businesses.length > 0 ? (
                    businesses.map((business) => (
                        <div key={business._id} className="business-card">
                            <h3>{business.name}</h3>
                            <p>Category: {business.category}</p>
                            <p>Location: {business.location.coordinates.join(", ")}</p>
                            <p>Rating: ⭐ {business.rating}</p>
                            <a href={business.instagram} target="_blank" rel="noopener noreferrer">View on Instagram</a>
                        </div>
                    ))
                ) : (
                    <p>No businesses found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
