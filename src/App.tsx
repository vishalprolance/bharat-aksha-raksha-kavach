
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./components/LoginPage";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState<string | undefined>();
  const [sessionTimeout, setSessionTimeout] = useState<NodeJS.Timeout | null>(null);
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Session management
  useEffect(() => {
    if (isAuthenticated) {
      // Set session timeout (30 minutes)
      const timeout = setTimeout(() => {
        handleLogout();
        setLoginError("SESSION EXPIRED - Please re-authenticate");
      }, 30 * 60 * 1000);
      
      setSessionTimeout(timeout);
      
      // Activity tracking
      const handleActivity = () => {
        setLastActivity(Date.now());
      };
      
      window.addEventListener('mousedown', handleActivity);
      window.addEventListener('keydown', handleActivity);
      window.addEventListener('scroll', handleActivity);
      
      return () => {
        if (timeout) clearTimeout(timeout);
        window.removeEventListener('mousedown', handleActivity);
        window.removeEventListener('keydown', handleActivity);
        window.removeEventListener('scroll', handleActivity);
      };
    }
  }, [isAuthenticated]);

  // Check for inactivity
  useEffect(() => {
    if (isAuthenticated) {
      const inactivityCheck = setInterval(() => {
        const inactiveTime = Date.now() - lastActivity;
        if (inactiveTime > 30 * 60 * 1000) { // 30 minutes
          handleLogout();
          setLoginError("SESSION TIMEOUT - Logged out due to inactivity");
        }
      }, 60000); // Check every minute
      
      return () => clearInterval(inactivityCheck);
    }
  }, [isAuthenticated, lastActivity]);

  const handleLogin = (credentials: { username: string; password: string; otp?: string }) => {
    console.log("Login attempt:", { username: credentials.username, hasOtp: !!credentials.otp });
    
    // Enhanced security validation
    const secureOfficerIds = [
      "ADM.KUMAR", "GEN.SINGH", "AVM.SHARMA", "VADM.PATEL", 
      "MAJ.GUPTA", "COL.VERMA", "CMDE.NAIR", "WGCDR.RAO"
    ];
    
    const validPassphrases = [
      "BHARATRAKSHA2024", "JAYHINDSECURITY", "TRIRANGADEFENSE", 
      "AKHANDBHARAT123", "VEERGUARDIAN456", "SWARAJDEFENSE789"
    ];
    
    const validOtps = ["123456", "789012", "456789", "234567"];

    // Step 1: Credential validation
    if (!credentials.otp) {
      if (!secureOfficerIds.includes(credentials.username) || 
          !validPassphrases.includes(credentials.password)) {
        setLoginError("INVALID CREDENTIALS - ACCESS DENIED");
        console.log("Authentication failed: Invalid credentials");
        return;
      }
      // Don't authenticate yet, wait for OTP
      return;
    }
    
    // Step 2: OTP validation
    if (!validOtps.includes(credentials.otp)) {
      setLoginError("INVALID OTP - TWO-FACTOR AUTHENTICATION FAILED");
      console.log("Authentication failed: Invalid OTP");
      return;
    }
    
    // Success
    setIsAuthenticated(true);
    setLoginError(undefined);
    console.log("Authentication successful for:", credentials.username);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginError(undefined);
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
      setSessionTimeout(null);
    }
    console.log("User logged out");
  };

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <LoginPage onLogin={handleLogin} loginError={loginError} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index onLogout={handleLogout} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
