'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Fallback handicraft image
const defaultHandicraftImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOWNhM2FmIj5IYW5kaWNyYWZ0IEFydDwvdGV4dD48L3N2Zz4=";

interface HandicraftProduct {
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
      "Handcrafted with care",
      "Unique artistic design",
      "Cultural heritage piece",
      "Perfect for decoration",
      "Traditional craftsmanship"
    ];
  }

  return features;
};

export default function HandicraftPage() {
  const [handicraftProducts, setHandicraftProducts] = useState<HandicraftProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHandicraftProducts();
  }, []);

  const fetchHandicraftProducts = async () => {
    try {
      const handicraftProductsCollection = collection(db, 'handicraftProducts');
      const querySnapshot = await getDocs(handicraftProductsCollection);

      const handicraftProductsData: HandicraftProduct[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log('Handicraft product data:', {
          id: doc.id,
          name: data.name,
          imageUrl: data.imageUrl,
          featured: data.featured
        });
        handicraftProductsData.push({
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
      handicraftProductsData.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
        }
        return 0;
      });

      setHandicraftProducts(handicraftProductsData);
    } catch (error) {
      console.error('Error fetching handicraft products:', error);
    } finally {
      setLoading(false);
    }
  };

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

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading our handcrafted treasures...</p>
            </div>
          ) : handicraftProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No handicraft products available at the moment.</p>
            </div>
          ) : (
            <div className="space-y-24">
              {handicraftProducts.map((product, index) => {
                const features = extractFeaturesFromDescription(product.description);

                return (
                  <motion.div
                    key={product.id}
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
                          src={product.imageUrl || defaultHandicraftImage}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          onError={(e) => {
                            console.error('Image failed to load:', product.imageUrl);
                            e.currentTarget.src = defaultHandicraftImage;
                          }}
                        />
                        {product.featured && (
                          <div className="absolute top-4 right-4">
                            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              Featured
                            </span>
                          </div>
                        )}
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
                        <div
                          className="text-gray-600 text-lg mb-8 leading-relaxed product-description"
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