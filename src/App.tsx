import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MobileNav from "./components/MobileNav";
import DesktopNav from "./components/DesktopNav";
import Homepage from "./pages/Homepage";
import AccountSettings from "./pages/AccountSettings";
import StudentPortfolios from "./pages/StudentPortfolios";
import { ThemeProvider } from "./components/theme-provider";
import Notices from "./pages/Notices";
import Classroom from "./pages/Classroom";
import Chat from "./pages/Chat";
import ChatRoom from "./pages/ChatRoom";
import ChatWelcome from "./pages/ChatWelcome";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegisterationPage";
const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <DesktopNav />
          <MobileNav />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/chat" element={<Chat />}>
              <Route index element={<ChatWelcome />} />
              <Route path=":id" element={<ChatRoom />} />
            </Route>
            <Route path="/portfolios" element={<StudentPortfolios />} />
            <Route path="/classroom" element={<Classroom />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/settings" element={<AccountSettings />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
)
export default App;