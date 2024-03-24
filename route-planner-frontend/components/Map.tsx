"use client"; // This is a client component

import React, { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { fetchNearbyPlaces } from "@/app/api/api";

type LatLng = {
  lat: number;
  lng: number;
};

type DisplayName = {
  text: string;
  languageCode: string;
};

type Place = {
  displayName: DisplayName;
  rating: number;
  primaryType: string;
  // Add other fields as needed
};

function Map() {
  const mapRef = React.useRef<HTMLDivElement>(null);

  const defaultLatLng: LatLng = {
    lat: 1.29027,
    lng: 103.851959,
  };

  const [latlng, setLatlng] = useState<LatLng>(defaultLatLng);
  const [markerPosition, setMarkerPosition] = useState<LatLng>(defaultLatLng);
  const [nearbyPlaces, setNearbyPlaces] = useState<Place[]>([]);

  useEffect(() => {
    const initMap = async () => {
      console.log("map init");
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      // init a marker
      const { AdvancedMarkerElement } = (await loader.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      // map options
      const mapOptions: google.maps.MapOptions = {
        center: latlng,
        zoom: 17,
        mapId: "MY_NEXTJS_MAPID",
      };

      // setup the map
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      // put up a marker
      const marker = new AdvancedMarkerElement({
        map: map,
        position: markerPosition,
      });

      // Add center_change event listener to move to marker location
      //   map.addListener("center_changed", () => {
      //     // 3 seconds after the center of the map has changed, pan back to the
      //     // marker.
      //     console.log("panning");
      //     window.setTimeout(() => {
      //       map.panTo(marker.position as google.maps.LatLng);
      //     }, 3000);
      //   });

      // Add click event listener to move marker to clicked position
      map.addListener("click", async (e: google.maps.MapMouseEvent) => {
        console.log("clicked");
        if (e.latLng) {
          const { lat, lng } = e.latLng;
          setLatlng({ lat: lat(), lng: lng() });
          setMarkerPosition({ lat: lat(), lng: lng() });

          try {
            const placesResponse = await fetchNearbyPlaces(lat(), lng());
            const places = placesResponse.places; // Assuming places is an object with a 'places' array
            console.log(`PLACES = ${places}`);
            setNearbyPlaces(places); // Set the 'places' array to the state
          } catch (error) {
            console.error("Error fetching nearby places:", error);
          }
        }
      });
    };
    initMap();
  }, [markerPosition]);

  return (
    <div>
      <h1> Google Maps</h1>
      <div style={{ height: "600px" }} ref={mapRef} />
      <h2>Nearby Places</h2>
      <table>
        <thead>
          <tr>
            <th>Display Name</th>
            <th>Rating</th>
            <th>Type</th>
            {/* Add other columns as needed */}
          </tr>
        </thead>
        <tbody>
          {nearbyPlaces.map((place, index) => (
            <tr key={index}>
              <td>{place.displayName.text}</td>
              <td>{place.rating}</td>
              <td>{place.primaryType}</td>
              {/* Add other table cells for additional fields */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Map;
