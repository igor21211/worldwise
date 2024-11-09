import React, { useState, useEffect } from "react";

import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import { useCityContext } from "../context/CityContext";
import useGeoLocation from "../hooks/useGeoLocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

const Map = () => {
  const { cities } = useCityContext();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeoLocation();
  const { lat, lng } = useUrlPosition();

  const [mapPosition, setMapPosition] = useState<[number, number]>([lat, lng]);

  useEffect(() => {
    if (lat && lng) {
      setMapPosition([lat, lng]);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }
  }, [geolocationPosition]);
  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your location"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeMapPosition position={mapPosition} />
        <DetectMapClick />
      </MapContainer>
    </div>
  );
};
function ChangeMapPosition({ position }: { position: [number, number] }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectMapClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e: LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });
  return null;
}

export default Map;
