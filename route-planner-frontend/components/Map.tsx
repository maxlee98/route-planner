"use client"; // This is a client component

import React, { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

function Map(latlng: LatLng) {
  const mapRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    const initMap = async () => {
      console.log("map init");
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      // init a marker
      const { Marker } = (await loader.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      const position = {
        lat: 1.29027,
        lng: 103.851959,
      };

      // map options
      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 17,
        mapId: "MY_NEXTJS_MAPID",
      };

      // setup the map
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      // put up a marker
      const marker = new Marker({
        map: map,
        position: position,
      });
    };
    initMap();
  }, []);

  return (
    <div>
      <h1> Google Maps</h1>
      <div style={{ height: "600px" }} ref={mapRef} />
    </div>
  );
}

export default Map;
