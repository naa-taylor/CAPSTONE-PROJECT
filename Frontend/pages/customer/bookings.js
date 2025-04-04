import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function BookingPage() {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchBusinesses = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/businesses");
          
          // Log response to check if it's an error page (HTML)
          const text = await response.text(); // Get raw response
          console.log("Response Text:", text);
      
          const data = JSON.parse(text); // Parse it manually for better error handling
          setBusinesses(data);
        } catch (error) {
          console.error("Error fetching businesses:", error);
        }
      };
      

    fetchBusinesses();
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
  
    const bookingData = {
      customerName: name,
      businessId: selectedBusiness,
      date,
    };
  
    try {
      const response = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Email": "user@example.com",  // Replace with actual user email or JWT token
        },
        body: JSON.stringify(bookingData),
      });
  
      if (response.ok) {
        setSubmitted(true);
        setMessage("Booking successful!");
        setName("");
        setDate("");
        setSelectedBusiness("");
      } else {
        setMessage("Failed to book. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Please try again later.");
    }
  };
  

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Book an Appointment</h2>

        {message && (
          <p className={`text-sm mb-4 ${submitted ? "text-green-600" : "text-red-500"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleBooking} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Select Business</label>
                <select
                    value={selectedBusiness}
                    onChange={(e) => setSelectedBusiness(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                    >
                    <option value="">-- Choose a business --</option>
                    {businesses.map((biz) => (
                        <option key={biz._id} value={biz._id}>  {/* Use `biz._id` as the key */}
                        {biz.businessName}
                        </option>
                    ))}
                </select>

          </div>

          <div>
            <label className="block mb-1 font-medium">Select Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
}
