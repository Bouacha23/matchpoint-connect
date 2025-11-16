import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, MapPin, Users, Clock, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const MatchDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - will be fetched from Lovable Cloud
  const match = {
    id: 1,
    title: "Sunday Morning Kickoff",
    date: "2025-11-20",
    time: "10:00 AM",
    location: "Central Park Field",
    locationAddress: "123 Park Avenue, Central District",
    currentPlayers: 8,
    maxPlayers: 10,
    description: "Friendly match for all skill levels. Bring your own water and wear appropriate footwear.",
    players: [
      { id: 1, name: "John Doe", level: 7 },
      { id: 2, name: "Jane Smith", level: 6 },
      { id: 3, name: "Mike Johnson", level: 8 },
      { id: 4, name: "Sarah Wilson", level: 5 },
      { id: 5, name: "Tom Brown", level: 7 },
      { id: 6, name: "Lisa Garcia", level: 6 },
      { id: 7, name: "David Lee", level: 8 },
      { id: 8, name: "Emma Martinez", level: 7 },
    ],
  };

  const isFull = match.currentPlayers >= match.maxPlayers;

  const handleJoin = () => {
    if (isFull) {
      toast.error("This match is already full");
      return;
    }
    toast.success("You've joined the match!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate("/")} className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Matches
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl mb-2">{match.title}</CardTitle>
                    <CardDescription className="text-base">
                      {match.description}
                    </CardDescription>
                  </div>
                  {isFull ? (
                    <Badge variant="secondary" className="text-base px-3 py-1">Full</Badge>
                  ) : (
                    <Badge className="bg-primary text-base px-3 py-1">Open</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center gap-3 text-base">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="font-medium">{match.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-base">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="font-medium">{match.time}</span>
                  </div>
                  <div className="flex items-start gap-3 text-base">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">{match.location}</p>
                      <p className="text-sm text-muted-foreground">{match.locationAddress}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="font-medium">
                      {match.currentPlayers}/{match.maxPlayers} players joined
                    </span>
                  </div>
                  <div className="bg-secondary rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-primary h-full transition-all"
                      style={{ width: `${(match.currentPlayers / match.maxPlayers) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Players List */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Players Joined</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {match.players.map((player) => (
                    <div 
                      key={player.id} 
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {player.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{player.name}</span>
                      </div>
                      <Badge variant="outline">Level {player.level}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="border-2 sticky top-24">
              <CardHeader>
                <CardTitle>Join Match</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  size="lg"
                  className="w-full bg-gradient-to-r from-accent to-accent/80 hover:shadow-lg transition-all"
                  onClick={handleJoin}
                  disabled={isFull}
                >
                  {isFull ? "Match Full" : "Join Match"}
                </Button>
                
                <div className="text-center text-sm text-muted-foreground">
                  <p className="mb-2">Need to cancel?</p>
                  <Button variant="link" size="sm">Contact organizer</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MatchDetail;
