'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Import tezpatta image from Supabase
const tezpattaImg = "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/products/tezpatta.png";

const features = [
  {
    title: 'Aromatic Excellence',
    description: 'Infuses dishes with a rich, distinctive aroma and flavor, elevating every meal.',
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
  {
    title: 'Pure & Organic',
    description: 'Naturally cultivated by local farmers, ensuring authenticity and quality.',
    icon: (
      <svg className="w-8 h-8 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
  },
  {
    title: 'Culinary Versatility',
    description: 'Perfect for tea, rice, biryani, curries, and desserts—an essential in every kitchen.',
    icon: (
      <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.5 3H6c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h12.5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM18 19H6V5h12v14z"/>
      </svg>
    ),
  },
  {
    title: 'Traditional Heritage',
    description: 'Preserves the essence of regional culinary heritage from Northeast India and Sylhet.',
    icon: (
      <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
  },
];

const culinaryUses = [
  {
    title: 'Black Tea',
    description: 'Adds a subtle, aromatic note to traditional black tea.',
    icon: '🍵',
  },
  {
    title: 'Polaw Rice & Biryani',
    description: 'Essential for flavoring rice dishes and biryanis with its signature aroma.',
    icon: '🍚',
  },
  {
    title: 'Curries',
    description: 'Enhances spicy curries—dal, vegetable, meat, and fish—with depth and fragrance.',
    icon: '🍛',
  },
  {
    title: 'Desserts',
    description: 'Used in sweets and desserts for a unique, aromatic twist.',
    icon: '🍮',
  },
];

export default function TezpattaPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => { setIsLoaded(true); }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ background: 'linear-gradient(135deg, #14532d 0%, #047857 100%)' }}
          animate={{ background: [
            'linear-gradient(135deg, #14532d 0%, #047857 100%)',
            'linear-gradient(135deg, #047857 0%, #14532d 100%)',
            'linear-gradient(135deg, #14532d 0%, #047857 100%)'
          ] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Animated floating leaves (optional, subtle) */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="absolute left-1/4 top-1/3 w-16 h-16 bg-green-500/30 rounded-full flex items-center justify-center"
            animate={{ y: [0, 30, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </motion.div>
          <motion.div
            className="absolute right-1/4 top-1/4 w-14 h-14 bg-emerald-500/30 rounded-full flex items-center justify-center"
            animate={{ y: [0, -20, 0], rotate: [0, -10, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          >
            <svg className="w-7 h-7 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </motion.div>
          <motion.div
            className="absolute left-1/3 bottom-1/4 w-18 h-18 bg-teal-500/30 rounded-full flex items-center justify-center"
            animate={{ y: [0, 40, 0], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <svg className="w-9 h-9 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </motion.div>
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
            >Aromatic Tezpatta</motion.span>
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
            >Essence of Aromatic Delight — Pure, Natural & Organic Nutritional Powerhouse</motion.span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a
              href="#about"
              className="inline-block button-gradient text-white py-3 px-8 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-green-500/20 transform hover:-translate-y-1"
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
                src={tezpattaImg}
                alt="Aromatic Tezpatta (Bay Leaf)"
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
              <h2 className="text-4xl font-bold mb-6">Essence of Aromatic Delight</h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Tezpata, the aromatic bay leaf, is a culinary gem cherished in Northeast India and Sylhet, Bangladesh. Distinguished by its larger size and vibrant green hue with three prominent veins, the Indian variation infuses dishes with rich flavor.
              </p>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                From Black Tea to Polaw Rice, Biryani, and indulgent Desserts, Tezpata elevates diverse cuisines, enhancing spicy curries like Dal, Vegetable, Meat, and Fish. Its natural and organic cultivation by local farmers ensures authenticity and quality, preserving traditional methods.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                With each leaf, Tezpata adds a burst of aromatic delight, enriching the taste of your cooked creations and perpetuating the essence of regional culinary heritage.
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Our Tezpatta?</h2>
            <div className="h-1 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200 w-24">
              <motion.div
                className="h-full w-full bg-gradient-to-r from-green-800 to-emerald-600"
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
                <div className="w-16 h-16 bg-gradient-to-br from-[#b2e63a]/20 to-[#31cc20]/20 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culinary Uses Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Culinary Applications</h2>
            <div className="h-1 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200 w-24">
              <motion.div
                className="h-full w-full bg-gradient-to-r from-green-800 to-emerald-600"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {culinaryUses.map((use, index) => (
              <motion.div
                key={use.title}
                className="bg-gray-50 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-4xl mb-4">{use.icon}</div>
                <h3 className="text-xl font-bold mb-3">{use.title}</h3>
                <p className="text-gray-600">{use.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-800 to-emerald-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Experience Aromatic Delight
          </motion.h2>
          <motion.p
            className="text-xl text-gray-100 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Bring the authentic taste of aromatic tezpatta to your kitchen. Experience the rich heritage and unique flavors cherished for generations.
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
              className="bg-white text-emerald-700 hover:bg-gray-100 py-3 px-8 rounded-full font-medium transition duration-300 transform hover:-translate-y-1 shadow-lg"
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