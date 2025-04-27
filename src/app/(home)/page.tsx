"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { blogPosts } from "./blog/data";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Image from "next/image";

// Sample data for upcoming events calendar
const upcomingEvents = [
  {
    id: 1,
    title: "AI Workshop: Don't Be Skynet",
    date: "Every Thursday",
    time: "1:40 PM",
    location: "NCIT, Sofware Department, 702",
    description: "Explore the ethical implications of AI development...",
    category: "Meeting",
    color: "bg-orange-200",
    month: "Regular",
    easterEgg: "I'll be back... with more AI ethics!",
  },
  {
    id: 2,
    title: "Coming Soon",
    date: "Coming Soon",
    time: "Coming Soon",
    location: "Coming Soon",
    description: "Coming Soon",
    category: "Workshop",
    color: "bg-blue-200",
    month: "Coming Soon",
  },
];

// GitHub Projects data
const githubProjects = [
  {
    id: 1,
    name: "Speak Up!",
    description: "A sign Language Translator that helps bridge communication gaps.",
    repoUrl: "https://github.com/Aiconic-Club",
    stars: 42,
    forks: 12,
    language: "Python",
    languageColor: "bg-blue-500",
    owner: "AI-Conic Club",
    avatar: "https://github.com/github.png", // Placeholder
    demoUrl: "#",
    preview: "/globe.svg",
  },
  {
    id: 2,
    name: "Plant Disease Detector",
    description: "An AI model that identifies plant diseases from images.",
    repoUrl: "https://github.com/Aiconic-Club",
    stars: 87,
    forks: 23,
    language: "Python",
    languageColor: "bg-yellow-400",
    owner: "AI-Conic Club",
    avatar: "https://github.com/github.png", // Placeholder
    demoUrl: "#",
    preview: "/file.svg",
  },
  {
    id: 3,
    name: "Driver Drowsiness Detection",
    description: "A system that detects driver fatigue using computer vision.",
    repoUrl: "https://github.com/Aiconic-Club",
    stars: 156,
    forks: 45,
    language: "Python",
    languageColor: "bg-orange-500",
    owner: "AI-Conic Club",
    avatar: "https://github.com/github.png", // Placeholder
    demoUrl: "#",
    preview: "/next.svg",
  },
  {
    id: 4,
    name: "Fake News Detector",
    description: "An AI model that identifies fake news articles.",
    repoUrl: "https://github.com/Aiconic-Club",
    stars: 63,
    forks: 18,
    language: "Python",
    languageColor: "bg-blue-600",
    owner: "AI-Conic Club",
    avatar: "https://github.com/github.png", // Placeholder
    demoUrl: "#",
    preview: "/window.svg",
  },
];

// Carousel data
const carouselItems = [
  {
    id: 1,
    title: "Join Our Community",
    description: "Connect with AI enthusiasts, share knowledge, and grow together. We're basically the Avengers, but for AI.",
    buttonText: "Join Discord",
    buttonLink: "/contact",
    imageUrl: "/images/IMG_1039.jpg",
    bgColor: "bg-blue-300",
    easterEgg: "If you click me 3 times, I'll show you something cool!"
  },
  {
    id: 2,
    title: "Latest AI Workshops",
    description: "Hands-on learning experiences led by industry experts. No, we don't teach how to create Ultron.",
    buttonText: "View Schedule",
    buttonLink: "/events",
    imageUrl: "/images/members.jpg",
    bgColor: "bg-green-300"
  }
];

// Spotify Playlists data
const spotifyPlaylists = [
  {
    id: 1,
    title: "Our Favorites",
    creator: "AI-Conic Club",
    description: "The perfect background tracks for late-night debugging sessions.",
    coverImage: "https://i.scdn.co/image/ab67706c0000da84c1bdd8296ba60a0c1a0dee2b",
    embedUrl: "https://open.spotify.com/embed/playlist/1ulenl9nthj3lvC1P9cUdC?utm_source=generator",
  },
];

// Konami code sequence
const konamiCode = [
  'ArrowUp', 'ArrowUp', 
  'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 
  'ArrowLeft', 'ArrowRight', 
  'b', 'a'
];

