'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Import plantation images from Supabase
const orange = "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/Plantation/orange.jpeg";
const orangeProduct = "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/products/orange.png";

const plantationFeatures = [
  {
    title: "Sustainable Cultivation",
    description: "We implement eco-friendly farming practices that preserve the environment while producing high-quality citrus fruits. Our methods ensure minimal environmental impact and maximum yield.",
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    title: "Expert Team",
    description: "Our team consists of experienced agriculturists and horticulturists dedicated to implementing innovative and efficient orange and fruits farming techniques.",
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    title: "Local Partnership",
    description: "We work closely with local landowners and communities, ensuring sustainable practices and community involvement in our plantation initiatives.",
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m3 5.197V9a3 3 0 00-3-3v4.354a4 4 0 00-3 0V6a3 3 0 00-3 3v12.197" />
      </svg>
    )
  },
  {
    title: "Quality Assurance",
    description: "Our fruits are grown with technical support from the Northeast Biodiversity Conservation and Research Center, Assam, ensuring the highest quality standards.",
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

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

export default function PlantationPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroText, setHeroText] = useState<HeroText | null>(null);
  const [heroLoading, setHeroLoading] = useState(true);

  useEffect(() => {
    setIsLoaded(true);
    fetchHeroText();
  }, []);

  const fetchHeroText = async () => {
    try {
      const heroTextDoc = doc(db, 'heroTexts', 'products-plantation');
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

  return (
    <div className="min-h-screen">
      {/* Hero Section - Rice Page Style */}
      <section className="relative w-full h-screen flex items-center overflow-hidden">
        {/* Animated plantation gradient background */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ background: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)' }}
          animate={{ background: [
            'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
            'linear-gradient(135deg, #96e6a1 0%, #d4fc79 100%)',
            'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)'
          ] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Responsive Animated falling plants and sparkles */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none hidden lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="absolute left-1/4 top-1/3 text-6xl"
            animate={{ y: [0, 60, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          >🌱</motion.div>
          <motion.div
            className="absolute right-1/4 top-1/4 text-5xl"
            animate={{ y: [0, 80, 0], rotate: [0, -10, 10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          >☀️</motion.div>
          <motion.div
            className="absolute left-1/3 bottom-1/4 text-7xl"
            animate={{ y: [0, 100, 0], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >🍊</motion.div>
          <motion.div
            className="absolute right-1/2 bottom-1/3 text-6xl"
            animate={{ y: [0, 90, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          >🍋</motion.div>
        </motion.div>

        {/* Hero Content - Rice Page Style */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex flex-col justify-center">
          <div className="max-w-4xl lg:max-w-5xl text-center w-full mx-auto">
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-white drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {heroLoading ? (
                <div className="animate-pulse">
                  <div className="h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 bg-white/20 rounded-lg"></div>
                </div>
              ) : heroText ? (
                <>
                  <motion.span
                    initial={{ letterSpacing: '0.05em' }}
                    animate={{ letterSpacing: ['0.05em', '0.15em', '0.05em'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                    className="hidden md:inline"
                  >{heroText.title}</motion.span>
                  <span className="md:hidden">{heroText.title}</span>
                </>
              ) : null}
            </motion.h1>
            {heroLoading ? (
              <motion.div
                className="px-4 sm:px-0 mb-8 sm:mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="animate-pulse">
                  <div className="h-6 sm:h-8 bg-white/20 rounded-lg mb-2"></div>
                  <div className="h-6 sm:h-8 bg-white/10 rounded-lg"></div>
                </div>
              </motion.div>
            ) : heroText && heroText.subtitle ? (
              <motion.p
                className="text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 leading-relaxed drop-shadow-md px-4 sm:px-0 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {heroText.subtitle}
              </motion.p>
            ) : null}
          </div>
        </div>
      </section>

      {/* Vision Section - Rice Page Style */}
      <section id="vision" className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-gray-50/30 to-emerald-50/50 overflow-hidden">
        {/* Background elements like rice page */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(178,230,58,0.05),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(27,175,10,0.05),transparent_50%)] pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header with rice page animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-4"
            >
              Our Vision
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
              viewport={{ once: true }}
              className="h-1 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden bg-gray-200"
            >
              <div className="h-full w-full bg-gradient-to-r from-[#b2e63a] to-[#1baf0a]"></div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xs sm:max-w-md md:max-w-4xl mx-auto px-4 leading-relaxed"
            >
              Green Business Initiative LLP aims to plant 100,000 oranges and 100,000 lemons in Cachar District within a year. Our objective is to develop an organic, commercially viable orange and Kaji Lemon (State Fruit of Assam) garden while minimizing the environmental and community impact of tourism.
            </motion.p>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:space-x-8 xl:space-x-12 items-center gap-8 sm:gap-10 md:gap-12 lg:gap-0">
            <motion.div
              className="w-full lg:w-2/5 order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[500px] w-full rounded-lg sm:rounded-xl overflow-hidden shadow-xl mx-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none bg-white p-3 sm:p-4 md:p-6">
                <Image
                  src={orangeProduct}
                  alt="Orange Plantation"
                  fill
                  className="object-contain"
                  sizes="(max-width: 480px) 90vw, (max-width: 768px) 80vw, (max-width: 1024px) 45vw, 40vw"
                  priority
                />
              </div>
            </motion.div>

            <motion.div
              className="w-full lg:w-3/5 order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold mb-4 sm:mb-6 text-center lg:text-left leading-tight px-4 lg:px-0">Current Progress</h3>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-base xl:text-lg mb-4 sm:mb-6 leading-relaxed text-center lg:text-left px-4 lg:px-0 max-w-2xl mx-auto lg:mx-0">
                To advance our plan, we have already planted:
              </p>
              <ul className="space-y-4 sm:space-y-6 px-4 lg:px-0">
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] mr-3 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-base xl:text-lg leading-relaxed">1,000 grafted oranges (Khashi Mandarin), sourced with technical support from the Northeast Biodiversity Conservation and Research Center, Assam</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] mr-3 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-base xl:text-lg leading-relaxed">1,500 Kaji Lemons with support from the Agricultural Department of Assam</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - Rice Page Style */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-gray-50/30 to-emerald-50/50 overflow-hidden">
        {/* Background elements like rice page */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(178,230,58,0.05),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(27,175,10,0.05),transparent_50%)] pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header with rice page animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-4"
            >
              Growing Vibrant Oranges and Lemons Sustainably
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
              viewport={{ once: true }}
              className="h-1 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden bg-gray-200"
            >
              <div className="h-full w-full bg-gradient-to-r from-[#b2e63a] to-[#1baf0a]"></div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-4"
            >
              From sustainable cultivation to quality assurance, discover how we're revolutionizing citrus farming with eco-friendly practices.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {plantationFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="flex justify-center mb-4 sm:mb-6">
                    <div style={{
                      background: 'linear-gradient(45deg, #b2e63a, #1baf0a)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      color: '#1baf0a' // Fallback for browsers that don't support background-clip
                    }}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-center">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Rice Page Style */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-green-800 to-emerald-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Join Our Sustainable Journey
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-100 max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Be part of our mission to create a sustainable future through eco-friendly agriculture and community development.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Link
              href="/contact"
              className="bg-white text-emerald-700 hover:bg-gray-100 py-2.5 px-6 sm:py-3 sm:px-8 rounded-full font-medium transition duration-300 transform hover:-translate-y-0.5 shadow-lg uppercase text-sm sm:text-base"
            >
              Contact Us
            </Link>
            <Link
              href="/products"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 py-2.5 px-6 sm:py-3 sm:px-8 rounded-full font-medium transition duration-300 transform hover:-translate-y-0.5 uppercase text-sm sm:text-base"
            >
              View All Products
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 