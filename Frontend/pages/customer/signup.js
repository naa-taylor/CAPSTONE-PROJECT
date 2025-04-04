import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function CustomerSignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const addressInputRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.google) {
      initializeAutocomplete();
    } else {
      loadGooglePlacesAPI();
    }
  }, []);

  const loadGooglePlacesAPI = () => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCOp0goXnBVjtFOt9cxf_ysRuceVr_Tyd4&libraries=places`;
      script.async = true;
      script.onload = initializeAutocomplete;
      document.head.appendChild(script);
    }
  };

  const initializeAutocomplete = () => {
    if (addressInputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
        types: ["geocode"],
        componentRestrictions: { country: "ca" },
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.formatted_address) {
          setAddress(place.formatted_address);
        }
      });
    }
  };

  const handleSignUp = async () => {
    if (!email || !username || !password || !confirmPassword || !address || !phone || !firstName || !lastName) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, username, email, address, phone, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      alert(`Thank you for creating an account, ${firstName} ${lastName}! You will now be redirected to the login page.`);

      setTimeout(() => {
        router.push("/customer/login");
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[600px]">
        <h2 className="text-3xl font-bold text-center mb-4">Customer Sign Up</h2>
        <p className="text-gray-600 text-center mb-6">Create your customer account to get started.</p>

        {/* First & Last Name */}
        <div className="grid grid-cols-2 gap-x-6">
          <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full p-4 border rounded-lg mt-4" />
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full p-4 border rounded-lg mt-4" />
        </div>

        {/* Email & Username */}
        <div className="grid grid-cols-2 gap-x-6">
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 border rounded-lg mt-4" />
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-4 border rounded-lg mt-4" />
        </div>

        {/* Address & Phone Number */}
        <div className="grid grid-cols-2 gap-x-6">
          <input ref={addressInputRef} type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-4 border rounded-lg mt-4" />
          <div className="mt-4">
            <PhoneInput country={"ca"} value={phone} onChange={setPhone} inputStyle={{ width: "100%", height: "55px", borderRadius: "8px", border: "1px solid #ccc", paddingLeft: "50px" }} />
          </div>
        </div>

        {/* Password & Confirm Password */}
        <div className="grid grid-cols-2 gap-x-6">
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 border rounded-lg mt-4" />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-4 border rounded-lg mt-4" />
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <button onClick={handleSignUp} className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 text-lg">
          Sign Up
        </button>

        <div className="mt-4 text-center">
          <p>
            Already have an account? <button onClick={() => router.push("/customer/login")} className="text-blue-600 hover:underline">Sign In</button>
          </p>
        </div>
      </div>
    </div>
  );
}
