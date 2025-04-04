import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function MobilityPage() {
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [mobileOnly, setMobileOnly] = useState(false);
  const [travelRadius, setTravelRadius] = useState(0);
  const [serviceAreas, setServiceAreas] = useState("");

  // Load saved data if exists
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("businessData"));
    if (saved?.isMobile !== undefined) setIsMobile(saved.isMobile);
    if (saved?.mobileOnly !== undefined) setMobileOnly(saved.mobileOnly);
    if (saved?.travelRadius) setTravelRadius(saved.travelRadius);
    if (saved?.serviceAreas) setServiceAreas(saved.serviceAreas.join(", "));
  }, []);

  const handleNext = () => {
    const existing = JSON.parse(localStorage.getItem("businessData")) || {};
    const updated = {
      ...existing,
      isMobile,
      mobileOnly,
      travelRadius: isMobile ? parseInt(travelRadius) : 0,
      serviceAreas: isMobile ? serviceAreas.split(",").map((s) => s.trim()) : [],
    };
    localStorage.setItem("businessData", JSON.stringify(updated));
    router.push("/business/register/contact");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <div className="bg-white shadow-md rounded-xl w-full max-w-md p-6 space-y-4">
        <h1 className="text-xl font-bold text-center">Mobility Options</h1>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isMobile}
            onChange={(e) => setIsMobile(e.target.checked)}
          />
          <span>This business offers mobile services</span>
        </label>

        {isMobile && (
          <>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={mobileOnly}
                onChange={(e) => setMobileOnly(e.target.checked)}
              />
              <span>This business is mobile only (no physical location)</span>
            </label>

            <label className="block font-medium mt-4">Travel Radius (km)</label>
            <input
              type="number"
              min="0"
              className="input"
              value={travelRadius}
              onChange={(e) => setTravelRadius(e.target.value)}
            />

            <label className="block font-medium mt-2">
              Service Areas (comma-separated)
            </label>
            <input
              className="input"
              placeholder="e.g. Oshawa, Ajax, Pickering"
              value={serviceAreas}
              onChange={(e) => setServiceAreas(e.target.value)}
            />
          </>
        )}

        <button
          onClick={handleNext}
          className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
