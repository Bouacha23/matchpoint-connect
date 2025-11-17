import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // Mock data - will be replaced with real data from Lovable Cloud
  const matches = [
    {
      id: 1,
      title: "Sunday Morning Kickoff",
      date: "2025-11-20",
      time: "10:00 AM",
      location: "Central Park Field",
      currentPlayers: 8,
      maxPlayers: 10,
    },
    {
      id: 2,
      title: "Evening Match",
      date: "2025-11-21",
      time: "6:00 PM",
      location: "Riverside Sports Complex",
      currentPlayers: 10,
      maxPlayers: 10,
    },
    {
      id: 3,
      title: "Weekend Tournament",
      date: "2025-11-23",
      time: "2:00 PM",
      location: "City Stadium",
      currentPlayers: 5,
      maxPlayers: 12,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">⚽ MatchUp</h1>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => navigate("/profile")}>
              Profile
            </Button>
            <Button variant="ghost" onClick={() => navigate("/auth")}>
              Login
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Upcoming Matches</h2>
            <p className="text-muted-foreground">Find and join football matches in your area</p>
          </div>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg transition-all"
            onClick={() => navigate("/create-match")}
          >
            <Plus className="mr-2 h-5 w-5" />
            Create Match
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button variant="outline" size="sm">All Matches</Button>
          <Button variant="outline" size="sm">Today</Button>
          <Button variant="outline" size="sm">This Week</Button>
          <Button variant="outline" size="sm">Available</Button>
        </div>

        {/* Matches Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {matches.map((match) => {
            const isFull = match.currentPlayers >= match.maxPlayers;
            return (
              <Card 
                key={match.id} 
                className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50"
                onClick={() => navigate(`/match/${match.id}`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl">{match.title}</CardTitle>
                    {isFull ? (
                      <Badge variant="secondary">Full</Badge>
                    ) : (
                      <Badge className="bg-primary">Open</Badge>
                    )}
                  </div>
                  <CardDescription className="flex items-center gap-2 mt-2">
                    <MapPin className="h-4 w-4" />
                    {match.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {match.date} at {match.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">
                        {match.currentPlayers}/{match.maxPlayers} players
                      </span>
                      <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-primary h-full transition-all"
                          style={{ width: `${(match.currentPlayers / match.maxPlayers) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Home;
