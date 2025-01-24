import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Briefcase, BookOpen, Code } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import LeetcodeDashboard from "./LeetcodeDashboard";
import Logo from "@/images/a.png"

const Index = () => {
  const teamMembers = {
    "Development Team": [
      { name: "John Smith", role: "Lead Developer", expertise: "Full Stack" },
      { name: "Sarah Johnson", role: "Frontend Developer", expertise: "React/TypeScript" },
      { name: "Mike Chen", role: "Backend Developer", expertise: "Node.js/Python" },
      { name: "Mike Chen", role: "Backend Developer", expertise: "Node.js/Python" },
      { name: "Mike Chen", role: "Backend Developer", expertise: "Node.js/Python" },
      { name: "Mike Chen", role: "Backend Developer", expertise: "Node.js/Python" },
      { name: "Mike Chen", role: "Backend Developer", expertise: "Node.js/Python" },
      { name: "Mike Chen", role: "Backend Developer", expertise: "Node.js/Python" },
      { name: "Mike Chen", role: "Backend Developer", expertise: "Node.js/Python" },
      { name: "Mike Chen", role: "Backend Developer", expertise: "Node.js/Python" },
      { name: "Emma Davis", role: "Mobile Developer", expertise: "React Native" }
    ],
    "AI/ML Team": [
      { name: "Dr. Alex Kumar", role: "ML Lead", expertise: "Deep Learning" },
      { name: "Lisa Wang", role: "Data Scientist", expertise: "NLP" },
      { name: "James Wilson", role: "AI Engineer", expertise: "Computer Vision" }
    ],
    "Design Team": [
      { name: "Maria Garcia", role: "UI/UX Lead", expertise: "User Research" },
      { name: "David Kim", role: "Product Designer", expertise: "Interface Design" }
    ],
    "Design ": [
      { name: "Maria Garcia", role: "UI/UX Lead", expertise: "User Research" },
      { name: "David Kim", role: "Product Designer", expertise: "Interface Design" }
    ],
    "Research Team": [
      { name: "Dr. Rachel Brown", role: "Research Lead", expertise: "Algorithms" },
      { name: "Tom Anderson", role: "Research Engineer", expertise: "Distributed Systems" }
    ]
  };

  return (
    <div className="min-h-screen pt-20 pb-20 md:pb-0 px-4 flex justify-center items-center   ">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Welcome to CS Department Club</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our vibrant community of tech enthusiasts, developers, and innovators.
            Together, we learn, create, and grow.
          </p>
        </section>
       


        {/* Add Community/Leaderboard section */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <div className="flex flex-col items-center justify-center order-1 md:order-1 w-full md:w-1/2 md:h-[500px]">
            <img src={Logo} className="h-96 w-96" alt="Logo" />
          </div>
          
          <section className="w-full md:w-1/2 jus order-1 md:order-2">
            <div className="h-[500px] overflow-y-auto">
              <LeetcodeDashboard />
            </div>
          </section>
        </div>

        {/* Upcoming Events */}
        <section>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-primary" />
                <CardTitle>Upcoming Events</CardTitle>
              </div>
              <CardDescription>Join our latest workshops and meetups</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto md:overflow-x-auto">
              <div className="flex flex-col md:flex-row gap-4 md:min-w-max">
                {[
                  {
                    title: "Web Development Workshop",
                    date: "March 15, 2024",
                    description: "Learn modern web development with React"
                  },
                  {
                    title: "Web Development Workshop",
                    date: "March 15, 2024",
                    description: "Learn modern web development with React"
                  },
                  {
                    title: "Web Development Workshop",
                    date: "March 15, 2024",
                    description: "Learn modern web development with React"
                  },
                  {
                    title: "Web Development Workshop",
                    date: "March 15, 2024",
                    description: "Learn modern web development with React"
                  },
                  {
                    title: "Web Development Workshop",
                    date: "March 15, 2024",
                    description: "Learn modern web development with React"
                  },
             
                  {
                    title: "Tech Talk Series",
                    date: "March 20, 2024",
                    description: "Industry experts share their experiences"
                  }
                ].map((event, index) => (
                  <Card key={index} className="w-full md:w-[300px] md:flex-shrink-0">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2 text-foreground">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mb-1">{event.date}</p>
                      <p className="text-sm text-foreground">{event.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Our Teams */}
        <section>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                <CardTitle>Our Teams</CardTitle>
              </div>
              <CardDescription>Meet our dedicated teams working on various domains</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto md:overflow-x-auto">
              <div className="flex flex-col md:flex-row gap-4 md:min-w-max">
                {Object.entries(teamMembers).map(([teamName, members], index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <Card className="cursor-pointer hover:bg-accent transition-colors w-full md:w-[300px] md:flex-shrink-0">
                        <CardContent className="pt-6">
                          <h3 className="font-semibold mb-2 text-foreground">{teamName}</h3>
                          <p className="text-sm text-muted-foreground mb-1">{members.length} Members</p>
                          <p className="text-sm text-foreground">Click to view team</p>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="text-foreground">{teamName}</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        {members.map((member, memberIndex) => (
                          <div key={memberIndex} className="p-4 rounded-lg bg-accent">
                            <h4 className="font-semibold text-foreground">{member.name}</h4>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                            <p className="text-sm text-muted-foreground">{member.expertise}</p>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Internship Program */}
        <section>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-primary" />
                <CardTitle>Internship Program</CardTitle>
              </div>
              <CardDescription>Opportunities for hands-on experience</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-foreground">Current Openings</h3>
                <ul className="space-y-2 text-foreground">
                  <li className="text-sm">• Frontend Development Intern</li>
                  <li className="text-sm">• Machine Learning Research Intern</li>
                  <li className="text-sm">• UI/UX Design Intern</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-foreground">Program Benefits</h3>
                <ul className="space-y-2 text-foreground">
                  <li className="text-sm">• Real-world project experience</li>
                  <li className="text-sm">• Mentorship from industry experts</li>
                  <li className="text-sm">• Certificate of completion</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Latest Blogs */}
        <section>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <CardTitle>Latest Blogs</CardTitle>
              </div>
              <CardDescription>Technical insights and experiences shared by our members</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto md:overflow-x-auto">
              <div className="flex flex-col md:flex-row gap-4 md:min-w-max">
                {[
                  {
                    title: "Getting Started with React",
                    author: "John Doe",
                    date: "March 10, 2024",
                    description: "A beginner's guide to React development"
                  },
                  {
                    title: "Machine Learning Basics",
                    author: "Jane Smith",
                    date: "February 28, 2024"
                  },
                  {
                    title: "Machine Learning Basics",
                    author: "Jane Smith",
                    date: "February 28, 2024"
                  },
                  {
                    title: "Machine Learning Basics",
                    author: "Jane Smith",
                    date: "February 28, 2024"
                  },
                  {
                    title: "Machine Learning Basics",
                    author: "Jane Smith",
                    date: "February 28, 2024"
                  },
                  {
                    title: "UI Design Principles",
                    author: "Mike Johnson",
                    date: "February 25, 2024"
                  }
                ].map((blog, index) => (
                  <Card key={index} className="w-full md:w-[300px] md:flex-shrink-0">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2 text-foreground">{blog.title}</h3>
                      <p className="text-sm text-muted-foreground mb-1">By {blog.author}</p>
                      <p className="text-sm text-muted-foreground">{blog.date}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Featured Projects */}
        <section>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Code className="h-6 w-6 text-primary" />
                <CardTitle>Featured Projects</CardTitle>
              </div>
              <CardDescription>Innovative projects developed by our teams</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto md:overflow-x-auto">
              <div className="flex flex-col md:flex-row gap-4 md:min-w-max">
                {[
                  {
                    title: "E-commerce Platform",
                    tech: "Next.js, TypeScript",
                    description: "A modern e-commerce solution"
                  },
                  {
                    title: "Smart Campus App",
                    tech: "React Native, Node.js",
                    status: "In Development"
                  },
                  {
                    title: "AI Study Assistant",
                    tech: "Python, TensorFlow",
                    status: "Completed"
                  },
                  {
                    title: "Virtual Lab Platform",
                    tech: "React, Django",
                    status: "Beta Testing"
                  }
                ].map((project, index) => (
                  <Card key={index} className="w-full md:w-[300px] md:flex-shrink-0">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2 text-foreground">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mb-1">{project.tech}</p>
                      <p className="text-sm text-foreground">{project.status}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Index;