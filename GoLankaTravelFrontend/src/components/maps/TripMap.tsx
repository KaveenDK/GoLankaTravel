import { useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapPin } from 'lucide-react'

// --- 1. Custom Marker Icon Fix ---
// Leaflet's default icon sometimes breaks in React bundlers, so we create a custom one.
// We use a transparent div with a Lucide React icon inside it via L.divIcon if we wanted advanced styling,
// but for simplicity here, we fix the default image path issues or use a CDN.
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

// --- 2. Coordinate Lookup for Sri Lanka ---
// Since we store locations as strings, we map them to coords here.
// In a production app, you would save [lat, lng] in your database.
const CITY_COORDS: Record<string, [number, number]> = {
  'Colombo': [6.9271, 79.8612],
  'Kandy': [7.2906, 80.6337],
  'Galle': [6.0535, 80.2210],
  'Ella': [6.8667, 81.0467],
  'Sigiriya': [7.9541, 80.7547],
  'Nuwara Eliya': [6.9497, 80.7891],
  'Mirissa': [5.9482, 80.4716],
  'Yala': [6.3888, 81.3698],
  'Trincomalee': [8.5874, 81.2152],
  'Anuradhapura': [8.3114, 80.4037],
  'Polonnaruwa': [7.9403, 81.0188],
  'Negombo': [7.2081, 79.8373],
  'Bentota': [6.4183, 80.0033],
  'Arugam Bay': [6.8412, 81.8368],
  'Jaffna': [9.6615, 80.0255],
}

interface TripMapProps {
  locations: string[] // Array of city names (e.g., ["Colombo", "Kandy", "Ella"])
}

const TripMap = ({ locations }: TripMapProps) => {
  
  // Convert city names to coordinates
  const routePoints = useMemo(() => {
    const points: { name: string; coords: [number, number] }[] = []
    
    locations.forEach(loc => {
      // Simple fuzzy match or direct lookup
      const key = Object.keys(CITY_COORDS).find(city => loc.includes(city))
      if (key) {
        points.push({ name: key, coords: CITY_COORDS[key] })
      }
    })
    return points
  }, [locations])

  // Center the map based on the first location, or default to Colombo
  const centerPosition: [number, number] = routePoints.length > 0 
    ? routePoints[0].coords 
    : [7.8731, 80.7718] // Center of Sri Lanka

  if (routePoints.length === 0) {
    return (
      <div className="w-full h-[400px] bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-400">
        <div className="text-center">
          <MapPin className="w-10 h-10 mx-auto mb-2 opacity-50" />
          <p>Map data unavailable for this route.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 relative z-0">
      <MapContainer 
        center={centerPosition} 
        zoom={7} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%' }}
      >
        {/* Dark/Light Mode Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Draw the Route Line */}
        <Polyline 
          positions={routePoints.map(p => p.coords)} 
          pathOptions={{ color: '#9333ea', weight: 4, opacity: 0.7, dashArray: '10, 10' }} 
        />

        {/* Place Markers */}
        {routePoints.map((point, index) => (
          <Marker 
            key={index} 
            position={point.coords} 
            icon={defaultIcon}
          >
            <Popup>
              <div className="text-center">
                <span className="font-bold text-purple-600">Stop {index + 1}</span>
                <br />
                <span className="font-medium">{point.name}</span>
              </div>
            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  )
}

export default TripMap