import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../../components/headereader";
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
          <p className="text-gray-700">{business.location.address}, {business.location.city}, {business.location.province}</p>
        )}
        {business.isMobile && (
          <p className="text-blue-700">This stylist offers mobile services within {business.travelRadius} km</p>
        )}

        {/* 📷 Image Gallery */}
        {business.images?.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {business.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`example-${index}`}
                className="w-full h-48 object-cover rounded-md"
              />
            ))}
          </div>
        )}

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