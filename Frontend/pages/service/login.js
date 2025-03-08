// "use client";
// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function LoginModal({ onClose }) {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");

//   const handleEmailSubmit = async () => {
//     setError("");
//     try {
//       const response = await fetch("/api/check-email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (data.exists) {
//         // Redirect to login flow
//         router.push("/dashboard");
//       } else {
//         // Redirect to sign-up page
//         router.push(`/signup?email=${email}`);
//       }
//     } catch (err) {
//       setError("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold text-center">Get Started</h2>
//         <p className="text-center text-gray-600">Enter your email to continue.</p>

//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-3 border rounded-lg mt-4"
//         />

//         {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

//         <button
//           onClick={handleEmailSubmit}
//           className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4"
//         >
//           Continue
//         </button>

//         <div className="mt-4 text-center">OR</div>

//         {/* Google Sign-In Button */}
//         <button
//           onClick={() => signIn("google")}
//           className="w-full flex items-center justify-center bg-white border py-2 rounded-lg mt-4"
//         >
//           <img src="/icons/google.svg" alt="Google Logo" className="w-5 h-5 mr-2" />
//           <span>Continue with Google</span>
//         </button>
//       </div>
//     </div>
//   );
// }



//  testing



import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    // Simulated database of registered users (Replace with actual API call later)
    const registeredEmails = ["test@gmail.com", "example@gmail.com"];

    if (!email) {
      setError("Please enter an email.");
      return;
    }

    if (registeredEmails.includes(email)) {
      // Redirect user to the password page
      router.push(`/password?email=${encodeURIComponent(email)}`);
    } else {
      // Redirect user to sign-up page
      router.push(`/signup?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">Get Started</h2>
        <p className="text-gray-600 text-center">Enter your email to continue.</p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg mt-4"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
