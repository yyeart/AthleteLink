import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProtectedProfile from "./pages/ProtectedProfile";
import ProfileStats from "./pages/ProfileStats";
import PublicProfile from "./pages/PublicProfile";
import Requests from "./pages/Requests";
import Settings from "./pages/Settings";
import FindRequests from "./pages/FindRequests";
import RequestData from "./pages/RequestData";
import CreateRequest from "./pages/CreateRequest";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:username/profile" element={<Profile />} />
          <Route path="/profile" element={<ProtectedProfile />} />
          <Route path="/stats" element={<ProfileStats />} />
          <Route path="/public-profile" element={<PublicProfile />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/find-requests" element={<FindRequests />} />
          <Route path="/request-data" element={<RequestData />} />
          <Route path="/create-request" element={<CreateRequest />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
