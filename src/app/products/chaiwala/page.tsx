'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Import Sylheti Chaiwala image from Supabase
const sylhetiChaiImg = "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/sylotichawla/syl.jpeg";

const features = [
  {
    title: 'Generational Artistry',
    description: 'Sylheti tea-making is a tradition passed down through generations, ensuring every cup is steeped in heritage.',
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: 'Distinctive Flavor',
    description: 'Renowned for its unique taste, Sylheti Chai holds a special place in the hearts of tea lovers.',
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: 'Expert Collaboration',
    description: 'Crafted in collaboration with expert Sylheti tea-makers for an authentic experience.',
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Sensory Delight',
    description: 'From leaf selection to brewing, every step is designed to delight the senses and transport you to Sylhet.',
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

export default function SylhetiChaiwalaPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => { setIsLoaded(true); }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section - Rice Page Style */}
      <section className="relative w-full h-screen flex items-center overflow-hidden">
        {/* Animated warm tea gradient background */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ background: 'linear-gradient(135deg, #c2b280 0%, #e6b980 100%)' }}
          animate={{ background: [
            'linear-gradient(135deg, #c2b280 0%, #e6b980 100%)',
            'linear-gradient(135deg, #e6b980 0%, #c2b280 100%)',
            'linear-gradient(135deg, #c2b280 0%, #e6b980 100%)'
          ] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Responsive Animated floating tea elements and sparkles */}
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
          >🍵</motion.div>
          <motion.div
            className="absolute right-1/4 top-1/4 text-5xl"
            animate={{ y: [0, 80, 0], rotate: [0, -10, 10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          >🍃</motion.div>
          <motion.div
            className="absolute left-1/3 bottom-1/4 text-7xl"
            animate={{ y: [0, 100, 0], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >☕</motion.div>
          <motion.div
            className="absolute right-1/2 bottom-1/3 text-6xl"
            animate={{ y: [0, 90, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          >✨</motion.div>
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
              <motion.span
                initial={{ letterSpacing: '0.05em' }}
                animate={{ letterSpacing: ['0.05em', '0.15em', '0.05em'] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                className="hidden md:inline"
              >Sylheti Chaiwala</motion.span>
              <span className="md:hidden">Sylheti Chaiwala</span>
            </motion.h1>
            <motion.p
              className="text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 leading-relaxed drop-shadow-md px-4 sm:px-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Tea Mastery in Every Sip
            </motion.p>
          </div>
        </div>
      </section>

      {/* About Section - Rice Page Style */}
      <section id="about" className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-gray-50/30 to-emerald-50/50 overflow-hidden">
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
              Tea Mastery in Every Sip
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
              "Sylheti Chaiwala" embodies the artistry of Sylheti tea-making, a tradition passed down through generations with distinctive flavor and heritage.
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
                  src={sylhetiChaiImg}
                  alt="Sylheti Chaiwala"
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
              <div className="space-y-4 sm:space-y-6 text-center lg:text-left px-4 lg:px-0">
                <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-base xl:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Collaborating with expert Sylheti tea-makers, we're dedicated to bringing you an authentic taste of this cherished brew. From the careful selection of leaves to the precise brewing process, every step ensures a cup that delights the senses.
                </p>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-base xl:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Stay tuned as we prepare to unveil this unique Sylheti tea experience, promising to transport you to the vibrant streets and bustling tea stalls of Sylhet with each sip.
                </p>
              </div>
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
              Why Choose Sylheti Chaiwala?
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
              From generational artistry to sensory delight, discover what makes our Sylheti tea experience truly exceptional.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => (
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
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-yellow-800 to-amber-400 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Experience Authentic Sylheti Tea
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-yellow-100 max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Be among the first to savor the artistry and tradition of Sylheti Chaiwala. Stay tuned for our launch!
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
              className="bg-white text-yellow-800 hover:bg-yellow-50 py-2.5 px-6 sm:py-3 sm:px-8 rounded-full font-medium transition duration-300 transform hover:-translate-y-0.5 shadow-lg uppercase text-sm sm:text-base"
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