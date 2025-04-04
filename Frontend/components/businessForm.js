// components/BusinessForm.js
import { useState } from "react";
import axios from "axios";
import Select from 'react-select';


export default function BusinessForm() {
  const [formData, setFormData] = useState({
    ownerName: "",
    businessName: "",
    contact: { phone: "", email: "" },
    location: {
      hasPhysicalLocation: true,
      address: "",
      city: "",
      province: "",
      postalCode: "",
      coordinates: {
        type: "Point",
        coordinates: [-78.8966, 43.9447], // default for Oshawa
      },
    },
    isMobile: false,
    mobileOnly: false,
    travelRadius: 0,
    serviceAreas: [],
    services: [],
    website: "",
    instagram: "",
    facebook: "",
    priceRange: "$$",
    availability: { openTime: "09:00", closeTime: "17:00" },
    searchTags: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested contact or location fields
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleArrayChange = (e, key) => {
    const values = e.target.value.split(",").map((val) => val.trim());
    setFormData({ ...formData, [key]: values });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/businesses", formData);
      alert("✅ Business registered!");
    } catch (error) {
      console.error("Error:", error.response?.data?.error || error.message);
      alert("❌ Error: " + error.response?.data?.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl space-y-4">
      <h2 className="text-xl font-bold">Register Your Business</h2>
      <input name="ownerName" placeholder="Owner Name" className="input" onChange={handleChange} required />
      <input name="businessName" placeholder="Business Name" className="input" onChange={handleChange} required />
      <input name="contact.phone" placeholder="Phone" className="input" onChange={handleChange} required />
      <input name="contact.email" placeholder="Email" className="input" onChange={handleChange} required />
      <input name="location.address" placeholder="Address" className="input" onChange={handleChange} />
      <input name="location.city" placeholder="City" className="input" onChange={handleChange} />
      <input name="location.province" placeholder="Province" className="input" onChange={handleChange} />
      <input name="location.postalCode" placeholder="Postal Code" className="input" onChange={handleChange} />
      <input name="website" placeholder="Website" className="input" onChange={handleChange} />
      <input name="instagram" placeholder="Instagram Link" className="input" onChange={handleChange} />
      <input name="facebook" placeholder="Facebook Link" className="input" onChange={handleChange} />
      <input placeholder="Services (comma separated)" className="input" onChange={(e) => handleArrayChange(e, "services")} />
      <label className="block font-medium mb-1">Select Services</label>
        <Select
        isMulti
        name="services"
        options={[
            { value: "Haircut", label: "Haircut" },
            { value: "Blowout", label: "Blowout" },
            { value: "Hair Coloring", label: "Hair Coloring" },
            { value: "Highlights", label: "Highlights" },
            { value: "Balayage", label: "Balayage" },
            { value: "Ombre", label: "Ombre" },
            { value: "Deep Conditioning", label: "Deep Conditioning" },
            { value: "Scalp Treatment", label: "Scalp Treatment" },
            { value: "Silk Press", label: "Silk Press" },
            { value: "Keratin Treatment", label: "Keratin Treatment" },
            { value: "Perms", label: "Perms" },
            { value: "Relaxer Treatment", label: "Relaxer Treatment" },
            { value: "Men's Haircut", label: "Men's Haircut" },
            { value: "Beard Trim", label: "Beard Trim" },
            { value: "Fade", label: "Fade" },
            { value: "Line Up", label: "Line Up" },
            { value: "Men’s Hair Styling", label: "Men’s Hair Styling" },
            { value: "Hair Extensions", label: "Hair Extensions" },
            { value: "Tape-In Extensions", label: "Tape-In Extensions" },
            { value: "Weave Install", label: "Weave Install" },
            { value: "Wig Install", label: "Wig Install" },
            { value: "Wig Customization", label: "Wig Customization" },
            { value: "Braiding", label: "Braiding" },
            { value: "Box Braids", label: "Box Braids" },
            { value: "Knotless Braids", label: "Knotless Braids" },
            { value: "Cornrows", label: "Cornrows" },
            { value: "Faux Locs", label: "Faux Locs" },
            { value: "Locs Retwist", label: "Locs Retwist" },
            { value: "Twist Out", label: "Twist Out" },
            { value: "Curly Hair Styling", label: "Curly Hair Styling" }
        ]}
        className="basic-multi-select mb-4"
        classNamePrefix="select"
        onChange={(selected) =>
            setFormData({
            ...formData,
            services: selected.map((s) => s.value)
            })
        }
        />



      <input placeholder="Search Tags (comma separated)" className="input" onChange={(e) => handleArrayChange(e, "searchTags")} />

      <select name="priceRange" className="input" onChange={handleChange}>
        <option value="$">$</option>
        <option value="$$">$$</option>
        <option value="$$$">$$$</option>
      </select>

      <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
        Submit
      </button>
    </form>
  );
}
