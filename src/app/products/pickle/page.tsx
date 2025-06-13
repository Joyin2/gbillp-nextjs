'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Import pickle images from Supabase (fallback images)
const boromar = "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/pickle/boromar.jpeg";

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  featured: boolean;
  price: number | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
  createdByEmail: string;
}

// Helper function to extract features from HTML description
const extractFeaturesFromDescription = (htmlDescription: string): string[] => {
  // Extract list items from HTML
  const listItemRegex = /<li><p>(.*?)<\/p><\/li>/g;
  const features: string[] = [];
  let match;

  while ((match = listItemRegex.exec(htmlDescription)) !== null) {
    features.push(match[1]);
  }

  // If no list items found, return some default features
  if (features.length === 0) {
    return [
      "Made with finest ingredients",
      "Traditional preparation methods",
      "Authentic taste and quality",
      "Perfect for any meal",
      "Natural and preservative-free"
    ];
  }

  return features;
};

export default function PicklesPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsLoaded(true);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, 'products');
      const querySnapshot = await getDocs(productsCollection);

      const productsData: Product[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        productsData.push({
          id: doc.id,
          name: data.name,
          description: data.description,
          imageUrl: data.imageUrl,
          featured: data.featured,
          price: data.price,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          createdBy: data.createdBy,
          createdByEmail: data.createdByEmail,
        });
      });

      // Sort by creation date (newest first)
      productsData.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
        }
        return 0;
      });

      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

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
            className="absolute left-1/4 top-1/3 w-16 h-16 bg-amber-500/30 rounded-full flex items-center justify-center"
            animate={{ y: [0, -40, 0, 40, 0], rotate: [0, 10, -10, 0, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg className="w-8 h-8 premium-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </motion.div>
          <motion.div
            className="absolute right-1/4 top-1/4 w-14 h-14 bg-red-500/30 rounded-full flex items-center justify-center"
            animate={{ rotate: [0, 360, 0], y: [0, 20, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          >
            <svg className="w-7 h-7 premium-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </motion.div>
          <motion.div
            className="absolute left-1/3 bottom-1/4 w-18 h-18 bg-green-500/30 rounded-full flex items-center justify-center"
            animate={{ y: [0, 50, 0], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <svg className="w-9 h-9 premium-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </motion.div>
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
              Discover our premium selection of handcrafted pickles
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading our delicious pickles...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No pickles available at the moment.</p>
            </div>
          ) : (
            <div className="space-y-20">
              {products.map((product, index) => {
                const features = extractFeaturesFromDescription(product.description);

                return (
                  <motion.div
                    key={product.id}
                    className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Image Section */}
                    <div className="w-full md:w-1/2">
                      <motion.div
                        className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={product.imageUrl || boromar}
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
                        className="bg-white p-8 rounded-lg shadow-lg"
                        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-3xl font-bold text-emerald-800">{product.name}</h3>
                          {product.featured && (
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              Featured
                            </span>
                          )}
                        </div>

                        <div
                          className="text-gray-600 text-lg mb-6 leading-relaxed product-description"
                          dangerouslySetInnerHTML={{
                            __html: product.description.replace(/<ul[\s\S]*?<\/ul>/g, '')
                          }}
                        />

                        <ul className="space-y-3">
                          {features.map((feature, i) => (
                            <motion.li
                              key={i}
                              className="flex items-start"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                            >
                              <span className="text-emerald-600 mr-2 text-xl">•</span>
                              <span className="text-gray-600">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
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