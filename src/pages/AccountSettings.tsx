import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Bell, Mail, Globe, Users, Moon } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import StudentPortfolioForm from "@/components/StudentPortfolioForm"

const AccountSettings = () => {
  return (
    <div className="min-h-screen pt-20 pb-20 md:pb-0 px-4 bg-background">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Account Settings</h1>
        
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label className="font-medium">Theme</Label>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark mode
                  </p>
                </div>
              </div>
              <ModeToggle />
            </div>
            
            <div className="space-y-4">
              {[
                { icon: Bell, label: "Push Notifications", description: "Get notified about community updates" },
                { icon: Mail, label: "Email Digest", description: "Receive weekly community highlights" },
                { icon: Users, label: "Mentions", description: "Notify when someone mentions you" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label className="font-medium">{item.label}</Label>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              {[
                { icon: Globe, label: "Public Profile", description: "Make your profile visible to everyone" },
                { icon: Users, label: "Show Statistics", description: "Display your solving statistics" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label className="font-medium">{item.label}</Label>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
      <StudentPortfolioForm/>
    </div>
  )
}

export default AccountSettings
