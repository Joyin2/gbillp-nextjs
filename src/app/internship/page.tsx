'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { collection, getDocs, Timestamp, doc, getDoc } from 'firebase/firestore';
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

interface HeroText {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  pageName: string;
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
  const [heroText, setHeroText] = useState<HeroText | null>(null);
  const [heroLoading, setHeroLoading] = useState(true);

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
    fetchHeroText();
  }, []);

  const fetchHeroText = async () => {
    try {
      const heroTextDoc = doc(db, 'heroTexts', 'internships');
      const docSnap = await getDoc(heroTextDoc);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setHeroText({
          id: docSnap.id,
          title: data.title || '',
          subtitle: data.subtitle || '',
          description: data.description || '',
          buttonText: data.buttonText || '',
          buttonLink: data.buttonLink || '',
          pageName: data.pageName || '',
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        });
      }
    } catch (error) {
      console.error('Error fetching hero text:', error);
    } finally {
      setHeroLoading(false);
    }
  };

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
              {heroLoading ? (
                <div className="animate-pulse">
                  <div className="h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 bg-white/20 rounded-lg"></div>
                </div>
              ) : heroText ? (
                <>
                  <motion.span
                    initial={{ letterSpacing: '0.05em' }}
                    animate={!isMobile ? { letterSpacing: ['0.05em', '0.15em', '0.05em'] } : {}}
                    transition={!isMobile ? { duration: 6, repeat: Infinity, repeatType: 'reverse' } : {}}
                    className="hidden md:inline bg-gradient-to-r from-[#b2e63a] to-[#ffffff] bg-clip-text text-transparent"
                  >
                    {heroText.title}
                  </motion.span>
                  <span className="md:hidden">{heroText.title}</span>
                </>
              ) : (
                <div className="text-white/50">
                  <span className="block">No hero text available</span>
                </div>
              )}
            </motion.h1>
            {heroLoading ? (
              <motion.div
                className="px-4 sm:px-0 mb-8 sm:mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="animate-pulse">
                  <div className="h-6 sm:h-8 bg-white/20 rounded-lg mb-2"></div>
                  <div className="h-6 sm:h-8 bg-white/10 rounded-lg"></div>
                </div>
              </motion.div>
            ) : heroText && heroText.subtitle ? (
              <motion.p
                className="text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 leading-relaxed drop-shadow-md px-4 sm:px-0 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {heroText.subtitle}
              </motion.p>
            ) : null}

          </div>
        </div>
      </section>

      {/* Career and Partnership Opportunities Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-gray-50/30 to-emerald-50/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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
              Our Career And Partnership Opportunities
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
              className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xs sm:max-w-md md:max-w-4xl mx-auto px-4 leading-relaxed"
            >
              Green Business Initiative LLP offers diverse career and partnership avenues. Join our mission of sustainability and community support.
            </motion.p>
          </motion.div>

          {/* Description Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10">
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-6">
                Explore opportunities to contribute to our eco-friendly initiatives or collaborate with us for mutual growth. Contact us today to learn more about joining our team or partnering to promote environmental stewardship and sustainable practices in communities worldwide.
              </p>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-6">
                Together, we can make a significant impact by fostering innovation, supporting local artisans, and enhancing our product offerings. Whether you're looking to build a career or establish a business relationship, we welcome you to be part of our green journey.
              </p>
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 uppercase"
                  >
                    Discover More
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-emerald-50/50 via-gray-50/30 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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
              Open Positions
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

          {/* Opportunities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {/* Marketing */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 sm:p-8"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] rounded-lg flex items-center justify-center text-white font-bold text-xl mr-4">
                  01
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Marketing</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Join our marketing team and help amplify our message of sustainability to a global audience.
              </p>
            </motion.div>

            {/* Franchise Opportunities */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 sm:p-8"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] rounded-lg flex items-center justify-center text-white font-bold text-xl mr-4">
                  02
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Franchise Opportunities</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Explore franchise opportunities and expand your business with us.
              </p>
            </motion.div>

            {/* Business Opportunities */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 sm:p-8 md:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] rounded-lg flex items-center justify-center text-white font-bold text-xl mr-4">
                  03
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Business Opportunities</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Collaborate with us to create impactful business partnerships.
              </p>
            </motion.div>
          </div>
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