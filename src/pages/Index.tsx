
import { useState } from "react";
import { Shield, Radar, Globe, Satellite, Users, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "@/components/DashboardHeader";
import ForceOverview from "@/components/ForceOverview";
import ThreatMonitor from "@/components/ThreatMonitor";
import OperationsCenter from "@/components/OperationsCenter";
import IntelligenceMap from "@/components/IntelligenceMap";
import SecureMetrics from "@/components/SecureMetrics";

const Index = () => {
  const [activeAlert, setActiveAlert] = useState(false);
  const [securityLevel, setSecurityLevel] = useState("DEFCON 2");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Security Alert Bar */}
      <div className="w-full bg-red-600 text-white py-2 px-4 text-center font-semibold">
        <div className="flex items-center justify-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          CLASSIFIED - INDIAN DEFENSE INTELLIGENCE NETWORK - {securityLevel}
        </div>
      </div>

      <DashboardHeader securityLevel={securityLevel} />

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-black/40 border-green-500/50 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-400 text-sm font-medium">ACTIVE ASSETS</p>
                  <p className="text-2xl font-bold">2,847</p>
                </div>
                <Shield className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-blue-500/50 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-400 text-sm font-medium">THREAT LEVEL</p>
                  <p className="text-2xl font-bold text-orange-400">MODERATE</p>
                </div>
                <Radar className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/50 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-400 text-sm font-medium">SATELLITES</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <Satellite className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-yellow-500/50 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-400 text-sm font-medium">PERSONNEL</p>
                  <p className="text-2xl font-bold">1.4M</p>
                </div>
                <Users className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Intelligence Dashboard */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-black/40">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-blue-600">
              Overview
            </TabsTrigger>
            <TabsTrigger value="army" className="text-white data-[state=active]:bg-green-600">
              Army
            </TabsTrigger>
            <TabsTrigger value="navy" className="text-white data-[state=active]:bg-blue-500">
              Navy
            </TabsTrigger>
            <TabsTrigger value="airforce" className="text-white data-[state=active]:bg-cyan-600">
              Air Force
            </TabsTrigger>
            <TabsTrigger value="intelligence" className="text-white data-[state=active]:bg-purple-600">
              Intel
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <IntelligenceMap />
              <ThreatMonitor />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ForceOverview force="army" />
              <ForceOverview force="navy" />
              <ForceOverview force="airforce" />
            </div>
          </TabsContent>

          <TabsContent value="army">
            <OperationsCenter force="army" />
          </TabsContent>

          <TabsContent value="navy">
            <OperationsCenter force="navy" />
          </TabsContent>

          <TabsContent value="airforce">
            <OperationsCenter force="airforce" />
          </TabsContent>

          <TabsContent value="intelligence">
            <SecureMetrics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
