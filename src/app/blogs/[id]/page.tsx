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
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll detection for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <div className="min-h-screen bg-gray-50">
        <div className="relative h-96 bg-gray-300 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <div className="h-8 bg-white/20 rounded mb-4 animate-pulse"></div>
            <div className="h-4 bg-white/20 rounded w-1/3 animate-pulse"></div>
          </div>
        </div>
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="h-4 bg-gray-300 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-8">{error || 'The blog post you are looking for does not exist.'}</p>
          <Link
            href="/blogs"
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dark background for navbar visibility - fades out when scrolling */}
      <div
        className={`bg-gradient-to-r from-[#31cc20] to-[#b2e63a] h-20 fixed top-0 left-0 right-0 z-40 transition-opacity duration-300 ${
          scrolled ? 'opacity-0' : 'opacity-100'
        }`}
      ></div>

      {/* Header with Back Button - Account for navbar */}
      <div className="bg-white shadow-sm pt-24 pb-4">
        <div className="container mx-auto px-6">
          <Link
            href="/blogs"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Blogs
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Blog Header */}
            <div className="p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {blog.title}
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                Published on {blog.createdAt?.toDate ? new Date(blog.createdAt.toDate()).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'N/A'}
              </p>

              {/* Featured Image */}
              <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] mb-8 rounded-lg overflow-hidden">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  fill
                  className="object-contain bg-gray-100"
                  priority
                />
              </div>

              {/* Blog Content */}
              <div
                className="text-gray-700 leading-relaxed space-y-6 blog-content text-lg"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="mt-8 text-center">
            <Link
              href="/blogs"
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to All Blogs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
