'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Import dry bean image
import dryBean from '@/images/dry bean/dry bean.jpg';

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
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
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
        {/* Animated floating beans and leaves */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.18 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="absolute left-1/4 top-1/3 text-7xl"
            animate={{ y: [0, 40, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          >🫘</motion.div>
          <motion.div
            className="absolute right-1/4 top-1/4 text-6xl"
            animate={{ y: [0, -30, 0], rotate: [0, -10, 10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          >🌱</motion.div>
          <motion.div
            className="absolute left-1/3 bottom-1/4 text-8xl"
            animate={{ y: [0, 50, 0], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >🫘</motion.div>
          <motion.div
            className="absolute right-1/2 bottom-1/3 text-7xl"
            animate={{ y: [0, 30, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          >🌱</motion.div>
        </motion.div>
        
        {/* Content */}
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 text-green-900 drop-shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              initial={{ letterSpacing: '0.1em' }}
              animate={{ letterSpacing: ['0.1em', '0.25em', '0.1em'] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            >Dry Bean (Forash)</motion.span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-green-900 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.span
              initial={{ opacity: 0.7 }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >Nourishing Staple, Hearty & Versatile</motion.span>
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
              className="relative h-[600px] rounded-lg overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Image
                src={dryBean}
                alt="Dry Bean (Forash)"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-4xl font-bold mb-6">Our Premium Dry Beans</h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                "Forash," known as the French bean, originates from France, earning its Sylheti name. Cultivated during Assam's winter and in greater Sylhet, Bangladesh, it embodies regional agricultural traditions.
              </p>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Directly sourced from local farmers, these beans are sun-dried to preserve their natural flavor. Packed with care, they offer a taste of authenticity, a testament to sustainable farming practices and community livelihoods.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                With each bite, savor the essence of centuries-old cultivation methods, bringing a touch of tradition to your culinary endeavors. Enjoy the simplicity and purity of nature's bounty, encapsulated in these sun-dried treasures from the heartlands of Assam and Sylhet.
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Our Dry Beans?</h2>
            <div className="h-1 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200 w-24">
              <motion.div 
                className="h-full w-full bg-gradient-to-r from-green-800 to-emerald-600"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
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
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
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
            Experience Authentic Taste
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-100 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Bring the authentic taste of traditional dry beans to your table. Experience the rich heritage and natural flavors preserved through generations.
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