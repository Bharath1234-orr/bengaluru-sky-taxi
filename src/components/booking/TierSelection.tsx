import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Plane, Star, Crown } from "lucide-react";
import { Location, TaxiTier } from "@/pages/BookingPage";

interface TierSelectionProps {
  start: Location;
  destination: Location;
  distance: number;
  onSelect: (tier: TaxiTier, distance: number, fare: number) => void;
  onBack: () => void;
}

const tiers: TaxiTier[] = [
  {
    id: "standard",
    name: "Standard",
    multiplier: 1,
    capacity: 2,
    description: "Comfortable and affordable sky travel",
  },
  {
    id: "premium",
    name: "Premium",
    multiplier: 1.5,
    capacity: 4,
    description: "Enhanced comfort with extra space",
  },
  {
    id: "luxury",
    name: "Luxury",
    multiplier: 2.5,
    capacity: 4,
    description: "Ultimate flying experience with premium amenities",
  },
];

const TierSelection = ({ start, destination, distance, onSelect, onBack }: TierSelectionProps) => {
  const [selectedTier, setSelectedTier] = useState<TaxiTier | null>(null);
  const baseRate = 50; // ₹50 per km

  const calculateFare = (multiplier: number): number => {
    return Math.round(distance * baseRate * multiplier);
  };

  const handleSelect = () => {
    if (selectedTier) {
      onSelect(selectedTier, distance, calculateFare(selectedTier.multiplier));
    }
  };

  const getTierIcon = (tierId: string) => {
    switch (tierId) {
      case "standard":
        return <Plane className="h-6 w-6" />;
      case "premium":
        return <Star className="h-6 w-6" />;
      case "luxury":
        return <Crown className="h-6 w-6" />;
      default:
        return <Plane className="h-6 w-6" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <h2 className="text-2xl font-bold mb-2">Choose Your Flying Taxi</h2>
        <div className="flex items-baseline gap-2 text-muted-foreground">
          <span>Estimated distance:</span>
          <span className="text-2xl font-bold text-primary">{distance.toFixed(2)} km</span>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiers.map((tier) => (
          <Card
            key={tier.id}
            className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${
              selectedTier?.id === tier.id
                ? "border-2 border-primary bg-primary/5 shadow-lg shadow-primary/20"
                : "border-border/50 hover:border-primary/50"
            }`}
            onClick={() => setSelectedTier(tier)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full ${
                tier.id === "standard" ? "bg-primary/20 text-primary" :
                tier.id === "premium" ? "bg-accent/20 text-accent" :
                "bg-secondary/20 text-secondary"
              }`}>
                {getTierIcon(tier.id)}
              </div>
              {selectedTier?.id === tier.id && (
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <Check className="h-5 w-5 text-primary-foreground" />
                </div>
              )}
            </div>

            <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Capacity:</span>
                <span className="font-medium">{tier.capacity} passengers</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rate:</span>
                <span className="font-medium">₹{(baseRate * tier.multiplier).toFixed(0)}/km</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border/50">
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-muted-foreground">Total Fare:</span>
                <span className="text-2xl font-bold text-primary">
                  ₹{calculateFare(tier.multiplier).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1">
          Back to Map
        </Button>
        <Button
          onClick={handleSelect}
          disabled={!selectedTier}
          className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        >
          Continue to Confirmation
        </Button>
      </div>
    </div>
  );
};

export default TierSelection;
