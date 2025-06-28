
import { useState } from "react";
import { Shield, Lock, Eye, EyeOff, AlertTriangle, KeyRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface LoginPageProps {
  onLogin: (credentials: { username: string; password: string; otp?: string }) => void;
  loginError?: string;
}

const LoginPage = ({ onLogin, loginError }: LoginPageProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      return;
    }

    if (!username || !password) {
      return;
    }

    setIsLoading(true);
    
    // Simulate credential verification
    setTimeout(() => {
      // In real implementation, this would validate against secure database
      if (username.length >= 6 && password.length >= 12) {
        setStep('otp');
        setIsLoading(false);
      } else {
        const newFailedAttempts = failedAttempts + 1;
        setFailedAttempts(newFailedAttempts);
        
        if (newFailedAttempts >= 3) {
          setIsLocked(true);
          setLockoutTime(300); // 5 minutes lockout
          
          const lockoutTimer = setInterval(() => {
            setLockoutTime((prev) => {
              if (prev <= 1) {
                setIsLocked(false);
                setFailedAttempts(0);
                clearInterval(lockoutTimer);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        }
        
        onLogin({ username, password });
        setIsLoading(false);
      }
    }, 2000);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      return;
    }

    setIsLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      onLogin({ username, password, otp });
      setIsLoading(false);
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      {/* Enhanced Security Alert Bar */}
      <div className="fixed top-0 w-full bg-red-600 text-white py-2 px-4 text-center font-semibold z-50">
        <div className="flex items-center justify-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          TOP SECRET - BHARATIYA RAKSHA NETWORK - MULTI-FACTOR AUTHENTICATION REQUIRED
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
                Multi-Factor Authentication System
              </p>
              <Badge variant="outline" className="border-red-500 text-red-400 bg-red-500/10 mt-3">
                {step === 'credentials' ? 'CREDENTIAL VERIFICATION' : 'OTP VERIFICATION'}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === 'credentials' ? (
              <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-300">
                    Officer Identification Code
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter secure officer ID"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-black/40 border-gray-600 text-white placeholder:text-gray-500 focus:border-orange-500"
                    required
                    minLength={6}
                    disabled={isLocked}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">
                    Classified Security Passphrase
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter classified passphrase"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-black/40 border-gray-600 text-white placeholder:text-gray-500 focus:border-orange-500 pr-10"
                      required
                      minLength={12}
                      disabled={isLocked}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLocked}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                {isLocked && (
                  <div className="bg-red-500/20 border border-red-500 rounded-md p-3">
                    <p className="text-red-400 text-sm font-medium">
                      SECURITY LOCKOUT ACTIVE - Retry in {formatTime(lockoutTime)}
                    </p>
                  </div>
                )}

                {loginError && !isLocked && (
                  <div className="bg-red-500/20 border border-red-500 rounded-md p-3">
                    <p className="text-red-400 text-sm font-medium">{loginError}</p>
                    {failedAttempts > 0 && (
                      <p className="text-red-300 text-xs mt-1">
                        Warning: {failedAttempts}/3 failed attempts
                      </p>
                    )}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3"
                  disabled={isLoading || isLocked}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      VERIFYING CREDENTIALS...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      VERIFY CREDENTIALS
                    </div>
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div className="space-y-4 text-center">
                  <div className="flex justify-center">
                    <KeyRound className="h-12 w-12 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-orange-400">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-400 mt-2">
                      Enter the 6-digit OTP from your secure authenticator
                    </p>
                  </div>
                  
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={(value) => setOtp(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} className="bg-black/40 border-gray-600 text-white" />
                        <InputOTPSlot index={1} className="bg-black/40 border-gray-600 text-white" />
                        <InputOTPSlot index={2} className="bg-black/40 border-gray-600 text-white" />
                        <InputOTPSlot index={3} className="bg-black/40 border-gray-600 text-white" />
                        <InputOTPSlot index={4} className="bg-black/40 border-gray-600 text-white" />
                        <InputOTPSlot index={5} className="bg-black/40 border-gray-600 text-white" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>

                {loginError && (
                  <div className="bg-red-500/20 border border-red-500 rounded-md p-3">
                    <p className="text-red-400 text-sm font-medium">{loginError}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3"
                    disabled={isLoading || otp.length !== 6}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        VERIFYING OTP...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <KeyRound className="h-4 w-4" />
                        VERIFY & ACCESS
                      </div>
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full text-gray-400 hover:text-white"
                    onClick={() => {
                      setStep('credentials');
                      setOtp('');
                    }}
                  >
                    ← Back to Credentials
                  </Button>
                </div>
              </form>
            )}

            <div className="text-center space-y-2">
              <p className="text-xs text-gray-500">
                All access attempts are monitored and logged
              </p>
              <p className="text-xs text-red-400">
                Unauthorized access attempts will be prosecuted
              </p>
              <p className="text-xs text-yellow-400">
                Session timeout: 30 minutes of inactivity
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
