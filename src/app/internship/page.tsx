'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Internship {
  id: string;
  title: string;
  description: string;
  applyLink: string;
  active: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

const internshipDetails = {
  title: "Green Business Initiative Remote Internship Program 2025",
  description: "We are thrilled to launch our Remote Internship Program under Green Business Initiative (GBI) for UG and PG students across India. Dive into market research, product analysis, and professional report writing while contributing to sustainable rural development.",
  tasks: [
    "Analyzing market demand and value",
    "Conducting competitive analysis",
    "Studying consumer preferences and views",
    "Identifying regional specialties and unique selling points",
    "Exploring business strategies and innovative marketing domains",
    "Investigating export-import market opportunities"
  ],
  benefits: [
    "Enhance your research, analytical, and report-writing skills",
    "Work under experienced supervisors",
    "Earn a valuable experience certificate from GBI",
    "Strengthen your resume with real-world project contributions",
    "Contribute to rural development and sustainability"
  ],
  timeline: [
    {
      title: "Orientation & Topic Selection",
      date: "First week of May 2025"
    },
    {
      title: "Internship Start Date",
      date: "15th May 2025"
    },
    {
      title: "Permission Letter Deadline",
      date: "25th May 2025"
    }
  ]
};

export default function InternshipPage() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const internshipsCollection = collection(db, 'internships');
        const querySnapshot = await getDocs(internshipsCollection);

        const internshipsData: Internship[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Filter active internships on the client side
          if (data.active === true) {
            internshipsData.push({
              id: doc.id,
              title: data.title,
              description: data.description,
              applyLink: data.applyLink,
              active: data.active,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
            });
          }
        });

        // Sort by creation date on the client side
        internshipsData.sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
          }
          return 0;
        });

        setInternships(internshipsData);
      } catch (error) {
        console.error('Error fetching internships:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
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
                className="hidden md:inline bg-gradient-to-r from-[#b2e63a] to-[#ffffff] bg-clip-text text-transparent"
              >
                Remote Internship<br />Program 2025
              </motion.span>
              <span className="md:hidden">Remote Internship Program 2025</span>
            </motion.h1>
            <motion.p
              className="text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 leading-relaxed drop-shadow-md px-4 sm:px-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Join Green Business Initiative for UG and PG students across India. Dive into market research, product analysis, and professional report writing while contributing to sustainable rural development.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Responsive About Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-gray-50/30 to-emerald-50/50 overflow-hidden">
        {/* Background elements like rice page */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(178,230,58,0.05),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(27,175,10,0.05),transparent_50%)] pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header with rice page animations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16 lg:mb-20"
            >
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-4"
              >
                About the Internship
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
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">Market Research</h3>
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Conduct in-depth research on rural organic products, analyzing market trends and consumer behavior to drive sustainable business growth.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">Product Analysis</h3>
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Evaluate unique traditional goods, identifying their competitive edge and potential in local and global markets.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">Report Writing</h3>
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Craft professional reports that will be published on GBI's platform, showcasing your analytical and communication skills.</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-white p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl shadow-lg"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                Your Tasks
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {internshipDetails.tasks.map((task, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-600 text-sm sm:text-base leading-relaxed">{task}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Responsive Internship Details Section - Firestore Data */}
      {!loading && internships.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 sm:mb-12"
            >
              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-800 px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Current Internship Opportunities
              </motion.h2>
              <motion.div
                className="h-1 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden bg-gray-200"
                initial={{ width: 0 }}
                whileInView={{ width: "6rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="h-full w-full bg-gradient-to-r from-[#b2e63a] to-[#1baf0a]"></div>
              </motion.div>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {internships.map((internship, index) => (
                <motion.div
                  key={internship.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center mb-3 sm:mb-4">
                        <div className="flex items-center mb-2 sm:mb-0">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                          <span className="text-xs sm:text-sm font-medium text-green-600 uppercase tracking-wide">
                            Active Position
                          </span>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-500 sm:ml-4">
                          Posted: {internship.createdAt?.toDate ? new Date(internship.createdAt.toDate()).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }) : 'N/A'}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
                        {internship.title}
                      </h3>
                    </div>
                  </div>

                  <div
                    className="text-gray-700 leading-relaxed mb-4 sm:mb-6 internship-content text-sm sm:text-base md:text-lg"
                    dangerouslySetInnerHTML={{ __html: internship.description }}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 sm:pt-6 border-t border-green-200 gap-3 sm:gap-0">
                    <div className="flex items-center text-xs sm:text-sm text-gray-600">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] rounded-full flex items-center justify-center mr-2">
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      Remote Position
                    </div>
                    <motion.a
                      href={internship.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={!isMobile ? { scale: 1.05 } : {}}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] text-white rounded-full font-medium hover:from-[#0f8a08] hover:to-[#9dd132] transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base w-full sm:w-auto"
                    >
                      Apply Now
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Responsive Benefits Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-green-50 via-emerald-50/50 to-teal-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header with rice page animations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16 lg:mb-20"
            >
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-4"
              >
                Why Join Us?
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
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {internshipDetails.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mr-3 sm:mr-4 relative bg-gradient-to-br from-[#b2e63a] to-[#1baf0a] shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 group">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-white relative z-10 transition-transform duration-300 group-hover:scale-110"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{benefit}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile-Optimized Call to Action */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-green-800 to-emerald-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to Start Your Journey?
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-100 max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join our remote internship program and gain valuable experience while contributing to sustainable rural development.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            {internships.length > 0 && (
              <a
                href={internships[0].applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-emerald-700 hover:bg-gray-100 py-2.5 px-6 sm:py-3 sm:px-8 rounded-full font-medium transition duration-300 transform hover:-translate-y-0.5 shadow-lg uppercase text-sm sm:text-base"
              >
                Apply Now
              </a>
            )}
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 py-2.5 px-6 sm:py-3 sm:px-8 rounded-full font-medium transition duration-300 transform hover:-translate-y-0.5 uppercase text-sm sm:text-base"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}