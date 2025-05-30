'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Sample blog data structure (this will be replaced with data from admin panel)
const sampleBlogs = [
  {
    id: 1,
    title: "Green Business Initiative LLP Named EarthON Climate Champion",
    excerpt: "Green Business Initiative LLP (GBI) has been recognized as an EarthON Climate Champion and participated in the prestigious Climate Champion Workshop held at TapovON in Nadia, West Bengal.",
    date: "December 11, 2023",
    category: "Sustainability",
    image: "/images/blog-1.jpg",
    slug: "earthon-climate-champion"
  },
  {
    id: 2,
    title: "GBI Participates in 43rd India International Trade Fair",
    excerpt: "Green Business Initiative LLP is proud to have been invited to participate in the 43rd India International Trade Fair (IITF), held from November 14 to 27 at Pragati Maidan, New Delhi.",
    date: "November 14, 2024",
    category: "Events",
    image: "/images/blog-2.jpg",
    slug: "iitf-participation"
  },
  {
    id: 3,
    title: "GBI Named ODOP Ambassador for Cachar District",
    excerpt: "Green Business Initiative LLP has been appointed from Cachar District as the Ambassador of the One District One Product (ODOP) initiative for promoting local varieties of Sticky and Kalijira Rice.",
    date: "October 15, 2023",
    category: "Achievements",
    image: "/images/blog-3.jpg",
    slug: "odop-ambassador"
  }
];

export default function BlogPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-900 via-emerald-800 to-green-900"
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
                className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
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

          {/* Scroll Indicator - Moved below search bar */}
          <motion.div
            className="absolute bottom-0 -mb-20 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-white rounded-full mt-2"
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Blog Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {['All', 'Sustainability', 'Events', 'Achievements', 'Innovation', 'Community'].map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 rounded-full bg-green-50 text-green-800 hover:bg-green-100 transition-colors duration-300"
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleBlogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full">
                      {blog.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">{blog.date}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800 hover:text-green-600 transition-colors duration-300">
                    <Link href={`/blogs/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                  >
                    Read More
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-green-800 to-emerald-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest updates, news, and insights from Green Business Initiative LLP.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-full bg-white/10 backdrop-blur-lg text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="px-8 py-3 bg-white text-green-800 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 