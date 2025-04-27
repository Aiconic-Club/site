import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { blogPosts } from "./data";
import Image from "next/image";

const Page = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-5xl font-bold mb-8 border-b-4 border-black pb-2">AI-Conic Blog</h1>

      <div className="grid grid-cols-1 gap-12 mb-16">
        {blogPosts.map((post, index) => (
          <Link href={`/blog/${post.slug}`} key={index} className="block">
            <Card className="overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
              <div className="md:flex">
                <div className="md:w-1/3 h-64 md:h-auto relative">
                  <Image 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover border-r-4 border-black"
                  />
                </div>
                <div className="md:w-2/3 p-6 bg-yellow-100">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.categories.map((category, catIndex) => (
                      <Badge key={catIndex} className="bg-pink-400 hover:bg-pink-500 text-black font-medium border-2 border-black">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">{post.title}</h2>
                  <p className="text-gray-700 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold">By {post.author}</span>
                    <span className="text-sm">{post.date}</span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="bg-blue-200 p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg mb-16">
        <h2 className="text-3xl font-bold mb-4">Want to Contribute?</h2>
        <p className="text-xl mb-6">
          Share your AI insights, tutorials, or research findings with our community. We welcome guest posts from members and non-members alike.
        </p>
        <p className="text-xl">
          Contact us at <span className="font-bold">blog@aiconicclub.com</span> to submit your article idea.
        </p>
      </div>
    </div>
  );
};

export default Page;