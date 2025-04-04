import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../../components/loggedInHeader";
import Footer from "../../components/footer";

export default function Profile() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      // Assuming you're getting the logged-in user's email from localStorage
      const email = localStorage.getItem("userEmail");

      if (!email) {
        router.push("/customer/login"); // Redirect to sign-in if no email found
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/profile?email=${email}`);
        const data = await response.json();

        if (response.status === 200) {
          setUserProfile(data); // Set the fetched user profile
        } else {
          // If user not found, redirect to the login page or show error
          router.push("/customer/login");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 mb-12">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">My Profile</h1>

        {userProfile ? (
          <div className="space-y-6">
            {/* Profile Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold">Name:</label>
                <p className="text-gray-600">{`${userProfile.firstName} ${userProfile.lastName}`}</p>
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold">Email:</label>
                <p className="text-gray-600">{userProfile.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold">Address:</label>
                <p className="text-gray-600">{userProfile.address}</p>
              </div>  

              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold">Phone:</label>
                <p className="text-gray-600">{userProfile.phone}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500">No profile data found.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}