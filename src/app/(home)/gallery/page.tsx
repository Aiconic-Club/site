"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Gallery data structure with series
const galleryImages = [
  {
    id: 1,
    title: "Noskathon",
    description: "An exhibition of our AI projects and innovations on Noskathon.",
    imageUrl: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Events",
  },
];

const categories = ["All", ...Array.from(new Set(galleryImages.map(img => img.category)))];

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSeriesOpen, setIsSeriesOpen] = useState(false);
  const [currentSeries, setCurrentSeries] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filter images based on selected category
  const filteredImages = selectedCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  // Get images for the current series
  const seriesImages = galleryImages.filter(img => img.category === currentSeries);

  // Handle category selection
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  // Open series view
  const openSeries = (category: string) => {
    setCurrentSeries(category);
    setCurrentImageIndex(0);
    setIsSeriesOpen(true);
  };

  // Navigate to next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === seriesImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Navigate to previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? seriesImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-5xl font-bold mb-8 border-b-4 border-black pb-2">Gallery</h1>
      
      {/* Hero Section */}
      <div className="bg-pink-200 p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg mb-16">
        <h2 className="text-3xl font-bold mb-4">Capturing Our AI Journey</h2>
        <p className="text-xl">
          Explore photos from our events, workshops, hackathons, and social gatherings. These moments showcase our vibrant community and the exciting world of AI we`&apos`re building together.
        </p>
      </div>
      
      {/* Category Filter */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Browse by Category</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category, index) => (
            <Button 
              key={index}
              variant={category === selectedCategory ? "default" : "outline"}
              className={`border-2 border-black ${category === selectedCategory ? 'bg-black text-white' : 'bg-white hover:bg-yellow-200'} font-bold py-2 px-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      {/* View Series Buttons */}
      {selectedCategory !== "All" && (
        <div className="mb-8">
          <Button 
            className="bg-yellow-300 text-black border-2 border-black font-bold py-2 px-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            onClick={() => openSeries(selectedCategory)}
          >
            View All {selectedCategory} Images as Slideshow
          </Button>
        </div>
      )}
      
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {filteredImages.map((image) => (
          <Card 
            key={image.id} 
            className="overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
            onClick={() => openSeries(image.category)}
          >
            <div className="relative h-60 overflow-hidden">
              <img 
                src={image.imageUrl} 
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-yellow-300 py-1 px-3 border-2 border-black font-bold text-sm">
                {image.category}
              </div>
            </div>
            <div className="p-4 bg-white">
              <h3 className="text-xl font-bold mb-2">{image.title}</h3>
              <p className="text-gray-700 mb-2">{image.description}</p>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Image Series Dialog/Modal */}
      {isSeriesOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <div className="relative max-w-4xl w-full h-[80vh] mx-auto">
            {/* Close button */}
            <button 
              className="absolute top-4 right-4 z-10 bg-white text-black p-2 rounded-full"
              onClick={() => setIsSeriesOpen(false)}
            >
              <X size={24} />
            </button>
            
            {/* Image display */}
            <div className="relative h-full w-full flex items-center justify-center">
              <img 
                src={seriesImages[currentImageIndex].imageUrl} 
                alt={seriesImages[currentImageIndex].title}
                className="max-h-full max-w-full object-contain"
              />
              
              {/* Image details */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
                <h3 className="text-xl font-bold">{seriesImages[currentImageIndex].title}</h3>
                <p>{seriesImages[currentImageIndex].description}</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="bg-yellow-300 text-black py-1 px-2 rounded-md text-sm font-bold">
                    {seriesImages[currentImageIndex].category}
                  </p>
                  <p className="text-sm">
                    {currentImageIndex + 1} of {seriesImages.length}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Navigation buttons */}
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full opacity-70 hover:opacity-100"
              onClick={prevImage}
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full opacity-70 hover:opacity-100"
              onClick={nextImage}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
      
      {/* Submit Photos Section */}
      <div className="bg-blue-200 p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg mb-16">
        <h2 className="text-3xl font-bold mb-4">Share Your Photos</h2>
        <p className="text-xl mb-6">
          Did you attend one of our events? We`&apos`d love to see your photos! Submit your AI-Conic Club memories to be featured in our gallery.
        </p>
        <Button
          className="bg-pink-500 hover:bg-pink-600 text-white text-lg font-bold py-3 px-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          Submit Photos
        </Button>
      </div>
    </div>
  );
};

export default Page;