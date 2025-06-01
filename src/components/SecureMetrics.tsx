
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Lock, 
  Eye, 
  Database, 
  Wifi, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity
} from "lucide-react";

const SecureMetrics = () => {
  const securityMetrics = [
    { name: "Encryption Level", value: 256, unit: "bit AES", status: "secure" },
    { name: "Access Attempts", value: 1247, unit: "today", status: "monitoring" },
    { name: "Data Integrity", value: 99.97, unit: "%", status: "secure" },
    { name: "Network Security", value: 94, unit: "%", status: "secure" }
  ];

  const intelligenceFeeds = [
    { source: "HUMINT", status: "active", confidence: 85, lastUpdate: "2 min ago" },
    { source: "SIGINT", status: "active", confidence: 92, lastUpdate: "1 min ago" },
    { source: "GEOINT", status: "active", confidence: 78, lastUpdate: "3 min ago" },
    { source: "OSINT", status: "active", confidence: 67, lastUpdate: "5 min ago" },
    { source: "TECHINT", status: "maintenance", confidence: 0, lastUpdate: "45 min ago" }
  ];

  const systemStatus = [
    { system: "Primary Database", status: "operational", uptime: 99.9 },
    { system: "Backup Systems", status: "operational", uptime: 100 },
    { system: "Communication Grid", status: "operational", uptime: 98.7 },
    { system: "Satellite Network", status: "maintenance", uptime: 95.4 },
    { system: "Security Protocols", status: "operational", uptime: 100 }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
      case "active":
      case "secure":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "maintenance":
      case "monitoring":
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <Activity className="h-4 w-4 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {securityMetrics.map((metric, index) => (
          <Card key={index} className="bg-black/40 border-purple-500/50 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Lock className="h-5 w-5 text-purple-400" />
                {getStatusIcon(metric.status)}
              </div>
              <div>
                <p className="text-2xl font-bold">{metric.value}{metric.unit === "%" ? "%" : ""}</p>
                <p className="text-sm text-gray-400">{metric.name}</p>
                {metric.unit !== "%" && (
                  <p className="text-xs text-purple-400">{metric.unit}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-cyan-500/50 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-cyan-400" />
              Intelligence Feeds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {intelligenceFeeds.map((feed, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(feed.status)}
                  <div>
                    <p className="font-medium">{feed.source}</p>
                    <p className="text-xs text-gray-400">{feed.lastUpdate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{feed.confidence}%</p>
                  <p className="text-xs text-gray-400">Confidence</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-green-500/50 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-green-400" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemStatus.map((system, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(system.status)}
                    <span className="font-medium">{system.system}</span>
                  </div>
                  <span className="text-sm">{system.uptime}%</span>
                </div>
                <Progress value={system.uptime} className="h-1" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-black/40 border-red-500/50 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-400" />
            Security Command Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h5 className="font-semibold text-red-400">Threat Detection</h5>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Intrusion Detection</span>
                  <Badge className="bg-green-500 text-white">ACTIVE</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Malware Scanning</span>
                  <Badge className="bg-green-500 text-white">ACTIVE</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Anomaly Detection</span>
                  <Badge className="bg-yellow-500 text-white">LEARNING</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-semibold text-red-400">Access Control</h5>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Failed Logins (24h)</span>
                  <span className="text-red-400">247</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Sessions</span>
                  <span className="text-green-400">1,847</span>
                </div>
                <div className="flex justify-between">
                  <span>Privilege Escalations</span>
                  <span className="text-yellow-400">12</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-semibold text-red-400">Network Security</h5>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Wifi className="h-3 w-3 text-green-400" />
                  <span>Firewall: ACTIVE</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-3 w-3 text-green-400" />
                  <span>IPS: MONITORING</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-3 w-3 text-green-400" />
                  <span>VPN: SECURED</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecureMetrics;
