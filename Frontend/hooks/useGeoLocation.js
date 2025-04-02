import { useState, useEffect } from "react";

// Default to Durham College
const DEFAULT_COORDS = {
  lat: 43.9445,
  lng: -78.8964,
};

export default function useGeoLocation() {
  const [coords, setCoords] = useState(DEFAULT_COORDS);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.warn("Location denied or failed, using fallback.");
        setCoords(DEFAULT_COORDS); // fallback to Durham
      }
    );
  }, []);

  return coords;
}
