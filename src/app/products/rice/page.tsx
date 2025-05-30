'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Import rice images
import kalijira from '@/images/rice/kalijira.jpg';
import hariNarayan from '@/images/rice/hari narayan.jpg';
import whiteSticky from '@/images/rice/white sticky rice.jpg';
import redSticky from '@/images/rice/red sticky rice.jpg';
import steamRice from '@/images/rice/steam rice.jpg';
import gobindobhog from '@/images/rice/gobindobhog.jpg';
import sugandhaBasmati from '@/images/rice/sugandha basmati.jpg';
import basmatiWhiteSella from '@/images/rice/basmati white sella.jpg';
import basmatiGoldenSella from '@/images/rice/basmati golden sella.jpg';
import basmatiRaw from '@/images/rice/basmati raw.jpg';
import pusa1718 from '@/images/rice/pusa 1718.jpg';
import redRiceKaliMukri from '@/images/rice/red rice kali mukri.jpg';

const riceVarieties = [
  {
    name: "Kalijira Rice",
    description: "Often called the 'prince of rice,' this premium Bangladeshi variety is known for its small, aromatic grains and delicate texture. Perfect for festive dishes like pulao and biryani.",
    image: kalijira,
    features: ["Small aromatic grains", "Delicate texture", "Quick cooking time", "Subtle fragrance"]
  },
  {
    name: "Hari Narayan Rice",
    description: "A premium-quality rice known for its superior taste, aroma, and texture. Sourced from the finest paddy fields, it ensures a rich culinary experience.",
    image: hariNarayan,
    features: ["Superior taste", "Rich aroma", "Premium quality", "Versatile usage"]
  },
  {
    name: "White Sticky Rice (Gondi Biroin)",
    description: "A traditional delicacy cherished for its soft, sticky texture and unique taste. Perfect for steaming and pairing with curries or sweet toppings.",
    image: whiteSticky,
    features: ["Soft texture", "Sticky consistency", "Traditional delicacy", "Cultural significance"]
  },
  {
    name: "Red Sticky Rice (Kaki Biroin)",
    description: "A traditional delicacy from Northeast India, featuring a natural reddish hue due to anthocyanins. Rich in antioxidants and perfect for desserts and festive dishes.",
    image: redSticky,
    features: ["Antioxidant-rich", "Natural red hue", "Nutrient-dense", "Festive favorite"]
  },
  {
    name: "Steam Rice",
    description: "A staple dish prepared by cooking rice with water vapor, resulting in soft, fluffy grains. Versatile and perfect for various cuisines.",
    image: steamRice,
    features: ["Soft texture", "Fluffy grains", "Gluten-free", "Nutrient-retaining"]
  },
  {
    name: "Gobindobhog Rice",
    description: "A premium, aromatic variety of short-grain rice native to West Bengal. Renowned for its rich flavor and delicate fragrance.",
    image: gobindobhog,
    features: ["Rich flavor", "Delicate fragrance", "Short-grain", "Traditional favorite"]
  },
  {
    name: "Sugandha Basmati Rice",
    description: "A premium long-grain rice known for its rich aroma and delightful taste. Perfect for biryanis, pulao, and gourmet dishes.",
    image: sugandhaBasmati,
    features: ["Rich aroma", "Long-grain", "Non-sticky", "Gourmet quality"]
  },
  {
    name: "Basmati Rice (White Sella)",
    description: "A premium parboiled variety known for its distinct aroma and non-sticky texture. Ideal for biryanis and festive dishes.",
    image: basmatiWhiteSella,
    features: ["Parboiled", "Distinct aroma", "Non-sticky", "Nutrient-rich"]
  },
  {
    name: "Basmati Rice (Golden Sella)",
    description: "A premium variety known for its golden hue and enticing aroma. Parboiled to enhance nutritional value while maintaining perfect grain shape.",
    image: basmatiGoldenSella,
    features: ["Golden hue", "Enticing aroma", "Parboiled", "Shape-retaining"]
  },
  {
    name: "Basmati Rice (Raw)",
    description: "A premium, long-grain variety known for its unique aroma and delicate flavor. Perfect for biryanis and global cuisines.",
    image: basmatiRaw,
    features: ["Unique aroma", "Delicate flavor", "Long-grain", "Gluten-free"]
  },
  {
    name: "PUSA - Basmati Rice",
    description: "An authentic basmati variety known for its premium quality and traditional taste. Perfect for special occasions and gourmet cooking.",
    image: pusa1718,
    features: ["Authentic variety", "Premium quality", "Traditional taste", "Special occasions"]
  },
  {
    name: "Red Rice (Kali Mukri)",
    description: "A nutrient-rich variety with a reddish-brown hue due to its anthocyanin content. Packed with antioxidants and essential minerals.",
    image: redRiceKaliMukri,
    features: ["Antioxidant-rich", "Nutrient-dense", "Heart-healthy", "Traditional variety"]
  }
];

export default function RicePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Animated rice/sparkle gradient background */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ background: 'linear-gradient(135deg, #fffbe6 0%, #ffe066 100%)' }}
          animate={{ background: [
            'linear-gradient(135deg, #fffbe6 0%, #ffe066 100%)',
            'linear-gradient(135deg, #ffe066 0%, #fffbe6 100%)',
            'linear-gradient(135deg, #fffbe6 0%, #ffe066 100%)'
          ] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Animated falling rice and sparkles */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.18 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="absolute left-1/4 top-1/3 text-7xl"
            animate={{ y: [0, 60, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          >🍚</motion.div>
          <motion.div
            className="absolute right-1/4 top-1/4 text-6xl"
            animate={{ y: [0, 80, 0], rotate: [0, -10, 10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          >✨</motion.div>
          <motion.div
            className="absolute left-1/3 bottom-1/4 text-8xl"
            animate={{ y: [0, 100, 0], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >🍚</motion.div>
          <motion.div
            className="absolute right-1/2 bottom-1/3 text-7xl"
            animate={{ y: [0, 90, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          >✨</motion.div>
        </motion.div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 text-yellow-800 drop-shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              initial={{ letterSpacing: '0.1em' }}
              animate={{ letterSpacing: ['0.1em', '0.25em', '0.1em'] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            >Aromatic Rice</motion.span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-yellow-800 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.span
              initial={{ opacity: 0.7 }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >A Collection of Premium Aromatic Rice Varieties</motion.span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a
              href="#varieties"
              className="inline-block button-gradient text-white py-3 px-8 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-green-500/20 transform hover:-translate-y-1"
            >
              Discover More
            </a>
          </motion.div>
        </div>
      </section>

      {/* Rice Varieties Section */}
      <section id="varieties" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Premium Rice Collection</h2>
            <div className="h-1 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200 w-24">
              <motion.div 
                className="h-full w-full bg-gradient-to-r from-green-800 to-emerald-600"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              From aromatic basmati to traditional sticky rice, each variety in our collection brings its unique character to your table.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {riceVarieties.map((rice, index) => (
              <motion.div
                key={rice.name}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative h-80 w-full">
                  <Image
                    src={rice.image}
                    alt={rice.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{rice.name}</h3>
                  <p className="text-gray-600 mb-6">{rice.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {rice.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
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
            Experience Premium Quality
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-100 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Elevate your culinary experience with our premium selection of aromatic rice varieties, each bringing its unique character to your table.
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