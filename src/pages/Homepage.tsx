
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Briefcase, BookOpen, Code } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';

import 'swiper/css';

import { Pagination } from 'swiper/modules';

const Index = () => {
  const teams = [
    {
      name:"Development Team",size:3},{
      name:"AI/ML Team",size:2
    },
    {
      name:"Desing Team",
      size:4
    },
    {
      name:"Research Team",size:6
    }
  ]

  return (
    <div className="min-h-screen pt-20 pb-20 md:pb-0 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Welcome to CS Department Club</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our vibrant community of tech enthusiasts, developers, and innovators.
            Together, we learn, create, and grow.
          </p>
        </section>
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
          <CardContent className="">
          <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          pagination={true}
          navigation={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Pagination]}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          breakpoints={{
            576: {
              width: 576,
              slidesPerView: 1,
            },
            768: {
              width: 768,
              slidesPerView: 2,
            },
              1024: {
                slidesPerView: 3,
              }
          }}
        >
          {
            [
              {
                title: "Web Development Workshop",
                date: "March 15, 2024",
                description: "Learn modern web development with React"
              },
              {
                title: "Hackathon 2024",
                date: "April 1-2, 2024",
                description: "48-hour coding challenge"
              },
              {
                title: "Tech Talk Series",
                date: "March 20, 2024",
                description: "Industry experts share their experiences"
              }

            ].map((event,index)=>(
              <SwiperSlide>
                <Card key={index}>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2 text-foreground ">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                    <p className="text-sm text-foreground">{event.description}</p>
                  </CardContent>
                </Card>
              </SwiperSlide>

            ))
          }
        </Swiper>
        </CardContent>
        </Card>
      </section>

        

        {/* Our Teams */}
        <section>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                <CardTitle >Our Teams</CardTitle>
              </div>
              <CardDescription>Meet our dedicated teams working on various domains</CardDescription>
            </CardHeader>
            <CardContent className="">
            <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          pagination={true}
          navigation={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          modules={[Pagination]}
          breakpoints={{
            576: {
              width: 576,
              slidesPerView: 1,
            },
            768: {
              width: 768,
              slidesPerView: 2,
            },
              1024: {
                slidesPerView: 3,
              }
          }}
        >
          {
            teams.map((team,index)=>(
                  <SwiperSlide className="pb-10">
                    <Card className="cursor-pointer hover:bg-accent transition-colors">
                      <CardContent className="pt-6" key={index}>
                        <h3 className="font-semibold mb-2 text-foreground">{team.name}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{team.size} Members</p>
                        <p className="text-sm text-foreground">Click to view team</p>
                      </CardContent>
                    </Card>
                    </SwiperSlide>
            ))
          }
                    </Swiper>
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
            <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          pagination={true}
          navigation={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          modules={[Pagination]}
          breakpoints={{
            576: {
              width: 576,
              slidesPerView: 1,
            },
            768: {
              width: 768,
              slidesPerView: 2,
            },
              1024: {
                slidesPerView: 3,
              }
          }}
        >
            <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Getting Started with React",
                  author: "John Doe",
                  date: "March 1, 2024"
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
                <SwiperSlide>
                <Card key={index}>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2 text-foreground">{blog.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">By {blog.author}</p>
                    <p className="text-sm text-muted-foreground">{blog.date}</p>
                  </CardContent>
                </Card>
                </SwiperSlide>
              ))}
            </CardContent>
            </Swiper>
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
            <CardContent className="">
            <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          pagination={true}
          navigation={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          modules={[Pagination]}
          breakpoints={{
            576: {
              width: 576,
              slidesPerView: 1,
            },
            768: {
              width: 768,
              slidesPerView: 2,
            },
              1024: {
                slidesPerView: 3,
              }
          }}
        >
              {[
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
                <SwiperSlide>
                <Card key={index}>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2 text-foreground">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{project.tech}</p>
                    <p className="text-sm text-foreground">{project.status}</p>
                  </CardContent>
                </Card>
                </SwiperSlide>
              ))}
              </Swiper>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Index;