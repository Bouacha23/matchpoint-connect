import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';

interface Match {
  id: number;
  title: string;
  location: string;
  coordinates: [number, number];
  currentPlayers: number;
  maxPlayers: number;
}

interface MatchMapProps {
  matches: Match[];
  onMarkerClick?: (matchId: number) => void;
}

const MatchMap = ({ matches, onMarkerClick }: MatchMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [tokenSubmitted, setTokenSubmitted] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !tokenSubmitted || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: matches[0]?.coordinates || [-0.1276, 51.5074],
        zoom: 12,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add markers for each match
      matches.forEach((match) => {
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.width = '32px';
        el.style.height = '32px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = 'hsl(var(--primary))';
        el.style.border = '3px solid hsl(var(--background))';
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
        el.style.cursor = 'pointer';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';

        const icon = document.createElement('div');
        icon.innerHTML = '⚽';
        icon.style.fontSize = '16px';
        el.appendChild(icon);

        const marker = new mapboxgl.Marker(el)
          .setLngLat(match.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<div style="padding: 8px;">
                <h3 style="font-weight: bold; margin-bottom: 4px;">${match.title}</h3>
                <p style="font-size: 14px; color: #666; margin-bottom: 4px;">${match.location}</p>
                <p style="font-size: 14px;"><strong>${match.currentPlayers}/${match.maxPlayers}</strong> players</p>
              </div>`
            )
          )
          .addTo(map.current!);

        el.addEventListener('click', () => {
          if (onMarkerClick) onMarkerClick(match.id);
        });
      });

      // Fit bounds to show all markers
      if (matches.length > 1) {
        const bounds = new mapboxgl.LngLatBounds();
        matches.forEach((match) => bounds.extend(match.coordinates));
        map.current.fitBounds(bounds, { padding: 50 });
      }
    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      map.current?.remove();
    };
  }, [matches, onMarkerClick, tokenSubmitted, mapboxToken]);

  if (!tokenSubmitted) {
    return (
      <div className="bg-card border-2 rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-2 text-primary mb-2">
          <MapPin className="h-5 w-5" />
          <h3 className="font-semibold">Map View</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Enter your Mapbox token to view match locations on the map. Get your free token at{' '}
          <a 
            href="https://mapbox.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            mapbox.com
          </a>
        </p>
        <div className="space-y-2">
          <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
          <Input
            id="mapbox-token"
            type="text"
            placeholder="pk.eyJ1..."
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
          />
          <button
            onClick={() => setTokenSubmitted(true)}
            disabled={!mapboxToken}
            className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Load Map
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden border-2">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default MatchMap;
