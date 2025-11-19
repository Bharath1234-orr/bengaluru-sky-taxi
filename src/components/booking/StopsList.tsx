import { Location } from "@/pages/BookingPage";
import { MapPin } from "lucide-react";

interface StopsListProps {
  stops: Location[];
}

const StopsList = ({ stops }: StopsListProps) => {
  if (stops.length === 0) return null;

  return (
    <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
      <h3 className="text-lg font-semibold mb-2 flex items-center">
        <MapPin className="h-5 w-5 mr-2 text-primary" />
        Stops
      </h3>
      <ul className="space-y-2">
        {stops.map((stop, index) => (
          <li key={index} className="flex items-center text-sm">
            <span className="font-medium text-muted-foreground mr-2">{`Stop ${index + 1}:`}</span>
            <span className="text-foreground">{`Lat: ${stop.lat.toFixed(4)}, Lng: ${stop.lng.toFixed(4)}`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StopsList;
