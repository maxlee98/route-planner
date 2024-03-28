const fetchNearbyPlaces = async (
  lat: number,
  lng: number,
  selectedTypes: string[]
) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
  const url = `https://places.googleapis.com/v1/places:searchNearby`;
  const payload_data = {
    includedTypes: selectedTypes,
    maxResultCount: 20,
    locationRestriction: {
      circle: {
        center: {
          latitude: lat,
          longitude: lng,
        },
        radius: 1000.0,
      },
    },
    //   rankPreference: "DISTANCE",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "places.displayName,places.primaryType,places.rating",
      },
      body: JSON.stringify(payload_data),
    });

    if (response.ok) {
      const responseData = await response.json();
      // const places = data.results;
      // console.log("Nearby places:", responseData);
      return responseData;
    } else {
      const errorData = await response.text();
      console.error(
        `Failed to fetch nearby places: ${response.status} - ${errorData}`
      );
    }
  } catch (error) {
    console.error("Error fetching nearby places:", error);
  }
};

export { fetchNearbyPlaces };
