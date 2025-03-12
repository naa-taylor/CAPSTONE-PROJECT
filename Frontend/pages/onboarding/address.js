import { useRouter } from "next/navigation";

export default function Address() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">Enter Your Address</h2>
        <p className="text-gray-500 text-center">Where can clients find you?</p>

        <input
          type="text"
          placeholder="Street Address"
          className="w-full p-3 border rounded-lg mt-4"
        />
        <input
          type="text"
          placeholder="City"
          className="w-full p-3 border rounded-lg mt-4"
        />
        <input
          type="text"
          placeholder="Zip Code"
          className="w-full p-3 border rounded-lg mt-4"
        />

        <button
          onClick={() => router.push("/onboarding/confirm-address")}
          className="w-full bg-black text-white py-2 rounded-lg mt-4"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
