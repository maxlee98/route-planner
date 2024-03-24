"use client"; // This is a client component

import React, { useState, useRef, useEffect } from "react";
import Script from "next/script";

interface FormData {
  startLocation: string;
  duration: number;
}

function MapPage() {
  const [formData, setFormData] = useState<FormData>({
    startLocation: "",
    duration: 0,
  });

  // ... other component logic (handleChange, handleSubmit, etc.)

  return (
    <div className="container">
      <h1>Trip Planner</h1>
      {/* Form for start location and duration */}
      <form>
        {/* ... form fields */}
        <button type="submit">Plan Trip</button>
      </form>
      {/* Map container element */}
      <div id="map" style={{ width: "600px", height: "400px" }} />

      {/* Script tag to load Google Maps API */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&callback=initMap&v=beta`}
        strategy="lazyOnload"
      />
    </div>
  );
}

export default MapPage;
