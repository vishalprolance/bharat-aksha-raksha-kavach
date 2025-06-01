
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Users, 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Radio,
  Target
} from "lucide-react";

interface OperationsCenterProps {
  force: "army" | "navy" | "airforce";
}

const OperationsCenter = ({ force }: OperationsCenterProps) => {
  const operationsData = {
    army: {
      title: "Army Operations Command",
      activeOps: [
        { name: "Operation Meghdoot", status: "Active", progress: 85, location: "Siachen Glacier" },
        { name: "Operation Parakram", status: "Standby", progress: 100, location: "Western Sector" },
        { name: "Operation Falcon", status: "Planning", progress: 45, location: "Northern Command" }
      ],
      units: [
        { name: "XV Corps", strength: 45000, readiness: 95, sector: "Kashmir" },
        { name: "XIV Corps", strength: 42000, readiness: 88, sector: "Ladakh" },
        { name: "XVI Corps", strength: 38000, readiness: 92, sector: "Assam" }
      ]
    },
    navy: {
      title: "Naval Operations Command",
      activeOps: [
        { name: "Operation Sankalp", status: "Active", progress: 78, location: "Persian Gulf" },
        { name: "Operation Vanilla", status: "Active", progress: 92, location: "Mauritius" },
        { name: "Maritime Patrol", status: "Ongoing", progress: 100, location: "Indian Ocean" }
      ],
      units: [
        { name: "Western Fleet", strength: 8500, readiness: 96, sector: "Arabian Sea" },
        { name: "Eastern Fleet", strength: 7200, readiness: 89, sector: "Bay of Bengal" },
        { name: "Southern Command", strength: 6800, readiness: 93, sector: "Indian Ocean" }
      ]
    },
    airforce: {
      title: "Air Force Operations Command",
      activeOps: [
        { name: "Operation Gagan Shakti", status: "Exercise", progress: 67, location: "Rajasthan" },
        { name: "CAP Missions", status: "Active", progress: 100, location: "LAC Sectors" },
        { name: "Air Mobility", status: "Standby", progress: 85, location: "Strategic Bases" }
      ],
      units: [
        { name: "Western Air Command", strength: 35000, readiness: 94, sector: "Kashmir" },
        { name: "Eastern Air Command", strength: 28000, readiness: 91, sector: "Assam" },
        { name: "Central Air Command", strength: 32000, readiness: 97, sector: "Madhya Pradesh" }
      ]
    }
  };

  const data = operationsData[force];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "bg-green-500";
      case "standby": return "bg-yellow-500";
      case "planning": return "bg-blue-500";
      case "exercise": return "bg-purple-500";
      case "ongoing": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-blue-500/50 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-400" />
              Active Operations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.activeOps.map((op, index) => (
              <div key={index} className="space-y-2 p-3 bg-black/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{op.name}</h4>
                  <Badge className={`${getStatusColor(op.status)} text-white border-0`}>
                    {op.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MapPin className="h-3 w-3" />
                  {op.location}
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>{op.progress}%</span>
                  </div>
                  <Progress value={op.progress} className="h-1" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-green-500/50 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-400" />
              Unit Readiness
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.units.map((unit, index) => (
              <div key={index} className="space-y-2 p-3 bg-black/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{unit.name}</h4>
                  <div className="flex items-center gap-1">
                    <Activity className="h-3 w-3 text-green-400" />
                    <span className="text-sm text-green-400">{unit.readiness}%</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Strength</p>
                    <p className="font-medium">{unit.strength.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Sector</p>
                    <p className="font-medium">{unit.sector}</p>
                  </div>
                </div>
                <Progress value={unit.readiness} className="h-1" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-black/40 border-purple-500/50 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio className="h-5 w-5 text-purple-400" />
            {data.title} - Command Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h5 className="font-semibold text-purple-400">Communication Status</h5>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Secure Channels</span>
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Satellite Links</span>
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Emergency Protocols</span>
                  <AlertCircle className="h-4 w-4 text-yellow-400" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-semibold text-purple-400">Current Alerts</h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span>Weather Advisory - Northern Sector</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>All Systems Operational</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span>Routine Maintenance Scheduled</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-semibold text-purple-400">Quick Actions</h5>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start text-white border-gray-600">
                  <Clock className="h-3 w-3 mr-2" />
                  Emergency Protocols
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-white border-gray-600">
                  <Radio className="h-3 w-3 mr-2" />
                  Secure Comms
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-white border-gray-600">
                  <Target className="h-3 w-3 mr-2" />
                  Mission Planning
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OperationsCenter;
