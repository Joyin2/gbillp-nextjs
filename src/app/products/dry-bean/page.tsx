'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Import dry bean image from Supabase
const dryBean = "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/dry%20bean/dry%20bean.jpg";

const features = [
  {
    title: "Traditional Origin",
    description: "Originating from France, known as 'Forash' in Sylheti, these beans carry a rich cultural heritage.",
    icon: "🌍"
  },
  {
    title: "Natural Processing",
    description: "Sun-dried to preserve natural flavors and nutritional value, maintaining the authentic taste.",
    icon: "☀️"
  },
  {
    title: "Local Sourcing",
    description: "Directly sourced from local farmers in Assam and Sylhet, supporting community livelihoods.",
    icon: "👨‍🌾"
  },
  {
    title: "Sustainable Farming",
    description: "Grown using traditional methods that respect the environment and promote sustainable agriculture.",
    icon: "🌱"
  }
];

export default function DryBeanPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Mobile-Optimized Hero Section */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden">
        {/* Animated earth-tone gradient background */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ background: 'linear-gradient(135deg, #a2836e 0%, #6b8e23 100%)' }}
          animate={{ background: [
            'linear-gradient(135deg, #a2836e 0%, #6b8e23 100%)',
            'linear-gradient(135deg, #6b8e23 0%, #a2836e 100%)',
            'linear-gradient(135deg, #a2836e 0%, #6b8e23 100%)'
          ] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Animated elements - Hidden on mobile for performance */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none hidden xl:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="absolute left-1/4 top-1/3 w-12 h-12 bg-amber-500/25 rounded-full flex items-center justify-center"
            animate={{ y: [0, 30, 0], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </motion.div>
          <motion.div
            className="absolute right-1/4 top-1/4 w-10 h-10 bg-green-500/25 rounded-full flex items-center justify-center"
            animate={{ y: [0, -25, 0], rotate: [0, -8, 8, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          >
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </motion.div>
          <motion.div
            className="absolute left-1/3 bottom-1/4 w-14 h-14 bg-orange-500/25 rounded-full flex items-center justify-center"
            animate={{ y: [0, 40, 0], rotate: [0, 12, -12, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <svg className="w-7 h-7 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </motion.div>
          <motion.div
            className="absolute right-1/2 bottom-1/3 text-5xl"
            animate={{ y: [0, 25, 0], rotate: [0, 4, -4, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          >🌱</motion.div>
        </motion.div>

        {/* Mobile-First Hero Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-20 md:py-24">
          <div className="max-w-4xl text-center w-full mx-auto">
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 text-green-900 drop-shadow-lg leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.span
                initial={{ letterSpacing: '0.02em' }}
                animate={{ letterSpacing: ['0.02em', '0.08em', '0.02em'] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse' }}
                className="hidden lg:inline"
              >Dry Bean (Forash)</motion.span>
              <span className="lg:hidden">Dry Bean (Forash)</span>
            </motion.h1>
            <motion.p
              className="text-green-800 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed drop-shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Nourishing Staple, Hearty & Versatile
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mobile-Optimized About Section */}
      <section id="about" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            <motion.div
              className="w-full lg:w-1/2 order-2 lg:order-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 w-full rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={dryBean}
                  alt="Dry Bean (Forash)"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>

            <motion.div
              className="w-full lg:w-1/2 order-1 lg:order-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-center lg:text-left leading-tight">Our Premium Dry Beans</h2>
              <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
                <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                  "Forash," known as the French bean, originates from France, earning its Sylheti name. Cultivated during Assam's winter and in greater Sylhet, Bangladesh, it embodies regional agricultural traditions.
                </p>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                  Directly sourced from local farmers, these beans are sun-dried to preserve their natural flavor. Packed with care, they offer a taste of authenticity, a testament to sustainable farming practices and community livelihoods.
                </p>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                  With each bite, savor the essence of centuries-old cultivation methods, bringing a touch of tradition to your culinary endeavors. Enjoy the simplicity and purity of nature's bounty, encapsulated in these sun-dried treasures from the heartlands of Assam and Sylhet.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mobile-Optimized Features Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white/30 to-emerald-50/50 overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(178,230,58,0.02),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(27,175,10,0.02),transparent_50%)] pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">Why Choose Our Dry Beans?</h2>
            <div className="h-0.5 sm:h-1 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden bg-gray-200 w-16 sm:w-20 md:w-24">
              <motion.div
                className="h-full w-full bg-gradient-to-r from-[#b2e63a] to-[#1baf0a]"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-sm sm:shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 text-center">{feature.icon}</div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile-Optimized Call to Action */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-green-800 to-emerald-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Experience Authentic Taste
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-100 max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Bring the authentic taste of traditional dry beans to your table. Experience the rich heritage and natural flavors preserved through generations.
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