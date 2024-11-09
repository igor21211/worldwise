export interface City {
  id: number;
  country: string;
  cityName: string;
  emoji: string;
  date: string | null;
  notes: string | null;
  position: {
    lat: number;
    lng: number;
  };
}
