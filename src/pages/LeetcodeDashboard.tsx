import { Outlet } from "react-router-dom";
import { Trophy, Star, Sparkle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const LeetcodeDashboard = () => {
  const topUsers = [
    { id: 1, name: "John Doe", score: 2500, solved: 450, streak: 15, efficiency: 92 },
    { id: 2, name: "Jane Smith", score: 2350, solved: 425, streak: 12, efficiency: 88 },
    { id: 3, name: "Alex Johnson", score: 2200, solved: 400, streak: 10, efficiency: 85 },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20 md:pb-0 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">LeetCode Community</h1>
            <p className="text-muted-foreground">Connect with fellow LeetCode enthusiasts and track progress.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          <div className="space-y-8">
            <div className="bg-background rounded-lg shadow p-6">
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Top Contributors</h2>
              </div>
              <div className="space-y-6">
                {topUsers.map((user, index) => (
                  <div key={user.id} className="bg-muted rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold text-muted-foreground">#{index + 1}</span>
                        <span className="font-medium">{user.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{user.score}</span>
                      </div>
                    </div>
                    <div className="space-y-2 relative z-0">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Problems Solved</span>
                        <span>{user.solved}</span>
                      </div>
                      <Progress value={user.efficiency} className="h-2" />
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Sparkle className="h-4 w-4 text-accent" />
                          <span>{user.streak} day streak</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{user.efficiency}% efficiency</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LeetcodeDashboard;