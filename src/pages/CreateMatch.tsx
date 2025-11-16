import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const CreateMatch = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Mock places - will be fetched from Lovable Cloud
  const places = [
    { id: 1, name: "Central Park Field" },
    { id: 2, name: "Riverside Sports Complex" },
    { id: 3, name: "City Stadium" },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call - will be replaced with Lovable Cloud
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Match created successfully!");
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate("/")} className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-3xl">Create New Match</CardTitle>
            <CardDescription>Organize a football match and invite players</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Match Title *</Label>
                <Input 
                  id="title" 
                  placeholder="e.g., Sunday Morning Kickoff"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input 
                    id="date" 
                    type="date"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time *</Label>
                  <Input 
                    id="time" 
                    type="time"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                  <SelectContent>
                    {places.map((place) => (
                      <SelectItem key={place.id} value={place.id.toString()}>
                        {place.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxPlayers">Maximum Players *</Label>
                <Input 
                  id="maxPlayers" 
                  type="number"
                  min="2"
                  max="22"
                  defaultValue="10"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea 
                  id="description" 
                  placeholder="Add any additional details about the match..."
                  rows={4}
                />
              </div>

              <Button 
                type="submit" 
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg transition-all"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Match"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreateMatch;
