"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import pickle from "../images/products/pickle.png"
import rice from "../images/products/rice.png"
import drybean from "../images/products/dry beans.png"
import orange from "../images/products/orange.png"
import dryhathkora from "../images/products/haatkora.png"
import tezpatta from "../images/products/tezpatta.png"
import handicraft from "../images/products/art & craft.png"

const products = [
  {
    id: 1,
    title: "Pickle",
    image: {pickle},
    description: "Organic, traditionally prepared pickles from locally sourced ingredients.",
    link: "/products/pickle"
  },
  {
    id: 2,
    title: "Rice",
    image: {rice},
    description: "Premium quality, sustainably grown rice varieties from the region.",
    link: "/products/rice"
  },
  {
    id: 3,
    title: "Dry Bean (Forash)",
    image: {drybean}, // This file doesn't exist, you may need to rename it or add it
    description: "Nutrient-rich dry beans cultivated using traditional farming methods.",
    link: "/products/dry-bean"
  },
  {
    id: 4,
    title: "Dry Hathkora",
    image: {dryhathkora}, // Updated to match existing file
    description: "Naturally dried hathkora with preserved authentic flavor and aroma.",
    link: "/products/dry-hathkora"
  },
  {
    id: 5,
    title: "Tezpatta",
    image: {tezpatta},
    description: "Fresh, aromatic bay leaves harvested from sustainable sources.",
    link: "/products/tezpatta"
  },
  {
    id: 6,
    title: "Decorative Handicraft",
    image: {handicraft}, // Updated to match existing file
    description: "Exquisite handcrafted items made by local artisans using eco-friendly materials.",
    link: "/products/handicraft"
  }
];

