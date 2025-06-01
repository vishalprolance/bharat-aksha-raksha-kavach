
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Plane, Ship, Shield, Activity } from "lucide-react";

interface ForceOverviewProps {
  force: "army" | "navy" | "airforce";
}

const ForceOverview = ({ force }: ForceOverviewProps) => {
  const forceData = {
    army: {
      title: "Indian Army",
      icon: Shield,
      color: "text-green-400",
      bgColor: "border-green-500/50",
      personnel: "1,237,117",
      active: "Ready",
      equipment: "Tanks: 4,614 | Artillery: 7,414",
      status: "OPERATIONAL"
    },
    navy: {
      title: "Indian Navy",
      icon: Ship,
      color: "text-blue-400",
      bgColor: "border-blue-500/50",
      personnel: "67,228",
      active: "Deployed",
      equipment: "Ships: 150 | Submarines: 17",
      status: "PATROL"
    },
    airforce: {
      title: "Indian Air Force",
      icon: Plane,
      color: "text-cyan-400",
      bgColor: "border-cyan-500/50",
      personnel: "139,576",
      active: "Airborne",
      equipment: "Aircraft: 1,645 | Helicopters: 902",
      status: "ALERT"
    }
  };

  const data = forceData[force];
  const IconComponent = data.icon;

  return (
    <Card className={`bg-black/40 ${data.bgColor} text-white`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconComponent className={`h-5 w-5 ${data.color}`} />
            {data.title}
          </div>
          <Badge variant="outline" className={`${data.color} border-current`}>
            {data.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-400">PERSONNEL</p>
            <p className="text-lg font-bold">{data.personnel}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">STATUS</p>
            <p className={`text-sm font-medium ${data.color}`}>{data.active}</p>
          </div>
        </div>
        
        <div>
          <p className="text-xs text-gray-400 mb-1">EQUIPMENT</p>
          <p className="text-sm">{data.equipment}</p>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Activity className={`h-4 w-4 ${data.color} animate-pulse`} />
          <span className="text-xs">Real-time monitoring active</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForceOverview;
