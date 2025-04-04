import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Select from "react-select";

const serviceOptions = [
  "Haircut", "Blowout", "Hair Coloring", "Highlights", "Balayage", "Ombre",
  "Deep Conditioning", "Scalp Treatment", "Silk Press", "Keratin Treatment",
  "Perms", "Relaxer Treatment",
  "Men's Haircut", "Beard Trim", "Fade", "Line Up", "Men’s Hair Styling",
  "Hair Extensions", "Tape-In Extensions", "Weave Install", "Wig Install",
  "Wig Customization",
  "Braiding", "Box Braids", "Knotless Braids", "Cornrows", "Faux Locs",
  "Locs Retwist", "Twist Out", "Curly Hair Styling"
].map(service => ({ label: service, value: service }));

export default function ServicesPage() {
  const router = useRouter();

  const [priceRange, setPriceRange] = useState("$$");
  const [selectedServices, setSelectedServices] = useState([]);
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [searchTags, setSearchTags] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("businessData"));
    if (saved?.priceRange) setPriceRange(saved.priceRange);
    if (saved?.services) {
      setSelectedServices(saved.services.map(s => ({ label: s, value: s })));
    }
    if (saved?.availability) {
      setOpenTime(saved.availability.openTime || "");
      setCloseTime(saved.availability.closeTime || "");
    }
    if (saved?.searchTags) {
      setSearchTags(saved.searchTags.join(", "));
    }
  }, []);

  const handleNext = () => {
    const existing = JSON.parse(localStorage.getItem("businessData")) || {};
    const updated = {
      ...existing,
      priceRange,
      services: selectedServices.map(s => s.value),
      availability: {
        openTime,
        closeTime
      },
      searchTags: searchTags.split(",").map(tag => tag.trim()).filter(Boolean)
    };
    localStorage.setItem("businessData", JSON.stringify(updated));
    router.push("/business/register/review");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <div className="bg-white shadow-md rounded-xl w-full max-w-md p-6 space-y-4">
        <h1 className="text-xl font-bold text-center">Services & Availability</h1>

        <label className="block font-medium">Price Range</label>
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="input"
        >
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
        </select>

        <label className="block font-medium">Select Services</label>
        <Select
          isMulti
          options={serviceOptions}
          value={selectedServices}
          onChange={(options) => setSelectedServices(options)}
          className="basic-multi-select"
          classNamePrefix="select"
        />

        <label className="block font-medium mt-4">Open Time</label>
        <input
          type="time"
          className="input"
          value={openTime}
          onChange={(e) => setOpenTime(e.target.value)}
        />

        <label className="block font-medium">Close Time</label>
        <input
          type="time"
          className="input"
          value={closeTime}
          onChange={(e) => setCloseTime(e.target.value)}
        />

        <label className="block font-medium">Search Tags (comma-separated)</label>
        <input
          className="input"
          value={searchTags}
          onChange={(e) => setSearchTags(e.target.value)}
          placeholder="e.g. Black hair, Braids, Oshawa"
        />

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
