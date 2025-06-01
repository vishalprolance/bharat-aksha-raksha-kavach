
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Eye, Shield } from "lucide-react";

const ThreatMonitor = () => {
  const threats = [
    { category: "Cyber Threats", level: 85, incidents: 23, color: "text-red-400" },
    { category: "Border Intrusions", level: 45, incidents: 7, color: "text-yellow-400" },
    { category: "Maritime Security", level: 30, incidents: 12, color: "text-green-400" },
    { category: "Air Space Violations", level: 15, incidents: 3, color: "text-blue-400" }
  ];

  return (
    <Card className="bg-black/40 border-red-500/50 text-white h-96">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          Threat Assessment Matrix
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {threats.map((threat, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{threat.category}</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${threat.color}`}>{threat.level}%</span>
                <span className="text-xs text-gray-400">{threat.incidents} incidents</span>
              </div>
            </div>
            <Progress value={threat.level} className="h-2" />
          </div>
        ))}

        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center mb-1">
                <Eye className="h-4 w-4 text-blue-400" />
              </div>
              <p className="text-lg font-bold text-blue-400">847</p>
              <p className="text-xs text-gray-400">Monitoring</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-1">
                <Shield className="h-4 w-4 text-green-400" />
              </div>
              <p className="text-lg font-bold text-green-400">2,341</p>
              <p className="text-xs text-gray-400">Protected</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-1">
                <AlertTriangle className="h-4 w-4 text-red-400" />
              </div>
              <p className="text-lg font-bold text-red-400">45</p>
              <p className="text-xs text-gray-400">Active Threats</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreatMonitor;
