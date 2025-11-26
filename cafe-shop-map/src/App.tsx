import { useState } from "react";
import cafesData from "./data/cafe.json";
import "./App.css";
import { LatLngExpression } from "leaflet";
import { CafeList } from "./components/CafeList";
import MapView from "./components/MapView";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet default icon paths
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface Cafe {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

const App = () => {
  const [userLocation, setUserLocation] = useState<LatLngExpression | null>(
    null
  );

  const [cafes] = useState<Cafe[]>(cafesData);
  const [selectedCafeId, setSelectedCafeId] = useState<number | undefined>(
    undefined
  );

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to get your location. Check browser permissions.");
      }
    );
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: "1 1 25%" ,position: "relative" }}>
        <CafeList cafes={cafes} onSelect={(id) => setSelectedCafeId(id)} />
        <button
          onClick={handleGetLocation}
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            fontSize: "24px",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          }}
        >
          📍
        </button>
      </div>
      <div style={{ flex: "1 1 75%", }}>
        <MapView
          userLocation={userLocation}
          cafes={cafes}
          selectedCafeId={selectedCafeId}
        />
       
      </div>
    </div>
  );
};

export default App;