export default function Home() {
  // Slice recent blog posts for preview
  const recentBlogPosts = blogPosts.slice(0, 3);
  
  // State for Easter eggs
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [konamiActivated, setKonamiActivated] = useState(false);
  
  // Handle Easter egg click
  const handleEasterEggClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount >= 3) {
      setShowEasterEgg(true);
      setTimeout(() => {
        setShowEasterEgg(false);
        setClickCount(0);
      }, 3000);
    }
  };
  
  // Handle Konami code
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === konamiCode[konamiIndex]) {
      const nextIndex = konamiIndex + 1;
      setKonamiIndex(nextIndex);
      
      if (nextIndex === konamiCode.length) {
        setKonamiActivated(true);
        setKonamiIndex(0);
        
        // Reset after 5 seconds
        setTimeout(() => {
          setKonamiActivated(false);
        }, 5000);
      }
    } else {
      setKonamiIndex(0);
    }
  };
  
  // Add event listener for Konami code
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeyDown);
  }
  
  return (
    <div className="container mx-auto p-8">
      {/* Hidden Easter Egg message */}
      {showEasterEgg && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="bg-yellow-300 p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg text-center transform animate-bounce">
            <h2 className="text-3xl font-bold mb-2">Easter Egg Found!</h2>
            <p className="text-xl">You found the secret! As Morpheus would say: `&quot`You take the blue pill... the story ends. You take the red pill... you stay in Wonderland, and I show you how deep the rabbit hole goes.`&quot`</p>
          </div>
        </div>
      )}
      
      {/* Konami Code Easter Egg */}
      {konamiActivated && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="bg-green-300 p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg text-center transform animate-pulse">
            <h2 className="text-3xl font-bold mb-2">⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️🅱️🅰️</h2>
            <p className="text-xl">Konami Code Activated! You`&apos`ve unlocked infinite Aura! (Or just this popup...)</p>
            <div className="mt-4 text-6xl">👾</div>
          </div>
        </div>
      )}

      {/* Hero Carousel Section */}
      <div className="mb-16 relative">
        <Carousel className="w-full">
          <CarouselContent>
            {carouselItems.map((item) => (
              <CarouselItem key={item.id}>
                <div className={`${item.bgColor} p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg relative overflow-hidden`}>
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 z-10 mb-6 md:mb-0">
                      <h2 className="text-4xl md:text-6xl font-bold mb-4" onClick={item.id === 1 ? handleEasterEggClick : undefined}>
                        {item.title}
                      </h2>
                      <p className="text-xl md:text-2xl mb-8">{item.description}</p>
                      <Button 
                        variant="default" 
                        className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg px-8 py-6 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                        asChild
                      >
                        <Link href={item.buttonLink}>{item.buttonText}</Link>
                      </Button>
                      {item.easterEgg && clickCount > 0 && (
                        <p className="mt-2 text-sm text-black font-medium">
                          {3 - clickCount} more clicks to go...
                        </p>
                      )}
                    </div>
                    <div className="md:w-1/2 relative md:absolute md:right-0 md:top-0 md:bottom-0">
                      <Image 
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover md:absolute md:right-0 md:top-0 md:rounded-l-lg border-4 border-black md:h-full"
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-4">
            <CarouselPrevious className="relative inset-0 translate-y-0 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all" />
            <CarouselNext className="relative inset-0 translate-y-0 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all" />
          </div>
        </Carousel>
      </div>

      {/* Features Section */}
      <h2 className="text-3xl font-bold mb-8 border-b-4 border-black pb-2">Why Join Our AI Club?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="bg-cyan-300 p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg hover:translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
          <h3 className="text-2xl font-bold mb-4">Learn</h3>
          <p className="mb-4">Access cutting-edge AI workshops, tutorials, and resources to boost your knowledge. No blue pills required.</p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="mt-2 text-xs underline cursor-help">Secret feature</div>
              </TooltipTrigger>
              <TooltipContent className="bg-black text-white p-2 border-2 border-pink-500">
                Try the Konami code on this page! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Card>
        <Card className="bg-green-300 p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg hover:translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
          <h3 className="text-2xl font-bold mb-4">Connect</h3>
          <p className="mb-4">Network with AI enthusiasts, professionals, and researchers. Like LinkedIn, but without the cringe posts.</p>
        </Card>
        <Card className="bg-purple-300 p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg hover:translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
          <h3 className="text-2xl font-bold mb-4">Build</h3>
          <p className="mb-4">Collaborate on exciting AI projects and turn your ideas into reality. Jarvis not included.</p>
        </Card>
      </div>
      
      {/* Event Calendar Section */}
      <h2 className="text-3xl font-bold mb-8 border-b-4 border-black pb-2">Upcoming Events</h2>
      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className={`${event.color} p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg hover:translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all`}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{event.title}</h3>
                <Badge className="bg-black text-white border-2 border-black">{event.category}</Badge>
              </div>
              <div className="mb-4">
                <div className="flex items-center mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{event.location}</span>
                </div>
              </div>
              <p className="mb-4">{event.description}</p>
              <Button className="w-full bg-white hover:bg-black hover:text-white text-black font-bold border-2 border-black rounded-lg transition-colors">
                Register
              </Button>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button asChild className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg px-8 py-4 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </div>
      
      {/* GitHub Projects Section */}
      <h2 className="text-3xl font-bold mb-8 border-b-4 border-black pb-2">Our GitHub Projects</h2>
      <div className="mb-16">
        <Carousel className="w-full">
          <CarouselContent>
            {githubProjects.map((project) => (
              <CarouselItem key={project.id}>
                <Card className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg hover:translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <div className="flex items-center mb-4">
                    <Image src={project.avatar} alt={project.owner} className="w-10 h-10 rounded-full mr-4" />
                    <div>
                      <h3 className="text-xl font-bold">{project.name}</h3>
                      <p className="text-sm text-gray-600">by {project.owner}</p>
                    </div>
                  </div>
                  <p className="mb-4">{project.description}</p>
                  <div className="flex items-center mb-4">
                    <span className={`w-3 h-3 rounded-full ${project.languageColor} mr-2`}></span>
                    <span className="text-sm">{project.language}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{project.stars}</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 6h18M3 14h18M3 18h18" />
                      </svg>
                      <span>{project.forks}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm px-4 py-2 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                      <Link href={project.repoUrl}>View Repo</Link>
                    </Button>
                    <Button asChild className="bg-green-500 hover:bg-green-600 text-white font-bold text-sm px-4 py-2 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                      <Link href={project.demoUrl}>Live Demo</Link>
                    </Button>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-4">
            <CarouselPrevious className="relative inset-0 translate-y-0 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all" />
            <CarouselNext className="relative inset-0 translate-y-0 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all" />
          </div>
        </Carousel>
      </div>
      
      {/* Latest Blog Posts Section */}
      <h2 className="text-3xl font-bold mb-8 border-b-4 border-black pb-2">Latest from our Blog</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {recentBlogPosts.map((post, index) => (
          <Link href={`/blog/${post.slug}`} key={index} className="block h-full group">
            <Card className="h-full overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all relative">
              {index === 0 && (
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all z-10 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="text-white text-xl font-bold transform -rotate-12 px-4 py-2 bg-pink-500 border-2 border-white">
                    Trash Panda Special!
                  </span>
                </div>
              )}
              <div className="relative h-48">
                <Image 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-full object-cover border-b-4 border-black"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-yellow-300 text-black font-medium border-2 border-black">
                    {post.categories[0]}
                  </Badge>
                </div>
              </div>
              <div className="p-6 bg-yellow-100">
                <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-gray-700 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold">By {post.author}</span>
                  <span className="text-sm">{post.date}</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mb-16">
        <Button asChild className="bg-blue-300 hover:bg-blue-400 text-black font-bold text-lg px-8 py-4 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
          <Link href="/blog">Read More Articles</Link>
        </Button>

      </div>
            {/* Spotify Playlists Section */}
            <h2 className="text-3xl font-bold mb-8 border-b-4 border-black pb-2">Spotify Playlists</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {spotifyPlaylists.map((playlist) => (
          <Card key={playlist.id} className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg hover:translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
            <div className="flex items-center mb-4">
              <Image src={playlist.coverImage} alt={playlist.title} className="w-16 h-16 rounded-lg mr-4" />
              <div>
                <h3 className="text-xl font-bold">{playlist.title}</h3>
                <p className="text-sm text-gray-600">by {playlist.creator}</p>
              </div>
            </div>
            <p className="mb-4">{playlist.description}</p>
            <iframe 
              src={playlist.embedUrl} 
              width="100%" 
              height="100" 
              frameBorder="0"  
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
            ></iframe>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm">{playlist.trackCount} tracks</span>
              <span className="text-sm">{playlist.duration}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <div className="bg-yellow-300 p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg mb-16 relative overflow-hidden">
        <div className="text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Ready to Join the AI Revolution?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Join our vibrant community today and be part of shaping the future of artificial intelligence. We promise not to build Skynet.</p>
          <Button 
            variant="default" 
            className="bg-black hover:bg-pink-500 hover:text-black text-white font-bold text-lg px-12 py-6 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
            asChild
          >
            <Link href="/contact">Get Involved</Link>
          </Button>
        </div>
        
        {/* Hidden R2-D2 Easter Egg */}
        <div className="absolute bottom-0 right-0 transform translate-y-2/3 opacity-20 hover:opacity-100 hover:translate-y-0 transition-all duration-500 cursor-pointer">
          <div className="text-8xl">🤖</div>
        </div>
      </div>
      
      {/* Secret Badge */}
      <div className="fixed bottom-4 right-4 text-xs bg-black text-white p-2 rounded-full opacity-20 hover:opacity-100 transition-all duration-300">
        Powered by ZA WARDO!!!!!
      </div>
    </div>
  );
}