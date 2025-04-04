import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ContactPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("businessData"));
    if (saved?.contact?.phone) setPhone(saved.contact.phone);
    if (saved?.website) setWebsite(saved.website);
    if (saved?.instagram) setInstagram(saved.instagram);
    if (saved?.facebook) setFacebook(saved.facebook);
  }, []);

  const handleNext = () => {
    if (!phone) {
      alert("Phone number is required.");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("businessData")) || {};

    const updated = {
      ...existing,
      contact: {
        ...(existing.contact || {}),
        phone,
      },
      website: website || "",
      instagram: instagram || "",
      facebook: facebook || "",
    };

    localStorage.setItem("businessData", JSON.stringify(updated));
    router.push("/business/register/services");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <div className="bg-white shadow-md rounded-xl w-full max-w-md p-6 space-y-4">
        <h1 className="text-xl font-bold text-center">Contact Information</h1>

        <label className="block font-medium">Phone Number *</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input"
          placeholder="e.g. 647-123-4567"
          required
        />

        <label className="block font-medium">Website (optional)</label>
        <input
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="input"
          placeholder="https://example.com"
        />

        <label className="block font-medium">Instagram (optional)</label>
        <input
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          className="input"
          placeholder="https://instagram.com/yourbusiness"
        />

        <label className="block font-medium">Facebook (optional)</label>
        <input
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
          className="input"
          placeholder="https://facebook.com/yourbusiness"
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
