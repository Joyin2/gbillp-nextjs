'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<'documents' | 'catalogues'>('documents');
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(new Set());

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Toggle description expansion
  const toggleDescription = (id: string) => {
    setExpandedDescriptions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Helper function to truncate text
  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength);
  };

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
    <div className="min-h-screen">
      {/* Enhanced Responsive Hero Section */}
      <section className="relative w-full h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#1baf0a] via-[#b2e63a] to-[#1baf0a]"
            animate={!isMobile ? {
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            } : {}}
            transition={!isMobile ? {
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            } : {}}
            style={{
              backgroundSize: '200% 200%',
            }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Responsive 3D Floating Elements - Hidden on mobile for better performance */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-1/4 left-1/4 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-green-500/20 rounded-full blur-3xl"
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
              className="absolute bottom-1/4 right-1/4 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-emerald-500/20 rounded-full blur-3xl"
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
          </>
        )}

        {/* Hero Content - Rice Page Style */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex flex-col justify-center">
          <div className="max-w-4xl lg:max-w-5xl text-center w-full mx-auto">
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-white drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span
                initial={{ letterSpacing: '0.05em' }}
                animate={!isMobile ? { letterSpacing: ['0.05em', '0.15em', '0.05em'] } : {}}
                transition={!isMobile ? { duration: 2, repeat: Infinity, repeatType: 'reverse' } : {}}
                className="hidden md:inline bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] bg-clip-text text-transparent"
              >
                Investment &<br />Partnership
              </motion.span>
              <span className="md:hidden">Investment & Partnership</span>
            </motion.h1>
            <motion.p
              className="text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 leading-relaxed drop-shadow-md px-4 sm:px-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Join us in our mission to create sustainable business solutions and make a positive impact on the environment and communities.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Responsive Loading State */}
      {loading && (
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-white via-gray-50/30 to-emerald-50/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-8 sm:py-12">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-green-500 mx-auto mb-3 sm:mb-4"></div>
              <p className="text-gray-600 text-sm sm:text-base px-4">Loading documents...</p>
            </div>
          </div>
        </section>
      )}

      {/* Awesome Tabbed Documents & Catalogues Section */}
      {!loading && (
        <section id="documents" className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-gray-50/30 to-emerald-50/50 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(178,230,58,0.05),transparent_50%)] pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(27,175,10,0.05),transparent_50%)] pointer-events-none"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-center mb-8 sm:mb-12 lg:mb-16"
              >
                <motion.h2
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-4"
                >
                  Resources & Information
                </motion.h2>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "6rem" }}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
                  viewport={{ once: true }}
                  className="h-1 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden bg-gray-200"
                >
                  <div className="h-full w-full bg-gradient-to-r from-[#b2e63a] to-[#1baf0a]"></div>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-4"
                >
                  Explore our comprehensive collection of investment documents and product catalogues
                </motion.p>
              </motion.div>

              {/* Awesome Tab Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex justify-center mb-8 sm:mb-12"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
                  <div className="flex space-x-2">
                    <motion.button
                      onClick={() => setActiveTab('documents')}
                      className={`relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 ${
                        activeTab === 'documents'
                          ? 'text-white shadow-lg'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {activeTab === 'documents' && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] rounded-xl"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="hidden sm:inline">Investor Documents</span>
                        <span className="sm:hidden">Documents</span>
                      </span>
                    </motion.button>

                    <motion.button
                      onClick={() => setActiveTab('catalogues')}
                      className={`relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 ${
                        activeTab === 'catalogues'
                          ? 'text-white shadow-lg'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {activeTab === 'catalogues' && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] rounded-xl"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span className="hidden sm:inline">Product Catalogues</span>
                        <span className="sm:hidden">Catalogues</span>
                      </span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Tab Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {activeTab === 'documents' ? (
                  // Investor Documents Content
                  investorDocuments.length === 0 ? (
                    <div className="text-center py-12 sm:py-16">
                      <div className="max-w-md mx-auto">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">No Documents Available</h3>
                        <p className="text-gray-600 text-sm sm:text-base">Investor documents will be available here soon.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                      {investorDocuments.map((doc, index) => (
                        <motion.div
                          key={doc.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100/50"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex flex-col h-full">
                            <div className="flex-1 mb-4">
                              <div className="flex items-start justify-between mb-3">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] rounded-lg flex items-center justify-center mb-3">
                                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                </div>
                              </div>
                              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-2">{doc.title}</h3>
                              <p className="text-xs sm:text-sm text-gray-500 mb-3">
                                {doc.createdAt?.toDate ? new Date(doc.createdAt.toDate()).toLocaleDateString() : 'N/A'}
                              </p>
                              <div className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                {expandedDescriptions.has(doc.id) ? (
                                  <p>
                                    {doc.description}{' '}
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        toggleDescription(doc.id);
                                      }}
                                      className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200 inline-flex items-center gap-1"
                                    >
                                      Read Less
                                      <svg className="w-3 h-3 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                      </svg>
                                    </button>
                                  </p>
                                ) : (
                                  <p>
                                    {truncateText(doc.description)}
                                    {doc.description.length > 120 && (
                                      <>
                                        ...{' '}
                                        <button
                                          onClick={(e) => {
                                            e.preventDefault();
                                            toggleDescription(doc.id);
                                          }}
                                          className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200 inline-flex items-center gap-1"
                                        >
                                          Read More
                                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                          </svg>
                                        </button>
                                      </>
                                    )}
                                  </p>
                                )}
                              </div>
                            </div>
                            <a
                              href={doc.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] text-white rounded-xl hover:from-[#0f8a08] hover:to-[#9dd132] transition-all duration-300 text-sm sm:text-base font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 group"
                            >
                              <span>Download Document</span>
                              <svg
                                className="w-4 h-4 ml-2 group-hover:translate-y-0.5 transition-transform duration-200"
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
                        </motion.div>
                      ))}
                    </div>
                  )
                ) : (
                  // Product Catalogues Content
                  productCatalogues.length === 0 ? (
                    <div className="text-center py-12 sm:py-16">
                      <div className="max-w-md mx-auto">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">No Catalogues Available</h3>
                        <p className="text-gray-600 text-sm sm:text-base">Product catalogues will be available here soon.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                      {productCatalogues.map((catalog, index) => (
                        <motion.div
                          key={catalog.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100/50"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex flex-col h-full">
                            <div className="flex-1 mb-4">
                              <div className="flex items-start justify-between mb-3">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] rounded-lg flex items-center justify-center mb-3">
                                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                  </svg>
                                </div>
                              </div>
                              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-2">{catalog.title}</h3>
                              <p className="text-xs sm:text-sm text-gray-500 mb-3">
                                {catalog.createdAt?.toDate ? new Date(catalog.createdAt.toDate()).toLocaleDateString() : 'N/A'}
                              </p>
                              <div className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                {expandedDescriptions.has(catalog.id) ? (
                                  <p>
                                    {catalog.description}{' '}
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        toggleDescription(catalog.id);
                                      }}
                                      className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200 inline-flex items-center gap-1"
                                    >
                                      Read Less
                                      <svg className="w-3 h-3 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                      </svg>
                                    </button>
                                  </p>
                                ) : (
                                  <p>
                                    {truncateText(catalog.description)}
                                    {catalog.description.length > 120 && (
                                      <>
                                        ...{' '}
                                        <button
                                          onClick={(e) => {
                                            e.preventDefault();
                                            toggleDescription(catalog.id);
                                          }}
                                          className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200 inline-flex items-center gap-1"
                                        >
                                          Read More
                                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                          </svg>
                                        </button>
                                      </>
                                    )}
                                  </p>
                                )}
                              </div>
                            </div>
                            <a
                              href={catalog.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] text-white rounded-xl hover:from-[#0f8a08] hover:to-[#9dd132] transition-all duration-300 text-sm sm:text-base font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 group"
                            >
                              <span>Download Catalogue</span>
                              <svg
                                className="w-4 h-4 ml-2 group-hover:translate-y-0.5 transition-transform duration-200"
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
                        </motion.div>
                      ))}
                    </div>
                  )
                )}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Enhanced Responsive Contact Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-green-800 to-emerald-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ready to Invest?
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-100 max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Get in touch with us to learn more about investment opportunities and partnership possibilities.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Link
                href="/contact"
                className="bg-white text-emerald-700 hover:bg-gray-100 py-2.5 px-6 sm:py-3 sm:px-8 rounded-full font-medium transition duration-300 transform hover:-translate-y-0.5 shadow-lg uppercase text-sm sm:text-base inline-flex items-center justify-center"
              >
                Contact Us
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 ml-2"
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
              <Link
                href="#documents"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 py-2.5 px-6 sm:py-3 sm:px-8 rounded-full font-medium transition duration-300 transform hover:-translate-y-0.5 uppercase text-sm sm:text-base inline-flex items-center justify-center"
              >
                View Resources
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 