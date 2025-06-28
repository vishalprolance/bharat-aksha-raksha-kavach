
import { useState, useEffect } from "react";
import { Shield, Bell, Settings, User, LogOut, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
  securityLevel: string;
  onLogout: () => void;
}

const DashboardHeader = ({ securityLevel, onLogout }: DashboardHeaderProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-black/60 backdrop-blur-sm border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-orange-500" />
              <div>
                <h1 className="text-xl font-bold text-white">BHARATIYA RAKSHA NETWORK</h1>
                <p className="text-xs text-gray-400">Integrated Defense Intelligence System</p>
              </div>
            </div>
            <Badge variant="outline" className="border-orange-500 text-orange-400 bg-orange-500/10">
              {securityLevel}
            </Badge>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-white">
              <Clock className="h-4 w-4" />
              <span className="font-mono text-sm">
                {currentTime.toLocaleString('en-IN', { 
                  timeZone: 'Asia/Kolkata',
                  hour12: false 
                })} IST
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <User className="h-4 w-4" />
                <span className="ml-2">ADM.KUMAR</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-red-500/20"
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
