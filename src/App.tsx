import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import Auth from "./pages/Auth";
import LoanOffers from "./pages/LoanOffers";
import PaymentPlanner from "./pages/PaymentPlanner";
import DataUpload from "./pages/DataUpload";
import NotFound from "./pages/NotFound";
import AIPoweredScoring from "./pages/AIPoweredScoring";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/ai" element={<AIPoweredScoring />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/offers" element={<LoanOffers />} />
          <Route path="/planner" element={<PaymentPlanner />} />
          <Route path="/upload" element={<DataUpload />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
