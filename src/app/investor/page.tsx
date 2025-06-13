'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface InvestorDocument {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  fileUrl: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface ProductCatalogue {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  fileUrl: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export default function InvestorPage() {
  const [investorDocuments, setInvestorDocuments] = useState<InvestorDocument[]>([]);
  const [productCatalogues, setProductCatalogues] = useState<ProductCatalogue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        // Fetch investor documents
        const investorDocsCollection = collection(db, 'investorDocuments');
        const investorDocsQuery = query(investorDocsCollection, orderBy('createdAt', 'desc'));
        const investorDocsSnapshot = await getDocs(investorDocsQuery);

        const investorDocsData: InvestorDocument[] = [];
        investorDocsSnapshot.forEach((doc) => {
          const data = doc.data();
          investorDocsData.push({
            id: doc.id,
            title: data.title,
            description: data.description,
            fileName: data.fileName,
            fileSize: data.fileSize,
            fileType: data.fileType,
            fileUrl: data.fileUrl,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          });
        });

        // Fetch product catalogues
        const productCataloguesCollection = collection(db, 'productCatalogues');
        const productCataloguesQuery = query(productCataloguesCollection, orderBy('createdAt', 'desc'));
        const productCataloguesSnapshot = await getDocs(productCataloguesQuery);

        const productCataloguesData: ProductCatalogue[] = [];
        productCataloguesSnapshot.forEach((doc) => {
          const data = doc.data();
          productCataloguesData.push({
            id: doc.id,
            title: data.title,
            description: data.description,
            fileName: data.fileName,
            fileSize: data.fileSize,
            fileType: data.fileType,
            fileUrl: data.fileUrl,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          });
        });

        setInvestorDocuments(investorDocsData);
        setProductCatalogues(productCataloguesData);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#1baf0a] via-[#b2e63a] to-[#1baf0a]"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* 3D Floating Elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotateY: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
            rotateX: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div 
          className="container mx-auto px-6 relative z-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg"
            animate={{
              textShadow: [
                "0 0 7px #fff",
                "0 0 10px #fff",
                "0 0 21px #fff",
                "0 0 42px #0fa",
                "0 0 82px #0fa",
                "0 0 92px #0fa",
                "0 0 102px #0fa",
                "0 0 151px #0fa"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            Investment & Partnership
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Join us in our mission to create sustainable business solutions and make a positive impact on the environment and communities.
          </motion.p>

          {/* Enhanced CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="#documents"
              className="inline-flex items-center px-8 py-4 bg-green-500 text-white rounded-full text-lg font-medium hover:bg-green-600 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Opportunities
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="white"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-0 -mb-20 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-white rounded-full mt-2"
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading documents...</p>
            </div>
          </div>
        </section>
      )}

      {/* Investor Documents Section */}
      {!loading && (
        <section id="investor-documents" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <motion.h2
                  className="text-4xl font-bold mb-4 text-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Investor Documents
                </motion.h2>
                <motion.div
                  className="w-24 h-1 bg-green-500 mx-auto rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: 96 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                  Access comprehensive reports, financial documents, and investment opportunities
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {investorDocuments.map((doc, index) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{doc.title}</h3>
                        <p className="text-sm text-gray-500 mb-3">
                          {doc.createdAt?.toDate ? new Date(doc.createdAt.toDate()).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 ml-4"
                      >
                        Download
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="white"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      </a>
                    </div>
                    <p className="text-gray-600">{doc.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Product Catalogues Section */}
      {!loading && (
        <section id="product-catalogues" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <motion.h2
                  className="text-4xl font-bold mb-4 text-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Product Catalogues
                </motion.h2>
                <motion.div
                  className="w-24 h-1 bg-green-500 mx-auto rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: 96 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                  Explore our comprehensive product range and detailed specifications
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {productCatalogues.map((catalog, index) => (
                  <motion.div
                    key={catalog.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{catalog.title}</h3>
                        <p className="text-sm text-gray-500 mb-3">
                          {catalog.createdAt?.toDate ? new Date(catalog.createdAt.toDate()).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      <a
                        href={catalog.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 ml-4"
                      >
                        Download
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="white"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      </a>
                    </div>
                    <p className="text-gray-600">{catalog.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Enhanced Contact Section */}
      <section className="py-20 bg-gradient-to-r from-green-800 to-emerald-600 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2 
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to Invest?
            </motion.h2>
            <motion.p 
              className="text-xl text-white/90 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Get in touch with us to learn more about investment opportunities and partnership possibilities.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-green-800 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Contact Us
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 