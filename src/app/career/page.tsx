'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

interface CareerIntro {
  id: string;
  title: string;
  description: string;
  active: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface Career {
  id: string;
  title: string;
  description: string;
  applyLink: string;
  active: boolean;
  documents: any[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface Intern {
  id: string;
  name: string;
  designation: string;
  about: string;
  imageUrl: string;
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
  const [heroText, setHeroText] = useState<HeroText | null>(null);
  const [heroLoading, setHeroLoading] = useState(true);
  const [careerIntro, setCareerIntro] = useState<CareerIntro | null>(null);
  const [careerIntroLoading, setCareerIntroLoading] = useState(true);
  const [careers, setCareers] = useState<Career[]>([]);
  const [careersLoading, setCareersLoading] = useState(true);
  const [interns, setInterns] = useState<Intern[]>([]);
  const [internsLoading, setInternsLoading] = useState(true);
  const router = useRouter();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const fetchInterns = async () => {
    try {
      const internsCollection = collection(db, 'interns');
      const querySnapshot = await getDocs(internsCollection);

      const internsData: Intern[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        
        // Filter active interns
        if (data.active === true) {
          internsData.push({
            id: doc.id,
            name: data.name || '',
            designation: data.designation || '',
            about: data.about || '',
            imageUrl: data.imageUrl || '',
            active: data.active || false,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          });
        }
      });

      // Sort by creation date (newest first)
      internsData.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
        }
        return 0;
      });

      setInterns(internsData);
    } catch (error) {
      console.error('Error fetching interns:', error);
      setInterns([]);
    } finally {
      setInternsLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
    fetchHeroText();
    fetchCareerIntro();
    fetchCareers();
    fetchInterns();
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

  const fetchCareerIntro = async () => {
    try {
      const careerIntrosCollection = collection(db, 'careerIntros');
      const querySnapshot = await getDocs(careerIntrosCollection);

      let careerIntroData: CareerIntro | null = null;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        
        // Find the active career intro
        if (data.active === true) {
          careerIntroData = {
            id: doc.id,
            title: data.title || 'Career And Partnership Opportunities',
            description: data.description || '',
            active: data.active || false,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          };
        }
      });

      setCareerIntro(careerIntroData);
    } catch (error) {
      console.error('Error fetching career intro:', error);
      setCareerIntro(null);
    } finally {
      setCareerIntroLoading(false);
    }
  };

  const fetchCareers = async () => {
    try {
      const careersCollection = collection(db, 'careers');
      const querySnapshot = await getDocs(careersCollection);

      const careersData: Career[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        
        // Filter active careers
        if (data.active === true) {
          careersData.push({
            id: doc.id,
            title: data.title || '',
            description: data.description || '',
            applyLink: data.applyLink || '',
            active: data.active || false,
            documents: data.documents || [],
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          });
        }
      });

      // Sort by creation date (newest first)
      careersData.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
        }
        return 0;
      });

      setCareers(careersData);
    } catch (error) {
      console.error('Error fetching careers:', error);
      setCareers([]);
    } finally {
      setCareersLoading(false);
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
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gradient-to-br from-white via-gray-50/30 to-emerald-50/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {careerIntroLoading ? (
            <div className="animate-pulse">
              <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                <div className="h-12 sm:h-16 md:h-20 bg-gray-200 rounded-lg mb-4 sm:mb-6 mx-auto max-w-md"></div>
                <div className="h-1 mx-auto mb-4 sm:mb-6 rounded-full bg-gray-200 w-16 sm:w-20 md:w-24"></div>
                <div className="h-6 bg-gray-100 rounded-lg mb-2 mx-auto max-w-2xl"></div>
                <div className="h-6 bg-gray-100 rounded-lg mx-auto max-w-xl"></div>
              </div>
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10">
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-100 rounded-lg"></div>
                    <div className="h-4 bg-gray-100 rounded-lg"></div>
                    <div className="h-4 bg-gray-100 rounded-lg w-3/4"></div>
                  </div>
                  <div className="mt-6 text-center">
                    <div className="h-10 bg-gray-200 rounded-lg w-32 mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : careerIntro ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-6 sm:mb-8 lg:mb-10"
              >
                <motion.h2
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-4"
                >
                  {careerIntro.title}
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

              {/* Description Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto mb-8 sm:mb-10 lg:mb-12"
              >
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10">
                  <div 
                    className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-6"
                    dangerouslySetInnerHTML={{ __html: careerIntro.description }}
                  />
                  <div className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href="/contact"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 uppercase"
                      >
                        Contact Us
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 px-4">
                  Career And Partnership Opportunities
                </h2>
                <div className="h-1 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] w-16 sm:w-20 md:w-24"></div>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4 mb-8"
              >
                No career information available at the moment. Please check back later or contact us directly.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 uppercase"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="pt-2 pb-8 sm:pt-3 sm:pb-10 md:pt-4 md:pb-12 lg:pt-6 lg:pb-16 bg-gradient-to-br from-emerald-50/50 via-gray-50/30 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10 lg:mb-12"
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

          {/* Dynamic Opportunities Grid */}
          {careersLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-xl shadow-lg p-6 sm:p-8 animate-pulse">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4"></div>
                    <div className="h-6 bg-gray-200 rounded-lg flex-1"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-100 rounded-lg"></div>
                    <div className="h-4 bg-gray-100 rounded-lg w-3/4"></div>
                  </div>
                  <div className="mt-4">
                    <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : careers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
              {careers.map((career, index) => (
                <motion.div
                  key={career.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 sm:p-8 cursor-pointer group"
                  onClick={() => router.push(`/careers/${career.id}`)}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] rounded-lg flex items-center justify-center text-white font-bold text-xl mr-4 group-hover:scale-105 transition-transform duration-200">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 group-hover:text-green-700 transition-colors duration-200">{career.title}</h3>
                  </div>
                  <div 
                    className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: career.description }}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Posted: {career.createdAt?.toDate ? new Date(career.createdAt.toDate()).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      }) : 'N/A'}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-green-600 font-medium group-hover:text-green-700 transition-colors duration-200">
                        View Details
                      </span>
                      <svg className="w-4 h-4 text-green-600 group-hover:text-green-700 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Open Positions</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  There are currently no open career positions available. Please check back later or contact us for future opportunities.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Our Interns Section */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10 lg:mb-12"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-4"
            >
              Our Interns
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
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            >
              Meet our talented interns who are contributing to our mission of sustainable rural development
            </motion.p>
          </motion.div>

          {/* Dynamic Interns Grid */}
          {internsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-xl shadow-lg p-6 sm:p-8 animate-pulse">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded-lg mb-2"></div>
                  <div className="h-4 bg-gray-100 rounded-lg mb-4 w-3/4 mx-auto"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-100 rounded-lg"></div>
                    <div className="h-3 bg-gray-100 rounded-lg"></div>
                    <div className="h-3 bg-gray-100 rounded-lg w-4/5"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : interns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {interns.map((intern, index) => (
                <motion.div
                  key={intern.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-green-200 transform hover:-translate-y-2 hover:scale-105"
                  whileHover={{ y: -8 }}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 via-emerald-50/20 to-teal-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  {/* Intern Image - Full Width */}
                  <div className="relative w-full h-48 sm:h-56 overflow-hidden">
                    {intern.imageUrl ? (
                      <img
                        src={intern.imageUrl}
                        alt={intern.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(intern.name)}&background=b2e63a&color=ffffff&size=200`;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#b2e63a] via-[#9dd132] to-[#1baf0a] flex items-center justify-center text-white font-bold text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-700">
                        {intern.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    
                    {/* Image Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Active Status Badge */}
                    <div className="absolute top-3 right-3">
                      <div className="flex items-center px-2 py-1 bg-green-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white shadow-lg">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse"></div>
                        Active
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="relative p-5 sm:p-6">
                    {/* Intern Info */}
                    <div className="text-center space-y-3">
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-green-700 transition-colors duration-300 capitalize leading-tight">
                        {intern.name}
                      </h3>
                      <p className="text-sm sm:text-base text-green-600 font-semibold capitalize bg-green-50 px-3 py-1.5 rounded-full inline-block">
                        {intern.designation}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mt-3">
                        {intern.about}
                      </p>
                    </div>

                    {/* Decorative Bottom Border */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-3/4 h-0.5 bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] transition-all duration-500 rounded-full"></div>
                  </div>

                  {/* Floating Action Button */}
                  <div className="absolute -bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Interns Available</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  We currently don't have any active interns to showcase. Check back later to meet our team members.
                </p>
              </motion.div>
            </div>
          )}
        </div>
      </section>

       {/* Responsive Internship Details Section - Firestore Data */}
       {!loading && internships.length > 0 && (
        <section className="py-8 sm:py-10 md:py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-6 sm:mb-8"
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
      <section className="py-8 sm:py-10 md:py-12 bg-gradient-to-br from-green-50 via-emerald-50/50 to-teal-50">
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
            className="text-center mb-8 sm:mb-10 lg:mb-12"
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
      <section className="py-8 sm:py-10 md:py-12 bg-gradient-to-r from-green-800 to-emerald-600 text-white">
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