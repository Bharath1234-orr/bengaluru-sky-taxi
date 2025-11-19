import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, MapPinned } from "lucide-react";
import { Location } from "@/pages/BookingPage";
import { toast } from "sonner";

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MapViewProps {
  onComplete: (start: Location, destination: Location, stops: Location[]) => void;
}

const MapView = ({ onComplete }: MapViewProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [startPoint, setStartPoint] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [stops, setStops] = useState<Location[]>([]);
  const startMarkerRef = useRef<L.Marker | null>(null);
  const destMarkerRef = useRef<L.Marker | null>(null);
  const stopMarkersRef = useRef<L.Marker[]>([]);
  const routeLineRef = useRef<L.Polyline | null>(null);

  const drawRoute = () => {
    if (routeLineRef.current) {
      routeLineRef.current.remove();
    }

    if (!startPoint) return;

    const waypoints: L.LatLngExpression[] = [L.latLng(startPoint.lat, startPoint.lng)];
    stops.forEach(stop => waypoints.push(L.latLng(stop.lat, stop.lng)));
    if (destination) {
      waypoints.push(L.latLng(destination.lat, destination.lng));
    }

    if (waypoints.length < 2) return;

    routeLineRef.current = L.polyline(waypoints, {
      color: "#0ea5e9",
      weight: 3,
      opacity: 0.7,
      dashArray: "10, 10",
    }).addTo(mapRef.current!);

    const bounds = L.latLngBounds(waypoints);
    mapRef.current!.fitBounds(bounds, { padding: [50, 50] });
  };
  
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map centered on Bengaluru
    const map = L.map(mapContainerRef.current).setView([12.9716, 77.5946], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    // Define Bengaluru bounds
    const bengaluruBounds = L.latLngBounds(
      L.latLng(12.7342, 77.3787), // Southwest
      L.latLng(13.1736, 77.8826)  // Northeast
    );

    map.on("click", (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;

      // Check if click is within Bengaluru bounds
      if (!bengaluruBounds.contains(e.latlng)) {
        toast.error("Please select a location within Bengaluru");
        return;
      }

      if (!startPoint) {
        // Set start point
        const location: Location = { lat, lng };
        setStartPoint(location);

        if (startMarkerRef.current) {
          startMarkerRef.current.remove();
        }

        const greenIcon = L.icon({
          iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        });

        startMarkerRef.current = L.marker([lat, lng], { icon: greenIcon })
          .addTo(map)
          .bindPopup("Pickup Location")
          .openPopup();

        toast.success("Pickup location set! Now select your destination");
      } else if (!destination) {
        // Set destination
        const location: Location = { lat, lng };
        setDestination(location);

        if (destMarkerRef.current) {
          destMarkerRef.current.remove();
        }

        const redIcon = L.icon({
          iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        });

        destMarkerRef.current = L.marker([lat, lng], { icon: redIcon })
          .addTo(map)
          .bindPopup("Drop-off Location")
          .openPopup();

        drawRoute();
        toast.success("Route planned! Tap on the map to add stops or click continue");
      } else {
        // Add a stop
        const newStop: Location = { lat, lng };
        const updatedStops = [...stops, newStop];
        setStops(updatedStops);
    
        const orangeIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
    
        const stopMarker = L.marker([lat, lng], { icon: orangeIcon })
            .addTo(map)
            .bindPopup(`Stop ${updatedStops.length}`)
            .openPopup();
    
        stopMarkersRef.current.push(stopMarker);
        drawRoute();
        toast.success(`Stop ${updatedStops.length} added!`);
      }
    });

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, []);

  const handleReset = () => {
    setStartPoint(null);
    setDestination(null);
    setStops([]);

    if (startMarkerRef.current) startMarkerRef.current.remove();
    if (destMarkerRef.current) destMarkerRef.current.remove();
    if (routeLineRef.current) routeLineRef.current.remove();
    stopMarkersRef.current.forEach(marker => marker.remove());
    stopMarkersRef.current = [];

    toast.info("Map reset. Select a new pickup location");
  };

  const handleContinue = () => {
    if (startPoint && destination) {
      onComplete(startPoint, destination, stops);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-xl p-6 shadow-lg border border-border/50">
        <h2 className="text-2xl font-bold mb-2 text-foreground">Select Your Journey</h2>
        <p className="text-muted-foreground mb-4">
          Tap on the map to set your pickup location, then for your destination. Tap again to add stops.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
            <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pickup</p>
              <p className="font-medium text-sm">
                {startPoint ? "Location Set" : "Tap on map"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
            <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center">
              <Navigation className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Destination</p>
              <p className="font-medium text-sm">
                {destination ? "Location Set" : "Tap on map"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20 mb-4">
            <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                <MapPinned className="h-5 w-5 text-orange-600" />
            </div>
            <div>
                <p className="text-xs text-muted-foreground">Stops</p>
                <p className="font-medium text-sm">
                    {stops.length > 0 ? `${stops.length} stop${stops.length > 1 ? 's' : ''} added` : "None"}
                </p>
            </div>
        </div>

        <div
          ref={mapContainerRef}
          className="h-[500px] rounded-lg overflow-hidden border-2 border-border/50 shadow-inner"
        />

        <div className="flex gap-3 mt-4">
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex-1"
            disabled={!startPoint && !destination}
          >
            Reset
          </Button>
          <Button
            onClick={handleContinue}
            className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            disabled={!startPoint || !destination}
          >
            Continue to Tier Selection
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MapView;