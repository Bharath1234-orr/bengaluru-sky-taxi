import { Button } from "@/components/ui/button";
import { Plane, MapPin, Clock, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
              <Plane className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">The Future of Urban Travel</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
              Flying Taxis for Bengaluru
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Skip the traffic. Soar above the city. Your autonomous flying taxi arrives in minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                onClick={() => navigate("/booking")}
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-lg px-8 py-6 shadow-lg hover:shadow-xl"
              >
                Book Your Flight Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 border-2"
                onClick={() => {
                  document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Learn More
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">5-15min</p>
                <p className="text-sm text-muted-foreground mt-1">Taxi Arrival</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">3x</p>
                <p className="text-sm text-muted-foreground mt-1">Faster Travel</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">100%</p>
                <p className="text-sm text-muted-foreground mt-1">Autonomous</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative gradient orbs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-50" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose SkyTaxi?</h2>
            <p className="text-xl text-muted-foreground">Experience the future of transportation today</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-card p-8 rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-14 w-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                <Zap className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Arrive 3x faster than ground transportation. No traffic, no delays.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-14 w-14 rounded-xl bg-accent/20 flex items-center justify-center mb-6">
                <MapPin className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Direct Routes</h3>
              <p className="text-muted-foreground">
                Point-to-point aerial travel across Bengaluru. Straight line, every time.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-14 w-14 rounded-xl bg-secondary/20 flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3">100% Safe</h3>
              <p className="text-muted-foreground">
                Fully autonomous with multiple safety systems and real-time monitoring.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-14 w-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                <Clock className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">On Demand</h3>
              <p className="text-muted-foreground">
                Book in seconds. Your flying taxi arrives in minutes. Simple as that.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-12 border border-primary/20 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Skip the Traffic?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the future of urban mobility. Book your first flying taxi ride today.
            </p>
            <Button
              onClick={() => navigate("/booking")}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-lg px-12 py-6 shadow-xl"
            >
              Start Your Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Plane className="h-5 w-5 text-primary" />
            <span className="font-bold text-foreground">SkyTaxi</span>
          </div>
          <p className="text-sm">Revolutionizing urban transport in Bengaluru</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
