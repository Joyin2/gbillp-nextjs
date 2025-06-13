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
      <svg className="w-8 h-8 premium-icon" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
  },
  {
    title: 'Distinctive Flavor',
    description: 'Renowned for its unique taste, Sylheti Chai holds a special place in the hearts of tea lovers.',
    icon: (
      <svg className="w-8 h-8 premium-icon" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
  {
    title: 'Expert Collaboration',
    description: 'Crafted in collaboration with expert Sylheti tea-makers for an authentic experience.',
    icon: (
      <svg className="w-8 h-8 premium-icon" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 7c0-2.21-1.79-4-4-4S8 4.79 8 7s1.79 4 4 4 4-1.79 4-4zm-4 6c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/>
      </svg>
    ),
  },
  {
    title: 'Sensory Delight',
    description: 'From leaf selection to brewing, every step is designed to delight the senses and transport you to Sylhet.',
    icon: (
      <svg className="w-8 h-8 premium-icon" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    ),
  },
];

export default function SylhetiChaiwalaPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => { setIsLoaded(true); }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
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
        {/* Animated floating tea cups, leaves, and steam */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.18 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="absolute left-1/4 top-1/3 w-16 h-16 bg-amber-500/30 rounded-full flex items-center justify-center"
            animate={{ y: [0, 40, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.5 3H6c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h12.5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM18 19H6V5h12v14z"/>
            </svg>
          </motion.div>
          <motion.div
            className="absolute right-1/4 top-1/4 w-14 h-14 bg-green-500/30 rounded-full flex items-center justify-center"
            animate={{ y: [0, -30, 0], rotate: [0, -10, 10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          >
            <svg className="w-7 h-7 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </motion.div>
          <motion.div
            className="absolute left-1/3 bottom-1/4 w-18 h-18 bg-blue-500/30 rounded-full flex items-center justify-center"
            animate={{ y: [0, 50, 0], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <svg className="w-9 h-9 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </motion.div>
          <motion.div
            className="absolute right-1/2 bottom-1/3 text-7xl"
            animate={{ y: [0, 30, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          >🍵</motion.div>
        </motion.div>
        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              initial={{ letterSpacing: '0.1em' }}
              animate={{ letterSpacing: ['0.1em', '0.25em', '0.1em'] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            >Sylheti Chaiwala</motion.span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.span
              initial={{ opacity: 0.7 }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >Tea Mastery in Every Sip</motion.span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a
              href="#about"
              className="inline-block button-gradient text-white py-3 px-8 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-yellow-500/20 transform hover:-translate-y-1"
            >
              Discover More
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Image
                src={sylhetiChaiImg}
                alt="Sylheti Chaiwala"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-4xl font-bold mb-6">Tea Mastery in Every Sip</h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                "Sylheti Chaiwala" embodies the artistry of Sylheti tea-making, a tradition passed down through generations. Renowned for its distinctive flavor, this tea holds a special place in the hearts of Sylheti people.
              </p>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Collaborating with expert Sylheti tea-makers, we're dedicated to bringing you an authentic taste of this cherished brew. From the careful selection of leaves to the precise brewing process, every step ensures a cup that delights the senses.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Stay tuned as we prepare to unveil this unique Sylheti tea experience, promising to transport you to the vibrant streets and bustling tea stalls of Sylhet with each sip.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Sylheti Chaiwala?</h2>
            <div className="h-1 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200 w-24">
              <motion.div
                className="h-full w-full bg-gradient-to-r from-yellow-800 to-amber-400"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 relative bg-gradient-to-br from-[#b2e63a]/6 via-gray-50 to-[#1baf0a]/6 border border-[#b2e63a]/12 hover:border-[#1baf0a]/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#1baf0a]/12 group">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#b2e63a]/2 to-[#1baf0a]/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-yellow-800 to-amber-400 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Experience Authentic Sylheti Tea
          </motion.h2>
          <motion.p
            className="text-xl text-yellow-100 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Be among the first to savor the artistry and tradition of Sylheti Chaiwala. Stay tuned for our launch!
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/contact"
              className="bg-white text-yellow-800 hover:bg-yellow-50 py-3 px-8 rounded-full font-medium transition duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              Contact Us
            </Link>
            <Link
              href="/products"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 py-3 px-8 rounded-full font-medium transition duration-300 transform hover:-translate-y-1"
            >
              View All Products
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 