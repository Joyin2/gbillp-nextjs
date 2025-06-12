'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Import handicraft images from Supabase
const visualArt1 = "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/art%20and%20handicraft/visual%20art.jpg";
const visualArt2 = "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/art%20and%20handicraft/visual%20art%202.jpg";
const visualArt3 = "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/art%20and%20handicraft/visual%20art%203.jpg";
const terracotta = "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/art%20and%20handicraft/terracotta.jpg";
const indigenousText = "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/art%20and%20handicraft/indegenous%20text%20pottery.jpg";
const pottery = "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/art%20and%20handicraft/pottery.jpg";
const handicraft = "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/art%20and%20handicraft/handicraft.jpeg";

const products = [
  {
    name: "Wall Hanging Sorai with Arabic Calligraphy",
    description: "Elegant wall hanging Sorai pieces, adorned with flowing Arabic calligraphy, bring a touch of spiritual artistry to any space. The intricate script, often embodying profound messages, is carefully etched onto the clay surface, creating a harmonious blend of tradition and aesthetics. These pieces serve as a testament to the rich cultural tapestry of the Arabic world.",
    image: pottery,
    features: [
      "Intricate Arabic calligraphy",
      "Traditional clay craftsmanship",
      "Spiritual and aesthetic appeal",
      "Perfect for wall decoration",
      "Cultural heritage preservation"
    ]
  },
  {
    name: "Terracotta Art Collection",
    description: "Our terracotta collection showcases the timeless beauty of clay craftsmanship. Each piece is carefully molded and fired, creating durable and beautiful items that bring natural warmth to any space. The earthy tones and textures make these pieces perfect for both traditional and contemporary interiors.",
    image: terracotta,
    features: [
      "Natural clay material",
      "Traditional firing techniques",
      "Earthy color palette",
      "Durable construction",
      "Versatile decorative pieces"
    ]
  },
  {
    name: "Indigenous Text Pottery",
    description: "Pottery featuring indigenous texts captures the essence of ancestral wisdom and storytelling. Each piece is a canvas for the symbols and scripts of native cultures, often reflecting a deep connection to the earth and community. These works preserve linguistic heritage and offer a unique, earthy charm to any setting, bridging the past with the present.",
    image: indigenousText,
    features: [
      "Indigenous text preservation",
      "Cultural storytelling",
      "Traditional craftsmanship",
      "Unique artistic expression",
      "Heritage conservation"
    ]
  },
  {
    name: "Visual Art Collection",
    description: "Our visual art collection features stunning pieces created by professional artists. These artworks serve as powerful mediums for conveying ideas and messages, whether political, emotional, social, or scientific, while providing visual pleasure and lasting impact. Perfect for enhancing the ambiance of homes, offices, and public spaces.",
    image: visualArt1,
    features: [
      "Professional artistic creation",
      "Meaningful visual impact",
      "Versatile placement options",
      "Emotional and social expression",
      "Aesthetic enhancement"
    ]
  },
  {
    name: "Contemporary Art Series",
    description: "The contemporary art series showcases modern interpretations of traditional themes. These pieces blend traditional techniques with contemporary aesthetics, creating unique artworks that appeal to modern sensibilities while maintaining cultural relevance.",
    image: visualArt2,
    features: [
      "Modern artistic interpretation",
      "Contemporary design elements",
      "Cultural fusion",
      "Unique visual appeal",
      "Modern interior compatibility"
    ]
  },
  {
    name: "Abstract Art Collection",
    description: "Our abstract art collection features bold, expressive pieces that add character and depth to any space. These artworks encourage personal interpretation and create engaging focal points in both residential and commercial settings.",
    image: visualArt3,
    features: [
      "Bold artistic expression",
      "Abstract design elements",
      "Engaging visual impact",
      "Versatile placement options",
      "Contemporary appeal"
    ]
  }
];

export default function HandicraftPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Animated colorful artisan gradient background */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ background: 'linear-gradient(135deg, #f7cac9 0%, #92a8d1 50%, #f9f871 100%)' }}
          animate={{ background: [
            'linear-gradient(135deg, #f7cac9 0%, #92a8d1 50%, #f9f871 100%)',
            'linear-gradient(135deg, #f9f871 0%, #f7cac9 50%, #92a8d1 100%)',
            'linear-gradient(135deg, #92a8d1 0%, #f9f871 50%, #f7cac9 100%)',
            'linear-gradient(135deg, #f7cac9 0%, #92a8d1 50%, #f9f871 100%)'
          ] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Animated floating artisan icons and swirls */}
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
          >🖌️</motion.div>
          <motion.div
            className="absolute right-1/4 top-1/4 text-6xl"
            animate={{ y: [0, -30, 0], rotate: [0, -10, 10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          >🏺</motion.div>
          <motion.div
            className="absolute left-1/3 bottom-1/4 text-8xl"
            animate={{ y: [0, 50, 0], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >🎨</motion.div>
          <motion.div
            className="absolute right-1/2 bottom-1/3 text-7xl"
            animate={{ y: [0, 30, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          >🌀</motion.div>
        </motion.div>
        
        {/* Content */}
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 text-purple-900 drop-shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              initial={{ letterSpacing: '0.1em' }}
              animate={{ letterSpacing: ['0.1em', '0.25em', '0.1em'] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            >Decorative Handicraft</motion.span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-purple-900 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.span
              initial={{ opacity: 0.7 }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >Unique Artistry, Timeless Craft</motion.span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a
              href="#categories"
              className="inline-block button-gradient text-white py-3 px-8 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-green-500/20 transform hover:-translate-y-1"
            >
              Discover More
            </a>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Vision</h2>
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
              Our vision is to inspire and nurture creativity by providing unique, handcrafted art pieces that celebrate cultural heritage and foster a connection to artistry and craftsmanship, creating lasting value for our community and future generations. We aim to promote environmentally friendly practices by using sustainable materials and processes in all our creations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Handcrafted Treasures</h2>
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

          <div className="space-y-24">
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
              >
                {/* Image Section */}
                <div className="w-full md:w-1/2">
                  <motion.div 
                    className="relative h-[500px] rounded-lg overflow-hidden shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  >
                    <h3 className="text-3xl font-bold mb-6">{product.name}</h3>
                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                      {product.description}
                    </p>
                    <ul className="space-y-3">
                      {product.features.map((feature, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.3 + (i * 0.1) }}
                        >
                          <span className="text-emerald-600 mr-3 text-xl">•</span>
                          <span className="text-gray-600 text-lg">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
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
            Join Us in Preserving Heritage
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-100 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Support our artisans and help preserve traditional craftsmanship while bringing unique, handcrafted pieces to your space.
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