'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Blog {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  authorEmail: string;
  authorId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [blogId, setBlogId] = useState<string>('');

  useEffect(() => {
    const initializeParams = async () => {
      try {
        const resolvedParams = await params;
        setBlogId(resolvedParams.id);
      } catch (err) {
        console.error('Error resolving params:', err);
        setError('Invalid blog URL');
        setLoading(false);
      }
    };

    initializeParams();
  }, [params]);

  useEffect(() => {
    if (!blogId) return;

    const fetchBlog = async () => {
      try {
        const docRef = doc(db, 'blogs', blogId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setBlog({
            id: docSnap.id,
            title: data.title,
            content: data.content,
            imageUrl: data.imageUrl,
            authorEmail: data.authorEmail || '',
            authorId: data.authorId || '',
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          });
        } else {
          setError('Blog not found');
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to load blog');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
        {/* Loading Hero Section */}
        <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 bg-gradient-to-r from-[#1baf0a] via-[#b2e63a] to-[#1baf0a] animate-pulse">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-4xl mx-auto px-4">
              <div className="h-8 sm:h-10 md:h-12 lg:h-16 bg-white/20 rounded mb-3 sm:mb-4 w-64 sm:w-80 md:w-96 lg:w-full max-w-3xl mx-auto animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Loading Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 sm:p-6 md:p-8 lg:p-12">
                <div className="space-y-3 sm:space-y-4">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="h-3 sm:h-4 bg-gray-300 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
        {/* Error Hero Section */}
        <section className="relative h-64 sm:h-72 md:h-80 lg:h-96 w-full overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1baf0a] via-[#b2e63a] to-[#1baf0a]" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg">
              Blog Not Found
            </h1>
            <p className="text-white/90 text-sm sm:text-base md:text-lg drop-shadow-md">
              The blog post you are looking for does not exist
            </p>
          </div>
        </section>

        {/* Error Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto">
            <p className="text-gray-600 mb-8 sm:mb-12 text-sm sm:text-base">{error || 'Please check the URL and try again.'}</p>
            <Link
              href="/blogs"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] text-white rounded-xl hover:from-[#0f8a08] hover:to-[#9dd132] transition-all duration-300 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
      {/* Small Hero Section for Navbar Visibility */}
      <section className="relative h-64 sm:h-72 md:h-80 lg:h-96 w-full overflow-hidden flex items-center justify-center">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1baf0a] via-[#b2e63a] to-[#1baf0a]" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 sm:w-24 sm:h-24 bg-white/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full blur-lg"></div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Hero Title - Blog Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 drop-shadow-lg leading-tight max-w-4xl mx-auto">
              <span style={{
                background: "linear-gradient(45deg, #b2e63a, #ffffff, #b2e63a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}>
                {blog?.title || 'Blog Details'}
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* Navigation Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 py-4 sm:py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blogs"
              className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-sm sm:text-base transition-all duration-200 hover:translate-x-1"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden sm:inline">Back to All Blogs</span>
              <span className="sm:hidden">Back to Blogs</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Responsive Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
            {/* Responsive Blog Header */}
            <div className="p-4 sm:p-6 md:p-8 lg:p-12">
              <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 text-center">
                Published on {blog.createdAt?.toDate ? new Date(blog.createdAt.toDate()).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'N/A'}
              </p>

              {/* Responsive Featured Image */}
              <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[500px] mb-6 sm:mb-8 rounded-lg overflow-hidden shadow-md">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  fill
                  className="object-contain bg-gray-100"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  priority
                />
              </div>

              {/* Responsive Blog Content */}
              <div
                className="text-gray-700 leading-relaxed space-y-4 sm:space-y-6 blog-content text-sm sm:text-base md:text-lg"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Enhanced Bottom Navigation Section */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-t border-gray-200 py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
              Explore More Insights
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8 max-w-2xl mx-auto">
              Discover more stories, insights, and updates from Green Business Initiative LLP
            </p>
            <Link
              href="/blogs"
              className="inline-flex items-center px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] text-white rounded-xl hover:from-[#0f8a08] hover:to-[#9dd132] transition-all duration-300 text-base sm:text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden sm:inline">Back to All Blogs</span>
              <span className="sm:hidden">All Blogs</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
