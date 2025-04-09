import { Home, School, BookOpen, Bell, MessageCircle, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";

const DesktopNav = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: School, label: "Classroom", path: "/classroom" },
    { icon: BookOpen, label: "Portfolios", path: "/portfolios" },
    { icon: Bell, label: "Notices", path: "/notices" },
    { icon: MessageCircle, label: "Chat", path: "/chat" },
    { icon: Settings, label: "Settings", path: "/settings" },
    
  ];

  return (
    <nav className="hidden md:block fixed top-0 left-0 right-0 bg-background border-b border-border z-50 pt-[env(safe-area-inset-top)] px-[env(safe-area-inset-right)] px-[env(safe-area-inset-left)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex space-x-8">
              {navItems.map(({ icon: Icon, label, path }) => {
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium",
                      isActive
                        ? "bg-secondary text-secondary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DesktopNav;