const ProductsSection = () => {
  const [activeProduct, setActiveProduct] = useState<number | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [autoplay, setAutoplay] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Filter categories
  const categories = ['all', 'food', 'spices', 'crafts'];
  
  // Map products to categories for filtering
  const productCategories = {
    1: 'food',     // Pickle
    2: 'food',     // Rice
    3: 'food',     // Dry Bean
    4: 'food',     // Dry Hathkora
    5: 'spices',   // Tezpatta
    6: 'crafts'    // Handicraft
  };
  
  // Filter products based on selected category
  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(product => productCategories[product.id as keyof typeof productCategories] === filter);
  
  // Autoplay functionality
  useEffect(() => {
    if (autoplay && filteredProducts.length > 0) {
      autoplayRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % filteredProducts.length);
      }, 3000); // Change product every 3 seconds
    }
    
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, filteredProducts, currentIndex]);
  
  // Pause autoplay on hover
  const pauseAutoplay = () => setAutoplay(false);
  const resumeAutoplay = () => setAutoplay(true);
  
  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollY = window.scrollY;
      const elements = containerRef.current.querySelectorAll('.parallax-item');
      
      elements.forEach((el, index) => {
        const speed = 1 + (index * 0.05);
        (el as HTMLElement).style.transform = `translateY(${scrollY * speed * 0.05}px)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };
  
  const filterVariants = {
    closed: { height: 0, opacity: 0 },
    open: { height: 'auto', opacity: 1 }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-emerald-100/30 blur-3xl"></div>
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-teal-100/40 blur-3xl"></div>
        <div className="absolute -bottom-48 left-1/4 w-80 h-80 rounded-full bg-emerald-50/50 blur-3xl"></div>
        
        {/* Organic shapes */}
        <svg className="absolute top-10 right-10 text-emerald-200/30 w-72 h-72 transform rotate-12" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M42.8,-62.2C54.9,-54.3,63.7,-41.1,69.2,-26.8C74.8,-12.4,77.2,3.2,73.2,17.1C69.3,31,59,43.3,46.5,52.2C33.9,61.1,19.2,66.7,3.1,64.3C-12.9,61.9,-30.3,51.5,-42.1,39C-53.9,26.4,-60.1,11.8,-61.9,-4.1C-63.7,-20,-61.1,-37.2,-51.6,-46.7C-42.1,-56.2,-25.7,-58,-10.2,-58.3C5.3,-58.6,30.7,-70.2,42.8,-62.2Z" transform="translate(100 100)" />
        </svg>
        
        <svg className="absolute bottom-10 left-10 text-teal-200/20 w-96 h-96 transform -rotate-12" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M47.7,-73.2C59.5,-65.3,65.9,-48.5,71.5,-32.1C77.1,-15.7,82,-0.8,79.4,12.5C76.9,25.8,66.9,37.5,55.8,47.9C44.7,58.3,32.5,67.5,18.1,72.6C3.7,77.7,-12.9,78.8,-27.4,73.5C-41.9,68.2,-54.3,56.5,-63.3,42.8C-72.3,29.1,-77.9,13.4,-77.4,-2.1C-76.9,-17.6,-70.3,-33,-60.1,-44.2C-49.9,-55.4,-36.1,-62.4,-22.6,-69.2C-9.1,-76,-4.5,-82.7,6.2,-82.5C16.9,-82.3,35.9,-81.2,47.7,-73.2Z" transform="translate(100 100)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        {/* New simplified header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-teal-600">
            We Brought To You
          </h2>
          <div className="relative h-1 w-32 mx-auto mb-8 overflow-hidden rounded-full bg-gray-200">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500"
              initial={{ x: "-100%" }}
              whileInView={{ x: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
            />
          </div>
        </motion.div>
        
        {/* Hexagonal grid layout with auto-movement */}
        <div 
          className="relative" 
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
        >
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
          >
            {filteredProducts.map((product, index) => {
              // Apply special styling to the currently active product
              const isActive = index === currentIndex;
              
              return (
                <motion.div 
                  key={product.id}
                  variants={itemVariants}
                  className={`parallax-item transition-all duration-500 ${isActive ? 'scale-105 z-10' : 'scale-100 z-0'}`}
                  animate={{
                    y: isActive ? -15 : 0,
                    transition: { duration: 0.5 }
                  }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  onHoverStart={() => {
                    setActiveProduct(product.id);
                    setCurrentIndex(index); // Update current index on hover
                  }}
                  onHoverEnd={() => setActiveProduct(null)}
                >
                  <Link href={product.link} className="block h-full">
                    <div className={`relative group bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-500 h-full transform perspective-1000 ${isActive ? 'shadow-2xl ring-2 ring-emerald-500/50' : 'hover:shadow-2xl'}`}>
                      {/* Hexagonal mask effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br from-emerald-600/80 to-teal-500/80 z-10 transition-opacity duration-500 ${isActive ? 'opacity-30' : 'opacity-0 group-hover:opacity-90'}`}></div>
                      
                      {/* Product image with parallax effect */}
                      <div className="h-72 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                          <span className="text-emerald-800 font-medium">Green Business Initiative</span>
                        </div>
                        <Image 
                          src={product.image} 
                          alt={product.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className={`object-cover w-full h-full transition-transform duration-10000 ${isActive ? 'scale-105' : 'group-hover:scale-110'}`}
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P/BfwAJhAPYe0YQ1AAAAABJRU5ErkJggg=="
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        
                        {/* Decorative hexagon overlay */}
                        <svg className="absolute inset-0 w-full h-full text-white opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" fill="currentColor" />
                        </svg>
                      </div>
                      
                      <div className="p-8 relative z-20">
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors duration-300">{product.title}</h3>
                        <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">{product.description}</p>
                        
                        {/* Animated explore button */}
                        <div className="mt-6 overflow-hidden h-10">
                          <div className="transform group-hover:-translate-y-10 transition-transform duration-300">
                            <span className="inline-block py-2 text-emerald-700 font-medium">Learn More</span>
                            <div className="h-10 flex items-center">
                              <span className="inline-flex items-center text-white font-medium">
                                Explore
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Corner accent */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-emerald-500 to-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-300 z-10"></div>
                      
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse delay-100"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse delay-200"></span>
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
        
        {/* View all products button with animated arrow */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Link 
            href="/products"
            className="group inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-emerald-700 to-teal-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <span className="mr-2">Explore All Products</span>
            <span className="relative w-6 h-6 overflow-hidden inline-flex items-center justify-center">
              <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 transform group-hover:-translate-y-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 transform translate-y-full group-hover:translate-y-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;