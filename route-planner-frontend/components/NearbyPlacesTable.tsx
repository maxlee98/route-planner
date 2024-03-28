import React from "react";

type DisplayName = {
  text: string;
  languageCode: string;
};

type Place = {
  displayName: DisplayName;
  rating: number;
  primaryType: string;
};

interface NearbyPlacesProps {
  places: Place[];
}

const NearbyPlacesTable: React.FC<NearbyPlacesProps> = ({ places }) => {
  if (places) {
    return (
      <div>
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
            {places.map((place, index) => (
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
  } else {
    return (
      <div>
        <h2>Nearby Places</h2>
        <h2>
          {" "}
          <strong>No Nearby Places Found!</strong>{" "}
        </h2>
      </div>
    );
  }
};

export default NearbyPlacesTable;
