import { useState } from "react";

interface Position {
  lat: number;
  lng: number;
}

const useGeoLocation = (defaultPosition = null) => {
  const [position, setPosition] = useState<Position | null>(defaultPosition);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { position, isLoading, error, getPosition };
};

export default useGeoLocation;
