import { LatLngExpression } from "leaflet"
import { useEffect, useRef, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"


interface Cafe{
  id:number
  name:string
  lat:number
  lng:number
}

interface MapViewProps
{
  userLocation: LatLngExpression | null
  cafes:Cafe[];
  selectedCafeId?:number
}

const RecenterMap=({coords}:{coords:LatLngExpression})=>{
  const map = useMap()
  useEffect(()=>{
    map.setView(coords,15)
  },[coords,map])
  return null
}


const MapView = ({userLocation,cafes,selectedCafeId}:MapViewProps) => {

const defaultCenter: LatLngExpression = [18.7350, 73.6756];

const selectedCafe = cafes.find((c) => c.id === selectedCafeId);
const cafeMarkerRef = useRef<any>(null);

// Track current focus coordinates
const [focusCoords, setFocusCoords] = useState<LatLngExpression>(defaultCenter);

// Open popup for selected cafe
useEffect(() => {
  if (selectedCafe && cafeMarkerRef.current) {
    setFocusCoords([selectedCafe.lat, selectedCafe.lng]);
    if (cafeMarkerRef.current) {
      cafeMarkerRef.current.openPopup();
    }
  }
}, [selectedCafeId]);

// Recenter when userLocation changes (click "Find My Location")
useEffect(() => {
  if (userLocation) {
    
    setFocusCoords(userLocation);
  }
}, [userLocation]);

return (
  <MapContainer center={defaultCenter} zoom={14} style={{ height: "100vh", width: "100%" }}>
    <TileLayer
      attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    {/* User location */}
    {userLocation && (
     <>
     <Marker position={userLocation}>
        <Popup>You are here 📍</Popup>
      </Marker>
     </>
    )}

    {/* Selected cafe */}
    {selectedCafe && (
      <>
      <Marker
        position={[selectedCafe.lat, selectedCafe.lng]}
        ref={cafeMarkerRef}
        >
        <Popup>{selectedCafe.name} ☕</Popup>
      </Marker>
        </>
    )}

{cafes.map((cafe) => (
  <Marker key={cafe.id} position={[cafe.lat, cafe.lng]}>
          <Popup>{cafe.name}</Popup>
        </Marker>
      ))}
   
      <RecenterMap coords={focusCoords} />
  </MapContainer>
);
}

export default MapView