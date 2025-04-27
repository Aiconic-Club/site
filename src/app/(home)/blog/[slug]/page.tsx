// src/app/(home)/blog/[slug]/page.tsx
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { blogPosts } from "../data";
import { Metadata } from "next";
import Image from "next/image";

type BlogPostParams = {
  params: {
    slug: string;
  };
};

// Generate static parameters for all blog posts
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for the page based on the slug
export async function generateMetadata({ params }: BlogPostParams): Promise<Metadata> {
  const post = blogPosts.find((post) => post.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  
  return {
    title: post.title,
    description: post.excerpt,
  };
}

// BlogPostPage component - displaying the blog post details
export default function BlogPostPage({ params }: BlogPostParams) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-5xl font-bold mb-8 border-b-4 border-black pb-2">Blog Post Not Found</h1>
        <p className="text-xl mb-8">{"The blog post you're looking for doesn't exist or may have been removed."}</p>
        <Button asChild className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg px-8 py-6 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <Button asChild className="mb-8 bg-white hover:bg-yellow-200 text-black font-bold px-6 py-3 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
        <Link href="/blog">← Back to Blog</Link>
      </Button>

      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.categories.map((category, index) => (
            <Badge key={index} className="bg-pink-400 hover:bg-pink-500 text-black font-medium border-2 border-black">
              {category}
            </Badge>
          ))}
        </div>
        <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center justify-between mb-8">
          <span className="text-lg font-bold">By {post.author}</span>
          <span className="text-lg">{post.date}</span>
        </div>
      </div>

      <div className="relative h-96 mb-12 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <Image 
          src={post.imageUrl} 
          alt={post.title}
          width={1200}
          height={600}
          className="w-full h-full object-cover"
        />
      </div>

      <Card className="p-8 mb-12 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-yellow-100 rounded-lg">
        <div className="prose prose-lg max-w-none">
          {post.content.map((paragraph, index) => (
            <p key={index} className="mb-6 text-lg">{paragraph}</p>
          ))}
        </div>
      </Card>

      {/* Author Bio */}
      <Card className="p-8 mb-12 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-blue-200 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">About the Author</h2>
        <div className="flex items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-black mr-6">
            <Image 
              src={post.authorImageUrl} 
              alt={post.author}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold">{post.author}</h3>
            <p className="text-lg">{post.authorBio}</p>
          </div>
        </div>
      </Card>

      {/* Related Posts */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-8 border-b-4 border-black pb-2">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts
            .filter(relatedPost => 
              relatedPost.slug !== post.slug && 
              relatedPost.categories.some(category => post.categories.includes(category))
            )
            .slice(0, 3)
            .map((relatedPost, index) => (
              <Link href={`/blog/${relatedPost.slug}`} key={index}>
                <Card className="h-full overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <div className="relative h-40">
                    <Image 
                      src={relatedPost.imageUrl} 
                      alt={relatedPost.title}
                      width={400}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="text-xl font-bold mb-2">{relatedPost.title}</h3>
                    <p className="text-gray-700 line-clamp-2">{relatedPost.excerpt}</p>
                  </div>
                </Card>
              </Link>
            ))
          }
        </div>
      </div>

      {/* Comments Section Placeholder */}
      <Card className="p-8 mb-12 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-green-200 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Comments</h2>
        <p className="text-xl mb-4">Share your thoughts on this article!</p>
        <div className="flex items-center justify-center h-40 border-4 border-black bg-white">
          <p className="text-2xl font-bold">Comments section coming soon!</p>
        </div>
      </Card>
    </div>
  );
}