import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Navigation, Plane, CreditCard, Clock } from "lucide-react";
import { Location, TaxiTier } from "@/pages/BookingPage";

interface BookingConfirmationProps {
  start: Location;
  destination: Location;
  tier: TaxiTier;
  distance: number;
  fare: number;
  onConfirm: () => void;
  onBack: () => void;
}

const BookingConfirmation = ({
  start,
  destination,
  tier,
  distance,
  fare,
  onConfirm,
  onBack,
}: BookingConfirmationProps) => {
  const estimatedTravelTime = Math.floor(distance / 3); // ~3km/min flight speed
  const estimatedETA = Math.floor(Math.random() * 10) + 5; // 5-15 mins for taxi arrival

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <h2 className="text-2xl font-bold mb-2">Confirm Your Booking</h2>
        <p className="text-muted-foreground">Review your journey details before confirming</p>
      </Card>

      <Card className="p-6 border-border/50">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Journey Details
        </h3>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1 w-0.5 bg-gradient-to-b from-green-500 to-red-500 my-2" style={{ minHeight: "40px" }} />
              <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <Navigation className="h-5 w-5 text-red-600" />
              </div>
            </div>

            <div className="flex-1 space-y-8">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Pickup Location</p>
                <p className="font-medium">
                  {start.lat.toFixed(4)}°N, {start.lng.toFixed(4)}°E
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Drop-off Location</p>
                <p className="font-medium">
                  {destination.lat.toFixed(4)}°N, {destination.lng.toFixed(4)}°E
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-border/50">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Plane className="h-5 w-5 text-primary" />
          Taxi Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-xs text-muted-foreground mb-1">Tier</p>
            <p className="font-bold text-lg">{tier.name}</p>
            <p className="text-sm text-muted-foreground mt-1">{tier.description}</p>
          </div>

          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-xs text-muted-foreground mb-1">Capacity</p>
            <p className="font-bold text-lg">{tier.capacity} Passengers</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-border/50">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Time Estimates
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
            <p className="text-xs text-muted-foreground mb-1">Distance</p>
            <p className="font-bold text-xl text-accent">{distance.toFixed(2)} km</p>
          </div>

          <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
            <p className="text-xs text-muted-foreground mb-1">Taxi ETA</p>
            <p className="font-bold text-xl text-accent">{estimatedETA} mins</p>
          </div>

          <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
            <p className="text-xs text-muted-foreground mb-1">Flight Time</p>
            <p className="font-bold text-xl text-accent">{estimatedTravelTime} mins</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          Fare Breakdown
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Base Fare ({distance.toFixed(2)} km × ₹50)</span>
            <span className="font-medium">₹{(distance * 50).toFixed(0)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tier Multiplier ({tier.multiplier}x)</span>
            <span className="font-medium">₹{((distance * 50 * tier.multiplier) - (distance * 50)).toFixed(0)}</span>
          </div>

          <div className="border-t border-border/50 pt-3 flex justify-between items-baseline">
            <span className="font-semibold text-lg">Total Fare</span>
            <span className="text-3xl font-bold text-primary">
              ₹{fare.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1">
          Back to Tier Selection
        </Button>
        <Button
          onClick={onConfirm}
          className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-lg py-6"
        >
          Confirm Booking
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
