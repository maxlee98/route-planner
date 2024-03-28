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

type MapProps = {
  onUpdatePlaces: (places: Place[]) => void;
  selectedTypes: string[]; // Add selectedTypes as a prop
};

function Map({ onUpdatePlaces, selectedTypes }: MapProps) {
  const mapRef = React.useRef<HTMLDivElement>(null);

  const defaultLatLng: LatLng = {
    lat: 1.29027,
    lng: 103.851959,
  };

  const [latlng, setLatlng] = useState<LatLng>(defaultLatLng);
  const [markerPosition, setMarkerPosition] = useState<LatLng>(defaultLatLng);
  const [zoomLevel, setZoomLevel] = useState<number>(17);

  useEffect(() => {
    const initMap = async () => {
      // console.log("map init");
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
        zoom: zoomLevel,
        mapId: "MY_NEXTJS_MAPID",
      };

      // setup the map
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      // put up a marker
      const marker = new AdvancedMarkerElement({
        map: map,
        position: markerPosition,
      });

      map.addListener("zoom_changed", () => {
        if (mapRef.current) {
          // console.log(`Set Zoom Level: ${zoomLevel}`);
          // console.log(`Map Zoom Level: ${map.getZoom()}`);
          setZoomLevel(map.getZoom() || 0);
        }
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
        // console.log("clicked");
        if (e.latLng) {
          const { lat, lng } = e.latLng;
          setLatlng({ lat: lat(), lng: lng() });
          setMarkerPosition({ lat: lat(), lng: lng() });

          try {
            const placesResponse = await fetchNearbyPlaces(
              lat(),
              lng(),
              selectedTypes
            );
            const places = placesResponse.places; // Assuming places is an object with a 'places' array
            // console.log(`PLACES = ${places}`);
            onUpdatePlaces(places);
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
      <div>
        Click on anywhere on the map to show the 20 closest filtered places!
      </div>
      <div style={{ height: "600px" }} ref={mapRef} />
    </div>
  );
}

export default Map;
