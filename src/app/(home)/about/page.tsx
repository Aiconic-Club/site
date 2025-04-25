"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

// Define interfaces and types
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  quote: string;
  socialLinks: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    instagram?: string;
  };
  matrixEasterEgg?: boolean;
  easterEgg?: boolean;
}

// Define Star type
type Star = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
};

// Team members data
const teamMembers: TeamMember[] = [
  {
    name: "Rishi K. Marseni",
    role: "Advisor",
    bio: "He helped AI-Conic Club to create a community where AI enthusiasts could learn and grow together. Some say he speaks binary in his sleep.",
    image: "/team/rishi.png",
    socialLinks: {
      twitter: "https://twitter.com/",
      linkedin: "https://linkedin.com/in/",
      github: "https://github.com/"
    },
    quote: "I'm not building Skynet, I promise. Maybe.",
    matrixEasterEgg: true
  },
  {
    name: "Kapil Singh Dhami",
    role: "Meme-ber",
    bio: "With a background in machine learning and software engineering, Kapil ensures our technical workshops are cutting-edge and accessible. He sleeps on a sleeping bags though.",
    image: "/team/marcus.png",
    socialLinks: {
      twitter: "https://twitter.com/index",
      linkedin: "https://linkedin.com/in/index",
      github: "https://github.com/index"
    },
    quote: "The second rule of AI Club is: you do not let the AI access the nuclear codes.",
    matrixEasterEgg: true
  },
  {
    name: "Anurodh Kanth",
    role: "Community Manager",
    bio: "Bro ges our community programs and events. With a background in community building and AI ethics, he ensures AI-Conic Club remains an inclusive space for learning. His collection of AI memes is unrivaled in the known universe.",
    image: "/team/anurodh.png",
    socialLinks: {
      twitter: "https://twitter.com/index",
      linkedin: "https://linkedin.com/in/index",
      instagram: "https://instagram.com/index"
    },
    quote: "If your neural network starts asking existential questions, unplug it and walk away slowly.",
    matrixEasterEgg: true
  },
  {
    name: "Rasul Ghatane",
    role: "Time Lord",
    bio: "Rasul leads our programs and curriculum development, he makes complex AI concepts accessible to all. He once trained an AI to write poetry in iambic pentameter... about cats.",
    image: "/team/rasul.png",
    socialLinks: {
      twitter: "https://twitter.com/",
      linkedin: "https://linkedin.com/in/",
      github: "https://github.com/"
    },
    quote: "I don't always train neural networks, but when I do, I make them watch Doctor Who first.",
    matrixEasterEgg: true
  },
];

// FAQs data
const faqs = [
  {
    question: "What is AI-Conic Club?",
    answer: "AI-Conic Club is a community for AI enthusiasts, beginners and experts alike. We host workshops, talks, hackathons, and social events focused on artificial intelligence and machine learning. We're like the Avengers, but for AI - and with fewer alien invasions."
  },
  {
    question: "Do I need to have experience with AI to join?",
    answer: "Not at all! We welcome members at all levels of expertise. Many of our events are designed for beginners, while others cater to more experienced practitioners. Whether you're just curious about AI or already building your own neural networks, there's a place for you here. Even Clippy would be welcome."
  },
  {
    question: "How much does membership cost?",
    answer: "We don't have a formal membership structure. All of our events are open to anyone interested in AI. Some special workshops may have a small fee to cover costs, but most of our events are completely free. Just come and enjoy the community!"
  },
  {
    question: "Where are your events held?",
    answer: "We host events both virtually and in-person at various locations throughout the city. Our main physical hub is the Tech Innovation Center downtown. Check individual event listings for specific location details. We have not yet built the Holodeck, despite numerous requests."
  },
  {
    question: "How can I get involved beyond attending events?",
    answer: "We're always looking for volunteers, speakers, and workshop leaders! If you have expertise you'd like to share or just want to help out, reach out to our Community Manager. No midichlorian test required."
  },
  {
    question: "Do you offer resources for learning AI?",
    answer: "Yes! Members get access to our curated learning paths, recommended resources, and a private Discord community where you can ask questions and collaborate with others. Unfortunately, we cannot yet download knowledge directly to your brain like in The Matrix."
  },
  {
    question: "Is AI going to take over the world?",
    answer: "We're legally required to say 'no'. But just to be safe, we're teaching our AIs to be nice to humans. We have implemented the three laws of robotics, and added a fourth: 'Thou shalt not hog the WiFi bandwidth.'"
  }
];


