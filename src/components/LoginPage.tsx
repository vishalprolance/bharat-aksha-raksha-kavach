
import { useState } from "react";
import { Shield, Lock, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface LoginPageProps {
  onLogin: (credentials: { username: string; password: string }) => void;
  loginError?: string;
}

const LoginPage = ({ onLogin, loginError }: LoginPageProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      onLogin({ username, password });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      {/* Security Alert Bar */}
      <div className="fixed top-0 w-full bg-red-600 text-white py-2 px-4 text-center font-semibold z-50">
        <div className="flex items-center justify-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          RESTRICTED ACCESS - BHARATIYA RAKSHA NETWORK - AUTHORIZED PERSONNEL ONLY
        </div>
      </div>

      <div className="w-full max-w-md mt-12">
        <Card className="bg-black/60 backdrop-blur-sm border-orange-500/50 text-white">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <Shield className="h-16 w-16 text-orange-500" />
                <Lock className="h-6 w-6 text-orange-400 absolute -bottom-1 -right-1" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-orange-400">
                BHARATIYA RAKSHA NETWORK
              </CardTitle>
              <p className="text-sm text-gray-400 mt-2">
                Integrated Defense Intelligence System
              </p>
              <Badge variant="outline" className="border-red-500 text-red-400 bg-red-500/10 mt-3">
                CLASSIFIED ACCESS
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300">
                  Officer ID
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your Officer ID"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-black/40 border-gray-600 text-white placeholder:text-gray-500 focus:border-orange-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Security Code
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your security code"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-black/40 border-gray-600 text-white placeholder:text-gray-500 focus:border-orange-500 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {loginError && (
                <div className="bg-red-500/20 border border-red-500 rounded-md p-3">
                  <p className="text-red-400 text-sm font-medium">{loginError}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    AUTHENTICATING...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    SECURE ACCESS
                  </div>
                )}
              </Button>
            </form>

            <div className="text-center space-y-2">
              <p className="text-xs text-gray-500">
                All access attempts are monitored and logged
              </p>
              <p className="text-xs text-red-400">
                Unauthorized access is a criminal offense
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            Demo Credentials: Username: <span className="text-orange-400">ADM.KUMAR</span> | 
            Password: <span className="text-orange-400">BHARATRAKSHA2024</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
