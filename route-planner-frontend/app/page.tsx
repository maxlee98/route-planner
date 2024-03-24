"use client"; // This is a client component

import Map from "@/components/Map";
import React, { useState } from "react";

interface FormData {
  startLocation: string;
  duration: number;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    startLocation: "",
    duration: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "duration" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    // You can access formData.startLocation and formData.duration
    console.log("Submitted data:", formData);
    setFormData({ startLocation: "", duration: 0 });
  };

  return (
    <div className="container">
      <h1>Trip Planner</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="startLocation">Start Location:</label>
        <input
          type="text"
          id="startLocation"
          name="startLocation"
          value={formData.startLocation}
          onChange={handleChange}
          required
        />
        <label htmlFor="duration">Duration (Minutes):</label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          min={0}
          required
        />
        <Map />
        <button type="submit">Plan Trip</button>
      </form>
    </div>
  );
}
