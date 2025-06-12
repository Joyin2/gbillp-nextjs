'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { productImages, productCategoryImages } from '@/lib/imageUrls';

const ProductsShowcase = () => {
  // Combine all product images into a single array
  const allProducts = [
    // Rice products
    { src: productCategoryImages.rice.basmatiGoldenSella, alt: 'Basmati Golden Sella Rice', category: 'Rice' },
    { src: productCategoryImages.rice.basmatiRaw, alt: 'Basmati Raw Rice', category: 'Rice' },
    { src: productCategoryImages.rice.gobindobhog, alt: 'Gobindobhog Rice', category: 'Rice' },
    { src: productCategoryImages.rice.kalijira, alt: 'Kalijira Rice', category: 'Rice' },
    
    // Pickle products
    { src: productCategoryImages.pickle.bambooShoot, alt: 'Bamboo Shoot Pickle', category: 'Pickle' },
    { src: productCategoryImages.pickle.boromar, alt: 'Boromar Pickle', category: 'Pickle' },
    { src: productCategoryImages.pickle.freshGarlicPickle, alt: 'Fresh Garlic Pickle', category: 'Pickle' },
    { src: productCategoryImages.pickle.freshGinger, alt: 'Fresh Ginger Pickle', category: 'Pickle' },
    
    // Art and Handicraft
    { src: productCategoryImages.artAndHandicraft.handicraft, alt: 'Handicraft', category: 'Art & Handicraft' },
    { src: productCategoryImages.artAndHandicraft.pottery, alt: 'Pottery', category: 'Art & Handicraft' },
    { src: productCategoryImages.artAndHandicraft.terracotta, alt: 'Terracotta', category: 'Art & Handicraft' },
    
    // Other products
    { src: productCategoryImages.dryBean.dryBean, alt: 'Dry Bean', category: 'Dry Bean' },
    { src: productCategoryImages.dryHathkora.dryHathkora, alt: 'Dry Hathkora', category: 'Dry Hathkora' },
    { src: productCategoryImages.plantation.orange, alt: 'Orange', category: 'Plantation' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-emerald-50">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">WE BROUGHT TO YOU</h2>
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
            Discover our premium collection of authentic products, carefully crafted to bring you the best of local traditions and flavors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {allProducts.map((product, index) => (
            <motion.div
              key={product.alt}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={product.src}
                  alt={product.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 4}
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-sm font-semibold text-emerald-600 bg-emerald-50 rounded-full mb-2">
                  {product.category}
                </span>
                <h3 className="text-xl font-bold mb-2">{product.alt}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsShowcase; 