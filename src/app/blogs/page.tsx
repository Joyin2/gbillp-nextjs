'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs, query, orderBy, Timestamp, doc, getDoc } from 'firebase/firestore';
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

interface HeroText {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  pageName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [heroText, setHeroText] = useState<HeroText | null>(null);
  const [heroLoading, setHeroLoading] = useState(true);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

    const fetchHeroText = async () => {
      try {
        const heroTextDoc = doc(db, 'heroTexts', 'blogs');
        const docSnap = await getDoc(heroTextDoc);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setHeroText({
            id: docSnap.id,
            title: data.title || '',
            subtitle: data.subtitle || '',
            description: data.description || '',
            buttonText: data.buttonText || '',
            buttonLink: data.buttonLink || '',
            pageName: data.pageName || '',
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          });
        }
      } catch (error) {
        console.error('Error fetching hero text:', error);
      } finally {
        setHeroLoading(false);
      }
    };

    fetchBlogs();
    fetchHeroText();
  }, []);

  // For now, show all blogs since category filtering is not implemented in Firestore
  const filteredBlogs = blogs;

  return (
    <div className="min-h-screen">
      {/* Enhanced Responsive Hero Section */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#1baf0a] via-[#b2e63a] to-[#1baf0a]"
            animate={!isMobile ? {
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            } : {}}
            transition={!isMobile ? {
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            } : {}}
            style={{
              backgroundSize: '200% 200%',
            }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* 3D Floating Elements - Hidden on mobile for better performance */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-1/4 left-1/4 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-green-500/20 rounded-full blur-3xl"
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
              className="absolute bottom-1/4 right-1/4 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-emerald-500/20 rounded-full blur-3xl"
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
          </>
        )}

        {/* Responsive Animated Content */}
        <motion.div
          className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center"
          style={{ opacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-white drop-shadow-lg"
              animate={!isMobile ? {
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
              } : {}}
              transition={!isMobile ? {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              } : {}}
            >
              {heroLoading ? (
                <div className="animate-pulse">
                  <div className="h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 bg-white/20 rounded-lg mb-2"></div>
                  <div className="h-8 sm:h-10 md:h-12 lg:h-16 xl:h-20 bg-white/10 rounded-lg"></div>
                </div>
              ) : heroText ? (
                <span className="block sm:block md:inline mb-2 md:mb-0">
                  {heroText.title}
                </span>
              ) : (
                <div className="text-white/50">
                  <span className="block">No hero text available</span>
                </div>
              )}
            </motion.h1>
            {heroLoading ? (
              <motion.div
                className="px-4 sm:px-0 max-w-4xl mx-auto mb-8 sm:mb-12"
                initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="animate-pulse">
                  <div className="h-6 sm:h-8 bg-white/20 rounded-lg mb-2"></div>
                  <div className="h-6 sm:h-8 bg-white/10 rounded-lg"></div>
                </div>
              </motion.div>
            ) : heroText && heroText.subtitle ? (
              <motion.p
                className="text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 leading-relaxed drop-shadow-md px-4 sm:px-0 max-w-4xl mx-auto text-center"
                initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {heroText.subtitle}
              </motion.p>
            ) : null}
          </motion.div>

          {/* Enhanced Responsive Animated Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16 px-4 sm:px-0"
            whileHover={!isMobile ? { scale: 1.02 } : {}}
          >
            <div className="relative group">
              <motion.div
                className="absolute -inset-0.5 bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
                animate={!isMobile ? {
                  scale: [1, 1.02, 1],
                } : {}}
                transition={!isMobile ? {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                } : {}}
              />
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-full bg-white/10 backdrop-blur-lg text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                />
                <motion.button
                  className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-full transition-colors duration-300 text-sm sm:text-base"
                  whileHover={!isMobile ? { scale: 1.05 } : {}}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="hidden sm:inline">Search</span>
                  <svg className="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Responsive Scroll Indicator - Hidden on mobile */}
          {!isMobile && (
            <motion.div
              className="absolute bottom-4 sm:bottom-0 sm:-mb-20 left-1/2 transform -translate-x-1/2"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center">
                <motion.div
                  className="w-0.5 h-1.5 sm:w-1 sm:h-2 bg-white/50 rounded-full mt-1.5 sm:mt-2"
                  animate={{
                    y: [0, 8, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Responsive Blog Grid Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Responsive Blog Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-6 xl:gap-8 auto-rows-fr">
            {loading ? (
              // Responsive Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-lg animate-pulse">
                  <div className="h-48 sm:h-56 md:h-64 bg-gray-300"></div>
                  <div className="p-4 sm:p-5 md:p-6">
                    <div className="h-5 sm:h-6 bg-gray-300 rounded mb-2 sm:mb-3"></div>
                    <div className="h-3 sm:h-4 bg-gray-300 rounded mb-3 sm:mb-4"></div>
                    <div className="flex items-center justify-between">
                      <div className="h-3 sm:h-4 bg-gray-300 rounded w-20 sm:w-24"></div>
                      <div className="h-3 sm:h-4 bg-gray-300 rounded w-16 sm:w-20"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog, index) => (
                <Link key={blog.id} href={`/blogs/${blog.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group h-full"
                    whileHover={!isMobile ? { y: -5 } : {}}
                  >
                    <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                      <Image
                        src={blog.imageUrl}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536px) 33vw, 25vw"
                        priority={index < 4}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                    <div className="p-4 sm:p-5 md:p-6 flex flex-col h-full">
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 group-hover:text-emerald-600 transition-colors duration-300 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-3 leading-relaxed text-sm sm:text-base flex-grow">
                        {blog.content.replace(/<[^>]*>/g, '').substring(0, 120)}...
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xs sm:text-sm text-gray-500 hidden sm:inline">
                          {blog.createdAt?.toDate ? new Date(blog.createdAt.toDate()).toLocaleDateString() : 'N/A'}
                        </span>
                        <span className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all duration-300 ml-auto sm:ml-0">
                          <span className="hidden sm:inline">Read More</span>
                          <span className="sm:hidden">Read</span>
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-8 sm:py-12">
                <p className="text-gray-500 text-base sm:text-lg">No blogs found.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}