import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Navigation, Plane, Clock, CheckCircle2, XCircle } from "lucide-react";
import { BookingData } from "@/pages/BookingPage";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface BookingStatusProps {
  booking: BookingData;
  onNewBooking: () => void;
}

const BookingStatus = ({ booking, onNewBooking }: BookingStatusProps) => {
  const [status, setStatus] = useState<"arriving" | "completed" | "cancelled">("arriving");
  const [timeRemaining, setTimeRemaining] = useState(booking.eta);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (status !== "arriving") return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setStatus("completed");
          toast.success("Your flying taxi has arrived! Enjoy your flight!");
          return 0;
        }
        return prev - 1;
      });

      setProgress((prev) => {
        const increment = 100 / booking.eta;
        return Math.min(prev + increment, 100);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status, booking.eta]);

  const handleCancel = () => {
    setStatus("cancelled");
    toast.info("Booking cancelled successfully");
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Card className={`p-6 ${
        status === "arriving" ? "bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20" :
        status === "completed" ? "bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20" :
        "bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/20"
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">
              {status === "arriving" && "Your Flying Taxi is On the Way"}
              {status === "completed" && "Journey Completed!"}
              {status === "cancelled" && "Booking Cancelled"}
            </h2>
            <p className="text-muted-foreground">Booking ID: {booking.id}</p>
          </div>
          {status === "arriving" && (
            <Plane className="h-12 w-12 text-primary animate-pulse" />
          )}
          {status === "completed" && (
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          )}
          {status === "cancelled" && (
            <XCircle className="h-12 w-12 text-red-600" />
          )}
        </div>

        {status === "arriving" && (
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-muted-foreground">Estimated Arrival</span>
              <span className="text-3xl font-bold text-primary">{timeRemaining} mins</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
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
                  {booking.start.lat.toFixed(4)}°N, {booking.start.lng.toFixed(4)}°E
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Drop-off Location</p>
                <p className="font-medium">
                  {booking.destination.lat.toFixed(4)}°N, {booking.destination.lng.toFixed(4)}°E
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 border-border/50">
          <p className="text-xs text-muted-foreground mb-1">Tier</p>
          <p className="font-bold">{booking.tier.name}</p>
        </Card>

        <Card className="p-4 border-border/50">
          <p className="text-xs text-muted-foreground mb-1">Distance</p>
          <p className="font-bold">{booking.distance.toFixed(2)} km</p>
        </Card>

        <Card className="p-4 border-border/50">
          <p className="text-xs text-muted-foreground mb-1">Flight Time</p>
          <p className="font-bold">{booking.travelTime} mins</p>
        </Card>

        <Card className="p-4 border-border/50">
          <p className="text-xs text-muted-foreground mb-1">Total Fare</p>
          <p className="font-bold text-primary">₹{booking.fare.toLocaleString("en-IN")}</p>
        </Card>
      </div>

      <div className="flex gap-3">
        {status === "arriving" && (
          <Button
            onClick={handleCancel}
            variant="outline"
            className="flex-1 border-red-500/50 text-red-600 hover:bg-red-500/10"
          >
            Cancel Booking
          </Button>
        )}
        {(status === "completed" || status === "cancelled") && (
          <Button
            onClick={onNewBooking}
            className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
          >
            Book New Flight
          </Button>
        )}
      </div>

      {status === "completed" && (
        <Card className="p-6 bg-green-500/5 border-green-500/20">
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-green-600">
            <CheckCircle2 className="h-5 w-5" />
            Thank you for flying with SkyTaxi!
          </h3>
          <p className="text-sm text-muted-foreground">
            We hope you enjoyed your journey. Book again soon for faster, congestion-free travel across Bengaluru.
          </p>
        </Card>
      )}
    </div>
  );
};

export default BookingStatus;
