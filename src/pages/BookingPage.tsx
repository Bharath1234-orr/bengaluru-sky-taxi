import { useState } from "react";
import MapView from "@/components/booking/MapView";
import TierSelection from "@/components/booking/TierSelection";
import BookingConfirmation from "@/components/booking/BookingConfirmation";
import BookingStatus from "@/components/booking/BookingStatus";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plane } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StopsList from "@/components/booking/StopsList";

export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export interface TaxiTier {
  id: string;
  name: string;
  multiplier: number;
  capacity: number;
  description: string;
}

export interface BookingData {
  id: string;
  start: Location;
  destination: Location;
  stops: Location[];
  tier: TaxiTier;
  distance: number;
  fare: number;
  eta: number;
  travelTime: number;
}

const BookingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"map" | "tier" | "confirm" | "status">("map");
  const [startPoint, setStartPoint] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [stops, setStops] = useState<Location[]>([]);
  const [selectedTier, setSelectedTier] = useState<TaxiTier | null>(null);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  const handleMapComplete = (start: Location, dest: Location, stops: Location[]) => {
    setStartPoint(start);
    setDestination(dest);
    setStops(stops);
    setStep("tier");
  };

  const handleTierSelect = (tier: TaxiTier, distance: number, fare: number) => {
    setSelectedTier(tier);
    setStep("confirm");
  };

  const handleConfirmBooking = () => {
    if (startPoint && destination && selectedTier) {
      const distance = calculateDistance(startPoint, destination, stops);
      const fare = calculateFare(distance, selectedTier.multiplier);
      const eta = Math.floor(Math.random() * 10) + 5; // 5-15 mins
      const travelTime = Math.floor(distance / 3); // Approx 3km/min flight speed

      const booking: BookingData = {
        id: `FT${Date.now().toString().slice(-8)}`,
        start: startPoint,
        destination: destination,
        stops: stops,
        tier: selectedTier,
        distance,
        fare,
        eta,
        travelTime,
      };

      setBookingData(booking);
      setStep("status");
    }
  };

  const calculateDistance = (start: Location, end: Location, stops: Location[]): number => {
    let totalDistance = 0;
    let currentPoint = start;

    for (const stop of stops) {
      totalDistance += calculateSegmentDistance(currentPoint, stop);
      currentPoint = stop;
    }

    totalDistance += calculateSegmentDistance(currentPoint, end);

    return totalDistance;
  };

  const calculateSegmentDistance = (point1: Location, point2: Location): number => {
    const R = 6371; // Earth\'s radius in km
    const dLat = ((point2.lat - point1.lat) * Math.PI) / 180;
    const dLng = ((point2.lng - point1.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((point1.lat * Math.PI) / 180) *
        Math.cos((point2.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const calculateFare = (distance: number, multiplier: number): number => {
    const baseRate = 50; // ₹50 per km
    return Math.round(distance * baseRate * multiplier);
  };

  const handleBack = () => {
    if (step === "tier") setStep("map");
    else if (step === "confirm") setStep("tier");
    else navigate("/");
  };

  const handleNewBooking = () => {
    setStep("map");
    setStartPoint(null);
    setDestination(null);
    setStops([]);
    setSelectedTier(null);
    setBookingData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step !== "status" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="hover:bg-primary/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <div className="flex items-center gap-2">
              <Plane className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">SkyTaxi</h1>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {step === "map" && "Select Location"}
            {step === "tier" && "Choose Tier"}
            {step === "confirm" && "Confirm Booking"}
            {step === "status" && "Booking Active"}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {step === "map" && (
          <MapView onComplete={handleMapComplete} />
        )}

        {step === "tier" && startPoint && destination && (
          <TierSelection
            start={startPoint}
            destination={destination}
            stops={stops}
            distance={calculateDistance(startPoint, destination, stops)}
            onSelect={handleTierSelect}
            onBack={() => setStep("map")}
          />
        )}

        {step === "confirm" && startPoint && destination && selectedTier && (
          <BookingConfirmation
            start={startPoint}
            destination={destination}
            stops={stops}
            tier={selectedTier}
            distance={calculateDistance(startPoint, destination, stops)}
            fare={calculateFare(calculateDistance(startPoint, destination, stops), selectedTier.multiplier)}
            onConfirm={handleConfirmBooking}
            onBack={() => setStep("tier")}
          />
        )}

        {step === "status" && bookingData && (
          <BookingStatus
            booking={bookingData}
            onNewBooking={handleNewBooking}
          />
        )}
      </main>
    </div>
  );
};

export default BookingPage;
