"use client";

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
    image: pickle,
    description: "Organic, traditionally prepared pickles from locally sourced ingredients.",
    link: "/products/pickle"
  },
  {
    id: 2,
    title: "Rice",
    image: rice,
    description: "Premium quality, sustainably grown rice varieties from the region.",
    link: "/products/rice"
  },
  {
    id: 3,
    title: "Dry Bean (Forash)",
    image: drybean,
    description: "Nutrient-rich dry beans cultivated using traditional farming methods.",
    link: "/products/dry-bean"
  },
  {
    id: 4,
    title: "Dry Hathkora",
    image: dryhathkora,
    description: "Naturally dried hathkora with preserved authentic flavor and aroma.",
    link: "/products/dry-hathkora"
  },
  {
    id: 5,
    title: "Tezpatta",
    image: tezpatta,
    description: "Fresh, aromatic bay leaves harvested from sustainable sources.",
    link: "/products/tezpatta"
  },
  {
    id: 6,
    title: "Decorative Handicraft",
    image: handicraft,
    description: "Exquisite handcrafted items made by local artisans using eco-friendly materials.",
    link: "/products/handicraft"
  },
  {
    id: 7,
    title: "Lemon & Orange Plantation",
    image: orange,
    description: "Fresh, sustainably grown citrus fruits from our local plantations, cultivated with care and expertise.",
    link: "/products/plantation"
  }
];

const ProductsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      scale: 0.95
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 12
      }
    }
  };

  // New hover animation for product cards
  const cardHoverVariants = {
    rest: { 
      scale: 1,
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)"
    },
    hover: { 
      scale: 1.03, 
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // New image hover animation
  const imageHoverVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.08,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-emerald-50">
      <div className="container mx-auto px-4" ref={containerRef}>
        {/* Header with enhanced animations */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            WE BROUGHT TO YOU
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
            viewport={{ once: true }}
            className="h-1 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200"
          >
            <div className="h-full w-full bg-gradient-to-r from-green-800 to-emerald-600"></div>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Discover our range of sustainable, eco-friendly products crafted with care for both you and the environment.
          </motion.p>
        </motion.div>
        
        {/* Product grid with enhanced animations */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              variants={itemVariants}
              className="relative"
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <Link href={product.link} className="block">
                <motion.div 
                  variants={cardHoverVariants}
                  className="bg-white rounded-xl overflow-hidden shadow-md h-full"
                >
                  {/* Product image with enhanced hover animation */}
                  <div className="relative h-95 overflow-hidden">
                    {/* <motion.div 
                      className="absolute top-0 left-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 text-xs font-medium z-10 rounded-br-lg"
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      {index % 2 === 0 ? 'Featured' : 'Organic'}
                    </motion.div> */}
                    
                    <motion.div
                      variants={imageHoverVariants}
                      className="h-full w-full"
                    >
                      <Image 
                        src={product.image} 
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                        placeholder="empty"
                      />
                    </motion.div>
                    
                    {/* Enhanced overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  </div>
                  
                  {/* Content with enhanced animations */}
                  <div className="p-5 relative">
                    <motion.h3 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="text-xl font-bold mb-2 text-gray-800"
                    >
                      {product.title}
                    </motion.h3>
                    
                    <motion.p 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="text-gray-600 mb-4 text-sm line-clamp-2"
                    >
                      {product.description}
                    </motion.p>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="flex justify-between items-center"
                    >
                      <span className="text-emerald-600 font-medium text-sm">Green Business Initiative LLP</span>
                      <motion.div 
                        className="relative overflow-hidden inline-flex rounded-full"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20"></div>
                        <motion.span 
                          className="relative z-10 px-3 py-1 text-xs font-medium text-emerald-800"
                          whileHover={{ 
                            color: "#065f46", 
                            transition: { duration: 0.2 } 
                          }}
                        >
                          View Details
                          <motion.span 
                            className="inline-block ml-1"
                            initial={{ x: 0 }}
                            whileHover={{ x: 3, transition: { repeat: Infinity, repeatType: "reverse", duration: 0.3 } }}
                          >
                            →
                          </motion.span>
                        </motion.span>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        {/* New decorative elements */}
        <motion.div 
          className="absolute -z-10 top-20 right-0 w-64 h-64 rounded-full bg-emerald-500/5"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute -z-10 bottom-20 left-10 w-40 h-40 rounded-full bg-teal-500/5"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        />
      </div>
    </section>
  );
};

export default ProductsSection;