import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { BlogPostCard } from './blog-post-card';
import { FeaturedPostSidebarItem } from './featured-post-sidebar-item';

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="relative h-[400px] overflow-hidden rounded-lg shadow-lg md:h-[500px] lg:col-span-2">
          <img
            alt="Unlocking Business Efficiency with SaaS Solutions"
            className="w-full object-cover"
            src="https://placehold.co/600x400?text=."
          />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
            <Badge className="mb-2 w-fit bg-white/20 text-white backdrop-blur-sm">
              Business
            </Badge>
            <h2 className="text-2xl leading-tight font-bold md:text-3xl">
              Unlocking Business Efficiency with SaaS Solutions
            </h2>
          </div>
        </div>

        {/* Other Featured Posts Sidebar */}
        <div className="bg-card text-card-foreground space-y-6 rounded-lg border p-6 lg:col-span-1">
          <h3 className="text-xl font-semibold">Other featured posts</h3>
          <div className="space-y-4">
            <FeaturedPostSidebarItem
              imageAlt="Revolutionizing industries through SaaS implementation"
              imageSrc="https://placehold.co/600x400?text=."
              title="Revolutionizing industries through SaaS implementation"
            />
            <FeaturedPostSidebarItem
              imageAlt="Synergizing saas and UX design for elevating digital experiences"
              imageSrc="https://placehold.co/600x400?text=."
              title="Synergizing saas and UX design for elevating digital experiences"
            />
            <FeaturedPostSidebarItem
              imageAlt="Navigating saas waters with intuitive UI and UX"
              imageSrc="https://placehold.co/600x400?text=."
              title="Navigating saas waters with intuitive UI and UX"
            />
            <FeaturedPostSidebarItem
              imageAlt="Sculpting saas success - the art of UI and UX design"
              imageSrc="https://placehold.co/600x400?text=."
              title="Sculpting saas success - the art of UI and UX design"
            />
            <FeaturedPostSidebarItem
              imageAlt="Transforming saas platforms - a UI/UX design odyssey"
              imageSrc="https://placehold.co/600x400?text=."
              title="Transforming saas platforms - a UI/UX design odyssey"
            />
          </div>
        </div>
      </div>

      {/* Recent Posts Section */}
      <div className="mt-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recent Posts</h2>
          <Button asChild variant="outline">
            <Link href="#">All Posts</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <BlogPostCard
            imageAlt="Mastering UI Elements: A Practical Guide for Designers"
            imageSrc="https://placehold.co/600x400?text=."
            readTime="3 min"
            title="Mastering UI Elements: A Practical Guide for Designers"
            authorAvatarSrc="/placeholder.svg?height=24&width=24"
            authorName="Jennifer Taylor"
            description="Dive into the world of user interfaces with our expert guides, latest trends, and practical tips."
          />
          <BlogPostCard
            imageAlt="Crafting Seamless Experiences: The Art of Intuitive UI Design"
            imageSrc="https://placehold.co/600x400?text=."
            readTime="5 min"
            title="Crafting Seamless Experiences: The Art of Intuitive UI Design"
            authorAvatarSrc="/placeholder.svg?height=24&width=24"
            authorName="Jennifer Taylor"
            description="Explore the principles and techniques that drive user-centric UI design, ensuring a seamless and intuitive experience for your audience."
          />
          <BlogPostCard
            imageAlt="Beyond Aesthetics: The Power of Emotional UX Design"
            imageSrc="https://placehold.co/600x400?text=."
            readTime="2 min"
            title="Beyond Aesthetics: The Power of Emotional UX Design"
            authorAvatarSrc="/placeholder.svg?height=24&width=24"
            authorName="Ryan A."
            description="Delve into the realm of emotional design and discover how incorporating empathy and psychological insights can elevate user experiences."
          />
        </div>
      </div>
    </div>
  );
}