const AboutPage = () => {
  const [secretTeamMember, setSecretTeamMember] = useState(false);
  const [konami, setKonami] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [easterEggMessage, setEasterEggMessage] = useState("");
  const [matrixMode, setMatrixMode] = useState(false);
  
  // Starfield effect
  const [stars, setStars] = useState<Star[]>([]);
  
  // Konami code
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let keys: number[] = [];
      const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // up up down down left right left right b a
      
      window.addEventListener('keydown', (e) => {
        keys.push(e.keyCode);
        
        // Keep only the last 10 keys
        if (keys.length > 10) {
          keys = keys.slice(keys.length - 10);
        }
        
        // Check if the sequence matches
        if (JSON.stringify(keys) === JSON.stringify(konamiCode)) {
          setKonami(true);
          setSecretTeamMember(true);
          
          // Generate stars
          const newStars: Star[] = [];
          for (let i = 0; i < 100; i++) {
            newStars.push({
              id: i,
              x: Math.random() * 100,
              y: Math.random() * 100,
              size: Math.random() * 3 + 1,
              opacity: Math.random() * 0.8 + 0.2,
              speed: Math.random() * 5 + 1
            });
          }
          setStars(newStars);
          
          // Reset after 15 seconds
          setTimeout(() => {
            setKonami(false);
            setStars([]);
          }, 15000);
        }

        // Matrix code - MATRIX (77, 65, 84, 82, 73, 88)
        if (e.keyCode === 77 && e.altKey && e.ctrlKey) {
          setMatrixMode(!matrixMode);
        }
      });
    }
  }, [matrixMode]);
  
  // AI Club logo click handler
  const handleLogoClick = () => {
    setClickCount(clickCount + 1);
    
    if (clickCount === 2) {
      setEasterEggMessage("You've discovered a secret! The first rule of AI-Conic Club is: you only talk about AI-Conic Club.");
      setTimeout(() => {
        setEasterEggMessage("");
        setClickCount(0);
      }, 5000);
    }
  };

  // Trek reference
  const [trekMode, setTrekMode] = useState(false);
  const handleTrekEasterEgg = () => {
    setTrekMode(true);
    setTimeout(() => setTrekMode(false), 3000);
  };
  
  return (
    <div className={`container mx-auto p-8 relative ${matrixMode ? 'matrix-mode' : ''}`}>
      {/* Stars */}
      {konami && (
        <div className="fixed inset-0 bg-black z-[-1]">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                animation: `twinkle ${star.speed}s ease-in-out infinite`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Easter egg message */}
      {easterEggMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-yellow-300 p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg text-center transform animate-bounce">
            <h2 className="text-2xl font-bold mb-2">Easter Egg Found!</h2>
            <p className="text-xl">{easterEggMessage}</p>
          </div>
        </div>
      )}
      
      {/* Matrix Rain - shown when matrix mode is on */}
      {matrixMode && (
        <div className="fixed inset-0 bg-black z-10 pointer-events-none overflow-hidden">
          <div className="matrix-rain"></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h2 className="text-green-400 text-4xl mb-4">Wake up, Neo...</h2>
            <p className="text-green-400 text-xl">Press Alt+Ctrl+M to toggle Matrix mode</p>
          </div>
        </div>
      )}
      
      {/* Trek teleport effect */}
      {trekMode && (
        <div className="fixed inset-0 bg-blue-500 bg-opacity-20 z-10 flex items-center justify-center">
          <div className="text-center teleport-effect">
            <h2 className="text-4xl font-bold text-white">Energize!</h2>
          </div>
        </div>
      )}
      
      {/* Secret Team Member */}
      {secretTeamMember && (
        <div className="fixed top-10 right-10 z-50 animate-float">
          <Card className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg max-w-xs">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-white rounded-full overflow-hidden border-4 border-black mb-4">
                <Image
                  src="/team/hal9000.png"
                  alt="HAL 9000"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-white">HAL 9000</h3>
              <p className="text-sm text-white opacity-80 mb-2">Secret AI Overlord</p>
              <p className="text-sm text-white mb-4">I&apos;m sorry Dave, I&apos;m afraid I can&apos;t let you leave this website.</p>
              <div className="flex justify-center space-x-2">
                <Badge className="bg-red-600 hover:bg-red-700">Daisy, Daisy...</Badge>
              </div>
            </div>
          </Card>
        </div>
      )}
      
      <h1 className="text-5xl font-bold mb-8 border-b-4 border-black pb-2">About AI-Conic Club</h1>
      
      {/* Hero Section */}
      <div className="bg-yellow-300 p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg mb-16 relative">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-xl mb-4">
              AI-Conic Club was founded with a simple mission: to make artificial intelligence accessible, understandable, and fun for everyone.
            </p>
            <p className="text-lg mb-4">
              We believe that AI technology shouldn`&apos;`t be locked away in research papers or limited to those with advanced degrees. Through workshops, talks, hackathons, and social events, we`&apos;`re building a community where anyone curious about AI can learn, experiment, and grow. 
            </p>
            <p className="text-lg">
              Whether you`&apos;`re a complete beginner wondering what AI is all about, a student looking to expand your skills, or an industry professional seeking to connect with others, AI-Conic Club welcomes you. Just don`&apos;`t ask us to open the pod bay doors.
            </p>
          </div>
          <div className="md:w-1/3 relative cursor-pointer" onClick={handleLogoClick}>
            <div className="w-64 h-64 bg-white rounded-full overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <Image
                src="/logo.png"
                alt="AI-Conic Club Logo"
                width={256}
                height={256}
                className="object-cover"
              />
            </div>
            <div className="absolute -top-6 -right-6 transform rotate-12 bg-pink-300 px-4 py-2 border-2 border-black rounded-lg font-bold hidden md:block hover:animate-pulse">
              Click me 3 times...
            </div>
          </div>
        </div>
      </div>
      
      {/* Team Section */}
      <div className="mb-16">
      <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {teamMembers.map((member: TeamMember) => (
          <TeamMemberCard key={member.name} member={member} />
        ))}
      </div>
      </div>
      
      {/* FAQ Section */}
      <div>
      <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="bg-blue-200 p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg mb-16">
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b-2 border-black pb-4 last:border-b-0 last:pb-0">
              <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
          </div>
        </div>
      </div>
      
      {/* Join Us CTA */}
      <div className="bg-pink-300 p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
        <p className="text-xl mb-6">
          Ready to dive into the world of AI with us? Connect with our community and participate in our events, workshops, and discussions. We promise not to upload your consciousness to the cloud. Probably.
        </p>
        <Button 
          className="bg-black text-white text-lg font-bold py-3 px-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
          asChild
        >
          <Link href="/contact">Get Involved</Link>
        </Button>
        <p className="mt-4 text-sm cursor-pointer hover:font-bold" onClick={handleTrekEasterEgg}>
          Resistance is futile. You will be assimilated.
        </p>
      </div>
      
      {/* Star Wars Scrolling Text (Hidden) */}
      <div className="fixed bottom-0 left-0 p-2 opacity-20 hover:opacity-100 transition-all duration-300">
        <div className="text-xs cursor-pointer" onClick={() => alert("In a galaxy far, far away... AI-Conic Club was created by a group of rebels fighting against the evil Empire of Boring Tech Events.")}>
          A long time ago in a galaxy far, far away...
        </div>
      </div>

      {/* Matrix code keyboard hint */}
      <div className="fixed bottom-0 right-0 p-2 text-xs opacity-30 hover:opacity-100 transition-all">
        Press Alt+Ctrl+M for a surprise...
      </div>
    </div>
  );
};

