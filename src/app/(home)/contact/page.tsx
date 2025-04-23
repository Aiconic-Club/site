import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Page = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-5xl font-bold mb-8 border-b-4 border-black pb-2">Get in Touch</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Contact Form */}
        <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-green-200 rounded-lg">
          <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-bold mb-2">Name</label>
              <Input 
                id="name" 
                placeholder="Your name" 
                className="w-full p-4 border-4 border-black rounded-lg focus:ring-pink-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-bold mb-2">Email</label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your.email@example.com" 
                className="w-full p-4 border-4 border-black rounded-lg focus:ring-pink-500"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-lg font-bold mb-2">Subject</label>
              <Input 
                id="subject" 
                placeholder="What's this about?" 
                className="w-full p-4 border-4 border-black rounded-lg focus:ring-pink-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-bold mb-2">Message</label>
              <Textarea 
                id="message" 
                placeholder="Tell us what's on your mind..." 
                className="w-full p-4 border-4 border-black rounded-lg min-h-[150px] focus:ring-pink-500"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white text-lg font-bold py-3 px-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              Send Message
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
                <p className="text-lg">info@aiconicclub.com</p>
              </div>
              <div>
                <h3 className="text-xl font-bold">Phone</h3>
                <p className="text-lg">(555) 123-4567</p>
              </div>
              <div>
                <h3 className="text-xl font-bold">Address</h3>
                <p className="text-lg">
                  123 AI Boulevard<br />
                  Tech District<br />
                  Innovation City, IC 98765
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-blue-200 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Office Hours</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-lg font-bold">Monday - Friday:</span>
                <span className="text-lg">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg font-bold">Saturday:</span>
                <span className="text-lg">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg font-bold">Sunday:</span>
                <span className="text-lg">Closed</span>
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