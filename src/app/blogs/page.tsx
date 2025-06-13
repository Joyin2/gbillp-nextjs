'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
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

export default function BlogPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsCollection = collection(db, 'blogs');
        const blogsQuery = query(blogsCollection, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(blogsQuery);

        const blogsData: Blog[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          blogsData.push({
            id: doc.id,
            title: data.title,
            content: data.content,
            imageUrl: data.imageUrl,
            authorEmail: data.authorEmail,
            authorId: data.authorId,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          });
        });

        setBlogs(blogsData);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
    setIsLoaded(true);
  }, []);

  // For now, show all blogs since category filtering is not implemented in Firestore
  const filteredBlogs = blogs;

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#31cc20] via-[#b2e63a] to-[#31cc20]"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* 3D Floating Elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotateY: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
            rotateX: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Animated Content */}
        <motion.div 
          className="container mx-auto px-6 relative z-20 text-center"
          style={{ opacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg"
              animate={{
                textShadow: [
                  "0 0 7px #fff",
                  "0 0 10px #fff",
                  "0 0 21px #fff",
                  "0 0 42px #0fa",
                  "0 0 82px #0fa",
                  "0 0 92px #0fa",
                  "0 0 102px #0fa",
                  "0 0 151px #0fa"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              Explore Insights, Ideas, and Inspiration
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover the latest news, stories, and updates from Green Business Initiative LLP
            </motion.p>
          </motion.div>

          {/* Enhanced Animated Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-2xl mx-auto mb-16"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative group">
              <motion.div
                className="absolute -inset-0.5 bg-gradient-to-r from-[#b2e63a] to-[#31cc20] rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-lg text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <motion.button 
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Search
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-0 -mb-20 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-2 bg-white/50 rounded-full mt-2"
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Blog Grid Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Blog Posts</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover insights, stories, and updates from Green Business Initiative LLP
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg animate-pulse">
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                    <div className="flex items-center justify-between">
                      <div className="h-4 bg-gray-300 rounded w-24"></div>
                      <div className="h-4 bg-gray-300 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <Link key={blog.id} href={`/blogs/${blog.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={blog.imageUrl}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {blog.content.replace(/<[^>]*>/g, '').substring(0, 120)}...
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {blog.createdAt?.toDate ? new Date(blog.createdAt.toDate()).toLocaleDateString() : 'N/A'}
                        </span>
                        <span className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                          Read More
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No blogs found.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}