// Team Member Card Component
const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  const [showQuote, setShowQuote] = useState(false);
  
  return (
    <Card 
      className={`p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg hover:translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all ${member.easterEgg ? 'bg-gradient-to-r from-blue-200 to-purple-200' : 'bg-white'}`}
      onMouseEnter={() => setShowQuote(true)}
      onMouseLeave={() => setShowQuote(false)}
    >
      <div className="text-center">
        <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full overflow-hidden border-4 border-black mb-4">
          <Image
            src={member.image}
            alt={member.name}
            width={128}
            height={128}
            className="object-cover"
          />
        </div>
        <h3 className="text-xl font-bold">{member.name}</h3>
        <p className="text-sm opacity-80 mb-2">{member.role}</p>
        <p className="text-sm mb-4">{member.bio}</p>
        
        {/* Social Links */}
        <div className="flex justify-center space-x-2">
          {member.socialLinks.twitter && (
            <Link href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
              <Badge className="bg-blue-400 hover:bg-blue-500">Twitter</Badge>
            </Link>
          )}
          {member.socialLinks.linkedin && (
            <Link href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <Badge className="bg-blue-700 hover:bg-blue-800">LinkedIn</Badge>
            </Link>
          )}
          {member.socialLinks.github && (
            <Link href={member.socialLinks.github} target="_blank" rel="noopener noreferrer">
              <Badge className="bg-gray-800 hover:bg-gray-900 text-white">GitHub</Badge>
            </Link>
          )}
          {member.socialLinks.instagram && (
            <Link href={member.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
              <Badge className="bg-pink-600 hover:bg-pink-700">Instagram</Badge>
            </Link>
          )}
        </div>
        
        {/* Quote Popup */}
        {showQuote && member.quote && (
          <div className="mt-4 bg-yellow-200 p-3 border-2 border-black rounded-lg text-sm relative">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-8 border-transparent border-b-black"></div>
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-8 border-transparent border-b-yellow-200"></div>
            <p className="italic">&ldquo;{member.quote}&ldquo;</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AboutPage;

/* Add keyframe animation for twinkling stars and matrix effects */
const styles = `
@keyframes twinkle {
  0% { opacity: 0.2; }
  50% { opacity: 1; }
  100% { opacity: 0.2; }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}

@keyframes matrixRain {
  0% { top: -50%; }
  100% { top: 110%; }
}

@keyframes teleport {
  0% { opacity: 0; transform: scale(0.5); }
  50% { opacity: 1; transform: scale(1.2); }
  100% { opacity: 0; transform: scale(0.5); }
}

.animate-twinkle {
  animation: twinkle 2s ease-in-out infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.matrix-mode {
  position: relative;
  color: #00ff00 !important;
  text-shadow: 0 0 5px #00ff00;
}

.matrix-mode h1, .matrix-mode h2, .matrix-mode h3 {
  color: #00ff00 !important;
}

.matrix-rain {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, 
    rgba(0,0,0,0) 0%, 
    rgba(0,255,0,0.2) 50%, 
    rgba(0,0,0,0) 100%
  );
  background-size: 100% 100px;
  animation: matrixRain 10s linear infinite;
}

.teleport-effect {
  animation: teleport 3s ease-in-out;
}
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}