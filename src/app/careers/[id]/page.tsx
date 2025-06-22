'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface DocumentItem {
  url?: string;
  downloadURL?: string;
  name?: string;
  filename?: string;
}

interface Career {
  id: string;
  title: string;
  description: string;
  applyLink: string;
  active: boolean;
  documents: (string | DocumentItem)[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export default function CareerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [career, setCareer] = useState<Career | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const docRef = doc(db, 'careers', resolvedParams.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setCareer({
            id: docSnap.id,
            title: data.title,
            description: data.description,
            applyLink: data.applyLink,
            active: data.active,
            documents: data.documents || [],
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          });
        } else {
          setError('Career position not found');
        }
      } catch (err) {
        console.error('Error fetching career:', err);
        setError('Failed to load career details');
      } finally {
        setLoading(false);
      }
    };

    fetchCareer();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
        {/* Loading Hero Section */}
        <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 bg-gradient-to-r from-[#1baf0a] via-[#b2e63a] to-[#1baf0a] animate-pulse">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-4xl mx-auto px-4">
              <div className="h-8 sm:h-10 md:h-12 lg:h-16 bg-white/20 rounded mb-3 sm:mb-4 w-64 sm:w-80 md:w-96 lg:w-full max-w-3xl mx-auto animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Loading Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 sm:p-6 md:p-8 lg:p-12">
                <div className="space-y-3 sm:space-y-4">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="h-3 sm:h-4 bg-gray-300 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !career) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
        {/* Error Hero Section */}
        <section className="relative h-64 sm:h-72 md:h-80 lg:h-96 w-full overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1baf0a] via-[#b2e63a] to-[#1baf0a]" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg">
              Career Position Not Found
            </h1>
            <p className="text-white/90 text-sm sm:text-base md:text-lg drop-shadow-md">
              The career position you are looking for does not exist
            </p>
          </div>
        </section>

        {/* Error Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto">
            <p className="text-gray-600 mb-8 sm:mb-12 text-sm sm:text-base">{error || 'Please check the URL and try again.'}</p>
            <Link
              href="/career"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] text-white rounded-xl hover:from-[#0f8a08] hover:to-[#9dd132] transition-all duration-300 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Careers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
      {/* Hero Section */}
      <section className="relative h-64 sm:h-72 md:h-80 lg:h-96 w-full overflow-hidden flex items-center justify-center">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1baf0a] via-[#b2e63a] to-[#1baf0a]" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 sm:w-24 sm:h-24 bg-white/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full blur-lg"></div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Hero Title - Career Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 drop-shadow-lg leading-tight max-w-4xl mx-auto">
              <span style={{
                background: "linear-gradient(45deg, #b2e63a, #ffffff, #b2e63a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}>
                {career?.title || 'Career Details'}
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* Navigation Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 py-4 sm:py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/career"
              className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-sm sm:text-base transition-all duration-200 hover:translate-x-1"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden sm:inline">Back to All Careers</span>
              <span className="sm:hidden">Back to Careers</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
            {/* Career Header */}
            <div className="p-4 sm:p-6 md:p-8 lg:p-12">
              <div className="text-center mb-6 sm:mb-8">
                <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-2">
                  Posted on {career.createdAt?.toDate ? new Date(career.createdAt.toDate()).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'N/A'}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    career.active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {career.active ? 'Active Position' : 'Position Closed'}
                  </span>
                </div>
              </div>

              {/* Career Description */}
              <div 
                className="text-gray-700 leading-relaxed space-y-4 sm:space-y-6 career-content text-sm sm:text-base md:text-lg mb-8 sm:mb-12"
                dangerouslySetInnerHTML={{ __html: career.description }}
                style={{
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word'
                }}
              />

                             {/* Career Metadata */}
               <div className="border-t border-gray-200 pt-6 sm:pt-8">
                 <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Position Details</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                   <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                     <h4 className="font-medium text-gray-800 mb-2">Status</h4>
                     <p className={`text-sm sm:text-base font-medium ${
                       career.active ? 'text-green-600' : 'text-red-600'
                     }`}>
                       {career.active ? 'Currently Accepting Applications' : 'Applications Closed'}
                     </p>
                   </div>
                   <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                     <h4 className="font-medium text-gray-800 mb-2">Application</h4>
                     {career.applyLink ? (
                       <a
                         href={career.applyLink}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="text-emerald-600 hover:text-emerald-700 text-sm sm:text-base font-medium hover:underline"
                       >
                         Apply Online →
                       </a>
                     ) : (
                       <p className="text-gray-500 text-sm sm:text-base">No application link available</p>
                     )}
                   </div>
                 </div>
               </div>

                             {/* Documents Section */}
               {career.documents && career.documents.length > 0 && (
                 <div className="border-t border-gray-200 pt-6 sm:pt-8">
                   <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Related Documents</h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                     {career.documents.map((doc, index) => {
                       // Handle both string URLs and document objects
                       const docUrl = typeof doc === 'string' ? doc : (doc?.url || doc?.downloadURL || '');
                       const docName = typeof doc === 'string' 
                         ? (doc.split('/').pop()?.split('?')[0] || `Document ${index + 1}`)
                         : (doc?.name || doc?.filename || `Document ${index + 1}`);
                       
                       // Skip if no valid URL
                       if (!docUrl || typeof docUrl !== 'string') {
                         return null;
                       }

                       return (
                         <a
                           key={index}
                           href={docUrl}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="flex items-center p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
                         >
                           <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-emerald-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                           </svg>
                           <span className="text-gray-700 group-hover:text-emerald-700 text-sm sm:text-base truncate">
                             {docName}
                           </span>
                         </a>
                       );
                     }).filter(Boolean)}
                   </div>
                 </div>
               )}

              {/* Apply Button */}
              {career.active && career.applyLink && (
                <div className="border-t border-gray-200 pt-6 sm:pt-8 text-center">
                  <a
                    href={career.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] text-white rounded-xl hover:from-[#0f8a08] hover:to-[#9dd132] transition-all duration-300 text-base sm:text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Apply for this Position
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Section */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-t border-gray-200 py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
              Explore More Opportunities
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8 max-w-2xl mx-auto">
              Discover more career opportunities and join our mission at Green Business Initiative LLP
            </p>
            <Link
              href="/career"
              className="inline-flex items-center px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] text-white rounded-xl hover:from-[#0f8a08] hover:to-[#9dd132] transition-all duration-300 text-base sm:text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden sm:inline">Back to All Careers</span>
              <span className="sm:hidden">All Careers</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 