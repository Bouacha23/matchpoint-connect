import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();

  // Mock user data - will be fetched from Lovable Cloud
  const user = {
    name: "John Doe",
    email: "john@example.com",
    level: 7,
    matchesJoined: 15,
    matchesHosted: 5,
  };

  const upcomingMatches = [
    {
      id: 1,
      title: "Sunday Morning Kickoff",
      date: "2025-11-20",
      location: "Central Park Field",
    },
    {
      id: 2,
      title: "Evening Match",
      date: "2025-11-21",
      location: "Riverside Sports Complex",
    },
  ];

  const handleSave = () => {
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate("/")} className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Info */}
          <div className="md:col-span-2 space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-3xl">Your Profile</CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline">Change Avatar</Button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={user.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={user.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="level">Skill Level (1-10)</Label>
                    <Input 
                      id="level" 
                      type="number" 
                      min="1" 
                      max="10" 
                      defaultValue={user.level} 
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleSave}
                  className="w-full bg-gradient-to-r from-primary to-primary/80"
                >
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Upcoming Matches</CardTitle>
                <CardDescription>Matches you've joined</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingMatches.map((match) => (
                    <div 
                      key={match.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                      onClick={() => navigate(`/match/${match.id}`)}
                    >
                      <div>
                        <h4 className="font-medium">{match.title}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {match.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {match.location}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-4">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <div className="text-3xl font-bold text-primary">{user.level}</div>
                  <p className="text-sm text-muted-foreground">Skill Level</p>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <div className="text-3xl font-bold text-primary">{user.matchesJoined}</div>
                  <p className="text-sm text-muted-foreground">Matches Joined</p>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <div className="text-3xl font-bold text-primary">{user.matchesHosted}</div>
                  <p className="text-sm text-muted-foreground">Matches Hosted</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
