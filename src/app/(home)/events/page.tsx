"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";

const baseEvents = [
  {
    id: 1,
    title: "AI Workshop: Don't Be Skynet",
    date: "Every Thursday",
    time: "1:40 PM",
    location: "Tech Hub, Floor 3",
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

const months = ["All", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "Coming Soon"];
const categories = ["All", ...Array.from(new Set(baseEvents.map(event => event.category)))];

const Page = () => {
  const [events, setEvents] = useState(baseEvents);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [easterEggText, setEasterEggText] = useState("");
  const [clickedIds, setClickedIds] = useState(new Set<number>());
  const [konami, setKonami] = useState(false);

  useEffect(() => {
    const savedIds = localStorage.getItem("clickedEventIds");
    if (savedIds) {
      setClickedIds(new Set(JSON.parse(savedIds)));
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let keys: number[] = JSON.parse(localStorage.getItem("konamiKeys") || "[]");
      keys.push(e.keyCode);
      if (keys.length > 10) keys = keys.slice(-10);
      localStorage.setItem("konamiKeys", JSON.stringify(keys));

      const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
      if (JSON.stringify(keys) === JSON.stringify(konamiCode)) {
        setKonami(true);

        const secretEvent = {
          id: -999,
          title: "Super Secret AI-Conic Pajama Party",
          date: "Tomorrow Night",
          time: "Midnight",
          location: "Your Computer",
          description: "This event doesn't exist. Or does it?",
          category: "Secret",
          color: "bg-black text-white",
          month: "Secret",
        };

        setEvents(prev => {
          if (!prev.find(e => e.id === secretEvent.id)) {
            return [...prev, secretEvent];
          }
          return prev;
        });

        setTimeout(() => {
          setEvents(prev => prev.filter(e => e.id !== secretEvent.id));
          setKonami(false);
        }, 10000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleEventClick = (event: typeof baseEvents[number]) => {
    if (event.easterEgg && !clickedIds.has(event.id)) {
      const newIds = new Set(clickedIds);
      newIds.add(event.id);
      setClickedIds(newIds);
      setEasterEggText(event.easterEgg);
      setShowEasterEgg(true);
      localStorage.setItem("clickedEventIds", JSON.stringify([...newIds]));
      setTimeout(() => setShowEasterEgg(false), 3000);
    }
  };

  const EventCard = ({ event }: { event: typeof events[number] }) => (
    <Card
      className={`${event.color} p-6 border-4 border-black shadow-lg rounded-lg cursor-pointer`}
      onClick={() => handleEventClick(event)}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">{event.title}</h3>
        <Badge>{event.category}</Badge>
      </div>
      <p className="text-sm">{event.description}</p>
      <p className="mt-2 text-xs opacity-70">{event.date} @ {event.time}</p>
      <p className="text-xs italic">{event.location}</p>
    </Card>
  );

  return (
    <div className="container mx-auto p-8">
      {showEasterEgg && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-yellow-300 p-6 border-black border-4 rounded-lg text-center animate-bounce">
            <h2 className="text-xl font-bold">Easter Egg Found!</h2>
            <p>{easterEggText}</p>
          </div>
        </div>
      )}

      {konami && (
        <div className="fixed inset-0 flex justify-center items-center bg-purple-800 bg-opacity-80 z-50">
          <div className="bg-white p-8 border-4 border-black rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">🎮 KONAMI CODE UNLOCKED 🎮</h2>
            <p>Secret event added. You sneaky hacker, you.</p>
          </div>
        </div>
      )}

      <h1 className="text-5xl font-bold mb-8 border-b-4 border-black pb-2">Upcoming Events</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Page;
