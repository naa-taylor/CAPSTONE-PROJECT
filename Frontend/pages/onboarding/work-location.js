import { useRouter } from "next/navigation";

export default function WorkLocation() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">Where do you work?</h2>
        <p className="text-gray-500 text-center">Do your clients come to you, do you go to them, or both?</p>

        <div className="mt-4">
          <label className="block bg-gray-200 p-3 rounded-lg cursor-pointer">
            <input type="checkbox" className="mr-2" /> At my place
          </label>
          <label className="block bg-gray-200 p-3 rounded-lg cursor-pointer mt-2">
            <input type="checkbox" className="mr-2" /> At the client's location
          </label>
        </div>

        <button
          onClick={() => router.push("/onboarding/address")}
          className="w-full bg-black text-white py-2 rounded-lg mt-4"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
