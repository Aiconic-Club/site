'use client';

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Page = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      // Reset the form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-5xl font-bold mb-8 border-b-4 border-black pb-2">Get in Touch</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Contact Form */}
        <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-green-200 rounded-lg">
          <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-lg font-bold mb-2">Name</label>
              <Input 
                id="name" 
                placeholder="Your name" 
                className="w-full p-4 border-4 border-black rounded-lg focus:ring-pink-500"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-bold mb-2">Email</label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your.email@example.com" 
                className="w-full p-4 border-4 border-black rounded-lg focus:ring-pink-500"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-lg font-bold mb-2">Subject</label>
              <Input 
                id="subject" 
                placeholder="What's this about?" 
                className="w-full p-4 border-4 border-black rounded-lg focus:ring-pink-500"
                value={formData.subject}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-bold mb-2">Message</label>
              <Textarea 
                id="message" 
                placeholder="Tell us what's on your mind..." 
                className="w-full p-4 border-4 border-black rounded-lg min-h-[150px] focus:ring-pink-500"
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white text-lg font-bold py-3 px-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </Card>

        {/* Contact Info */}
        <div className="space-y-8">
          <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-yellow-200 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold">Email</h3>
                <p className="text-lg">mail.aiconic@gmail.com</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-purple-200 p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg mb-16">
        <h2 className="text-3xl font-bold mb-6">Find Us</h2>
        <div className="h-96 border-4 border-black bg-gray-200 flex items-center justify-center">
          <p className="text-2xl font-bold">Interactive Map Coming Soon!</p>
        </div>
      </div>
    </div>
  );
};

export default Page;