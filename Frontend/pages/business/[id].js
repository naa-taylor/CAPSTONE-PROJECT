import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../../components/Header";
import Footer from "../../components/footer";

export default function BusinessProfile() {
  const router = useRouter();
  const { id } = router.query;

  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchBusiness();
  }, [id]);

  const fetchBusiness = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/businesses/${id}`);
      setBusiness(response.data);
    } catch (error) {
      console.error("Error fetching business:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!business) return <div className="p-8">Business not found.</div>;

  return (
    <div className="w-full">
    <Header />
  
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{business.businessName}</h1>
      <p className="text-gray-600 mb-2">Owned by {business.ownerName}</p>
  
      {/* 📍 Address + Mobile Info */}
      {business.location?.hasPhysicalLocation && (
        <>
          <p className="text-gray-700">
            {business.location.address}, {business.location.city}, {business.location.province}
          </p>
  
          {/* 🗺 Google Map */}
          <div className="my-4 w-full h-64 rounded-md shadow-md border">
            <iframe
              className="w-full h-full rounded"
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAcXuvNvJRdSXS_-oTa8MXrLWZayeqOP2c&q=${encodeURIComponent(
                business.location.address + ", " + business.location.city
              )}`}
            ></iframe>
          </div>
        </>
      )}
      {business.isMobile && (
        <p className="text-blue-700">This stylist offers mobile services within {business.travelRadius} km</p>
      )}
        
            {/* 📸 Common Mini Gallery - Same For All Businesses */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-2">Featured Styles:</h3>
        <div className="flex overflow-x-auto space-x-4 snap-x snap-mandatory pb-2">
          {["hair 1.jpg", "hair 4.avif", "hair 5.jpeg", "hair 6.avif"].map((img, index) => (
            <img
              key={index}
              src={`/images/${img}`}
              alt={`featured-style-${index}`}
              className="h-32 w-48 flex-shrink-0 object-cover rounded-md snap-start"
            />
          ))}
        </div>
      </div>


      
      {/* 🔧 Services */}
      <div className="mt-4">
        <h3 className="font-semibold text-lg">Services:</h3>
        <p className="text-gray-700">{business.services.join(", ")}</p>
      </div>
  
      {/* 🔗 Social Media */}
      <div className="mt-4">
        <h3 className="font-semibold text-lg">Social Media:</h3>
        <p className="text-blue-500">Instagram: {business.instagram}</p>
        {business.facebook && <p className="text-blue-600">Facebook: {business.facebook}</p>}
      </div>
  
      {/* 🗓 Booking CTA */}
      <div className="mt-6">
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          onClick={() => router.push("/service/login")}
        >
          Login to Book Appointment
        </button>
      </div>
    </div>
  
    <Footer />
  </div>
  
  );
}