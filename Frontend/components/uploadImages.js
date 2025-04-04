// components/UploadImages.js
import { useState } from "react";
import axios from "axios";

export default function UploadImages({ businessId }) {
  const [files, setFiles] = useState([]);

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach(file => formData.append("images", file));

    try {
      await axios.post(`http://localhost:5000/api/businesses/${businessId}/images`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  };

  return (
    <div className="mt-6">
      <input type="file" multiple onChange={(e) => setFiles([...e.target.files])} />
      <button
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleUpload}
      >
        Upload Images
      </button>
    </div>
  );
}
