'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Import pickle images
import boromar from '@/images/pickle/boromar.jpeg';
import indianOlive from '@/images/pickle/indian olive pickles.jpg';
import freshGarlic from '@/images/pickle/fresh garlic pickle.jpg';
import bambooShoot from '@/images/pickle/bamboo shoot.jpg';
import freshGinger from '@/images/pickle/fresh ginger.jpg';

const pickleVarieties = [
  {
    name: "Indian Olive Pickles",
    description: "Indian Olive Pickles capture the authentic flavors of traditional Indian cuisine, bringing a taste of heritage to your table. Made with fresh, hand-picked Indian olives and blended with a unique mix of spices, these pickles offer a tangy and spicy taste experience that is truly unparalleled. Crafted using only natural ingredients and mustard oil, Boromar's pickles ensure quality and taste in every bite.",
    image: indianOlive,
    features: [
      "Made with fresh, hand-picked Indian olives",
      "Blended with unique mix of spices",
      "Tangy and spicy taste experience",
      "Natural ingredients and mustard oil",
      "Perfect as a condiment or side dish"
    ]
  },
  {
    name: "Fresh Garlic Pickle",
    description: "Fresh Garlic Pickle is a culinary delight that brings a burst of flavor to your meals. Made from the finest fresh garlic, this pickle is blended with a unique mix of spices and preserved in mustard oil to maintain its robust taste. Each jar captures the essence of traditional Northeastern Indian pickling methods, ensuring authenticity in every bite.",
    image: freshGarlic,
    features: [
      "Made from finest fresh garlic",
      "Preserved in mustard oil",
      "Traditional Northeastern Indian methods",
      "Perfect accompaniment to rice and bread",
      "Robust and authentic taste"
    ]
  },
  {
    name: "Bamboo Shoot Pickle",
    description: "Bamboo Shoot Pickle offers a unique and exotic taste experience. Crafted from tender bamboo shoots and traditional spices, this pickle combines a delightful crunch with tangy and spicy flavors. Made with natural ingredients and no artificial preservatives, it reflects our commitment to quality and authenticity.",
    image: bambooShoot,
    features: [
      "Made from tender bamboo shoots",
      "Combines crunch with tangy flavors",
      "No artificial preservatives",
      "Natural ingredients",
      "Unique and exotic taste"
    ]
  },
  {
    name: "Fresh Ginger Pickle",
    description: "Fresh Ginger Pickle is a delightful blend of fresh, crisp ginger and traditional spices, creating a perfect balance of tangy and spicy flavors. Made with all-natural ingredients and mustard oil, this pickle captures the essence of homemade goodness. Each bite offers a burst of invigorating flavor, making it a versatile addition to any meal.",
    image: freshGinger,
    features: [
      "Made with fresh, crisp ginger",
      "Perfect balance of tangy and spicy",
      "All-natural ingredients",
      "Preserved in mustard oil",
      "Versatile addition to any meal"
    ]
  }
];

export default function PicklesPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Animated pickle gradient background */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ background: 'linear-gradient(135deg, #b2f7ef 0%, #f7d6e0 50%, #ffe066 100%)' }}
          animate={{ background: [
            'linear-gradient(135deg, #b2f7ef 0%, #f7d6e0 50%, #ffe066 100%)',
            'linear-gradient(135deg, #ffe066 0%, #b2f7ef 50%, #f7d6e0 100%)',
            'linear-gradient(135deg, #f7d6e0 0%, #ffe066 50%, #b2f7ef 100%)',
            'linear-gradient(135deg, #b2f7ef 0%, #f7d6e0 50%, #ffe066 100%)'
          ] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Animated bouncing jars, swirling spices, and cucumbers */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.18 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="absolute left-1/4 top-1/3 text-7xl"
            animate={{ y: [0, -40, 0, 40, 0], rotate: [0, 10, -10, 0, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >🫙</motion.div>
          <motion.div
            className="absolute right-1/4 top-1/4 text-6xl"
            animate={{ rotate: [0, 360, 0], y: [0, 20, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          >🌶️</motion.div>
          <motion.div
            className="absolute left-1/3 bottom-1/4 text-8xl"
            animate={{ y: [0, 50, 0], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >🥒</motion.div>
          <motion.div
            className="absolute right-1/2 bottom-1/3 text-7xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          >💦</motion.div>
        </motion.div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        
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
            >Pickles</motion.span>
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
            >Authentic Flavours, Handcrafted Goodness</motion.span>
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

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={boromar}
                  alt="Boromar Pickles"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-4xl font-bold mb-6">About Our Pickles</h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Our range of products embodies the essence of freshness and authenticity. From our tangy and flavorful pickles made with hand-picked ingredients to our crisp and aromatic fresh ginger and garlic, each item is carefully selected and crafted to deliver unparalleled taste and quality.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                With a commitment to sourcing the finest ingredients and maintaining traditional methods of preparation, our products promise to elevate your culinary experience and bring a touch of gourmet excellence to every meal.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Varieties Section */}
      <section id="varieties" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Tangy Bliss in Jars</h2>
            <div className="h-1 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200 w-24">
              <motion.div 
                className="h-full w-full bg-gradient-to-r from-green-800 to-emerald-600"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here are some varieties of our pickles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {pickleVarieties.map((pickle, index) => (
              <motion.div
                key={pickle.name}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={pickle.image}
                    alt={pickle.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{pickle.name}</h3>
                  <p className="text-gray-600 mb-6">{pickle.description}</p>
                  <ul className="space-y-2">
                    {pickle.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-emerald-600 mr-2">•</span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
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
            Experience the Authentic Taste
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-100 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Indulge in the rich heritage and culinary traditions of Northeast India with our premium pickles.
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