
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Radar, Satellite } from "lucide-react";

const IntelligenceMap = () => {
  const threats = [
    { id: 1, location: "POK Border", type: "Surveillance", severity: "high", lat: 34.5, lng: 74.8 },
    { id: 2, location: "Arabian Sea", type: "Naval Movement", severity: "medium", lat: 19.0, lng: 72.8 },
    { id: 3, location: "LAC Sector", type: "Troop Movement", severity: "high", lat: 34.2, lng: 77.6 },
    { id: 4, location: "Bay of Bengal", type: "Submarine Activity", severity: "low", lat: 13.0, lng: 80.2 }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card className="bg-black/40 border-blue-500/50 text-white h-96">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-400" />
          Real-Time Intelligence Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-full bg-gradient-to-br from-blue-900/20 to-green-900/20 rounded-lg overflow-hidden">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 opacity-30">
            <svg viewBox="0 0 400 300" className="w-full h-full">
              <path d="M50,50 Q200,30 350,80 Q300,150 250,200 Q150,250 50,180 Z" 
                    fill="none" stroke="#4ade80" strokeWidth="2" opacity="0.6" />
              <path d="M80,100 Q180,90 280,130 Q250,180 200,220 Q120,230 80,170 Z" 
                    fill="none" stroke="#60a5fa" strokeWidth="2" opacity="0.4" />
            </svg>
          </div>

          {/* Threat Markers */}
          {threats.map((threat) => (
            <div
              key={threat.id}
              className="absolute animate-pulse"
              style={{
                left: `${(threat.lng - 70) * 4}%`,
                top: `${(40 - threat.lat) * 4}%`
              }}
            >
              <div className={`w-3 h-3 rounded-full ${getSeverityColor(threat.severity)} animate-ping`}></div>
              <div className={`w-2 h-2 rounded-full ${getSeverityColor(threat.severity)} absolute top-0.5 left-0.5`}></div>
            </div>
          ))}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <Radar className="h-3 w-3 text-blue-400" />
              <span>Active Monitoring</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Satellite className="h-3 w-3 text-purple-400" />
              <span>Satellite Coverage</span>
            </div>
          </div>

          {/* Threat List */}
          <div className="absolute top-4 right-4 space-y-2 max-w-xs">
            {threats.slice(0, 3).map((threat) => (
              <div key={threat.id} className="bg-black/60 p-2 rounded text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{threat.location}</span>
                  <Badge variant="outline" className={`text-xs ${getSeverityColor(threat.severity)} border-0`}>
                    {threat.severity.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-gray-400">{threat.type}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntelligenceMap;
