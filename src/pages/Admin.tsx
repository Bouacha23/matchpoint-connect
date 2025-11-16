import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Admin = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock places data - will be fetched from Lovable Cloud
  const places = [
    { id: 1, name: "Central Park Field", address: "123 Park Avenue, Central District" },
    { id: 2, name: "Riverside Sports Complex", address: "456 River Road, North Side" },
    { id: 3, name: "City Stadium", address: "789 Stadium Drive, Downtown" },
  ];

  const handleAddPlace = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Place added successfully!");
    setIsDialogOpen(false);
  };

  const handleDeletePlace = (id: number) => {
    toast.success("Place deleted successfully!");
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">Manage places and view all matches</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-primary/80">
                <Plus className="mr-2 h-4 w-4" />
                Add Place
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Place</DialogTitle>
                <DialogDescription>
                  Create a new location for matches
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddPlace} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="place-name">Place Name *</Label>
                  <Input id="place-name" placeholder="e.g., Central Park Field" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="place-address">Address *</Label>
                  <Input id="place-address" placeholder="123 Main St, City" required />
                </div>
                <Button type="submit" className="w-full">Add Place</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Manage Places</CardTitle>
            <CardDescription>Add, edit, or remove match locations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {places.map((place) => (
                <div 
                  key={place.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div>
                    <h4 className="font-medium">{place.name}</h4>
                    <p className="text-sm text-muted-foreground">{place.address}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleDeletePlace(place.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 mt-6">
          <CardHeader>
            <CardTitle>Recent Matches</CardTitle>
            <CardDescription>View all matches created by users</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center py-8">
              Match management features will be available soon
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Admin;
