"use client"; // This is a client component

import React, { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

type LatLng = {
  lat: number;
  lng: number;
};

function Map() {
  const mapRef = React.useRef<HTMLDivElement>(null);
  //   const markerRef = React.useRef<google.maps.MarkerLibrary | null>(null); // Track marker

  const defaultLatLng: LatLng = {
    lat: 1.29027,
    lng: 103.851959,
  };

  const [latlng, setLatlng] = useState<LatLng>(defaultLatLng);
  const [markerPosition, setMarkerPosition] = useState<LatLng>(defaultLatLng);

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
        center: defaultLatLng,
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
      map.addListener("center_changed", () => {
        // 3 seconds after the center of the map has changed, pan back to the
        // marker.
        console.log("panning");
        window.setTimeout(() => {
          map.panTo(marker.position as google.maps.LatLng);
        }, 3000);
      });

      // Add click event listener to move marker to clicked position
      map.addListener("click", (e: google.maps.MapMouseEvent) => {
        // 3 seconds after the center of the map has changed, pan back to the
        // marker.
        console.log("clicked");
        if (e.latLng) {
          const { lat, lng } = e.latLng;
          console.log(lat());
          // 2.4
          setMarkerPosition({ lat: lat(), lng: lng() });
        }
      });
    };
    initMap();
  }, [markerPosition]);

  return (
    <div>
      <h1> Google Maps</h1>
      <div style={{ height: "600px" }} ref={mapRef} />
    </div>
  );
}

export default Map;
