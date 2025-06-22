'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { authorisedLogos } from '@/lib/imageUrls';

interface FooterData {
  companyName: string;
  companyDescription: string;
  socialHeading: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    linkedin: string;
    twitter: string;
    youtube: string;
  };
  productsSection: {
    title: string;
    items: string[];
  };
  usefulLinksSection: {
    title: string;
    items: Array<{
      name: string;
      link: string;
    }>;
  };
  contactSection: {
    title: string;
    address: string;
    email: string;
    phone: string;
  };
}

const Footer = () => {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const footerDoc = doc(db, 'footerData', 'HWDEXJPYWk4rDiIH7sFH');
        const docSnap = await getDoc(footerDoc);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setFooterData({
            companyName: data.companyName || 'Green Business Initiative LLP',
            companyDescription: data.companyDescription || 'Green Business Initiative LLP (GBI) is an American Indian partnership, that is currently in the business that encompasses agriculture, animal husbandry, and related commercial activities.',
            socialHeading: data.socialHeading || 'Get connected with us on social networks:',
            socialLinks: {
              facebook: data.socialLinks?.facebook || '',
              instagram: data.socialLinks?.instagram || '',
              linkedin: data.socialLinks?.linkedin || '',
              twitter: data.socialLinks?.twitter || '',
              youtube: data.socialLinks?.youtube || '',
            },
            productsSection: {
              title: data.productsSection?.title || 'Products',
              items: data.productsSection?.items || []
            },
            usefulLinksSection: {
              title: data.usefulLinksSection?.title || 'Useful Links',
              items: data.usefulLinksSection?.items || []
            },
            contactSection: {
              title: data.contactSection?.title || 'Contact',
              address: data.contactSection?.address || 'Paikan, Gumra, Assam 788815',
              email: data.contactSection?.email || 'info@gbillp.com',
              phone: data.contactSection?.phone || '+91 99571 16126'
            }
          });
        } else {
          // Fallback to default values
          setFooterData({
            companyName: 'Green Business Initiative LLP',
            companyDescription: 'Green Business Initiative LLP (GBI) is an American Indian partnership, that is currently in the business that encompasses agriculture, animal husbandry, and related commercial activities.',
            socialHeading: 'Get connected with us on social networks:',
            socialLinks: {
              facebook: '',
              instagram: '',
              linkedin: '',
              twitter: '',
              youtube: '',
            },
            productsSection: {
              title: 'Products',
              items: ['Eco-Village', 'Pickles', 'Aromatic Rice', 'Dry Bean', 'Dry Hathkora', 'Tezpatta', 'Arts & Crafts', 'Orange Plantation']
            },
            usefulLinksSection: {
              title: 'Useful Links',
              items: [
                { name: 'About GBI', link: '/about' },
                { name: 'Eco-tourism', link: '/eco-tourism' },
                { name: 'Blogs', link: '/blogs' },
                { name: 'Contact Us', link: '/contact' },
                { name: 'Privacy Policy', link: '/privacy-policy' }
              ]
            },
            contactSection: {
              title: 'Contact',
              address: 'Paikan, Gumra, Assam 788815',
              email: 'info@gbillp.com',
              phone: '+91 99571 16126'
            }
          });
        }
      } catch (error) {
        console.error('Error fetching footer data:', error);
        // Fallback to default values on error
        setFooterData({
          companyName: 'Green Business Initiative LLP',
          companyDescription: 'Green Business Initiative LLP (GBI) is an American Indian partnership, that is currently in the business that encompasses agriculture, animal husbandry, and related commercial activities.',
          socialHeading: 'Get connected with us on social networks:',
          socialLinks: {
            facebook: '',
            instagram: '',
            linkedin: '',
            twitter: '',
            youtube: '',
          },
          productsSection: {
            title: 'Products',
            items: ['Eco-Village', 'Pickles', 'Aromatic Rice', 'Dry Bean', 'Dry Hathkora', 'Tezpatta', 'Arts & Crafts', 'Orange Plantation']
          },
          usefulLinksSection: {
            title: 'Useful Links',
            items: [
              { name: 'About GBI', link: '/about' },
              { name: 'Eco-tourism', link: '/eco-tourism' },
              { name: 'Blogs', link: '/blogs' },
              { name: 'Contact Us', link: '/contact' },
              { name: 'Privacy Policy', link: '/privacy-policy' }
            ]
          },
          contactSection: {
            title: 'Contact',
            address: 'Paikan, Gumra, Assam 788815',
            email: 'info@gbillp.com',
            phone: '+91 99571 16126'
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  // Helper function to get product link based on product name
  const getProductLink = (productName: string): string => {
    const productMap: { [key: string]: string } = {
      'Eco-Village': '/eco-tourism',
      'Pickles': '/products/pickle',
      'Aromatic Rice': '/products/rice',
      'Dry Bean': '/products/dry-bean',
      'Dry Hathkora': '/products/dry-hathkora',
      'Tezpatta': '/products/tezpatta',
      'Arts & Crafts': '/products/handicraft',
      'Orange Plantation': '/products/plantation'
    };
    return productMap[productName] || '/products';
  };

  const authorizedLogos = [
    {
      src: authorisedLogos.ashok,
      alt: 'Ashok Logo',
      width: 100,
      height: 100
    },
    {
      src: authorisedLogos.assamStartup,
      alt: 'Assam Startup Logo',
      width: 100,
      height: 100
    },
    {
      src: authorisedLogos.fssai,
      alt: 'FSSAI Logo',
      width: 100,
      height: 100
    },
    {
      src: authorisedLogos.mca,
      alt: 'MCA Logo',
      width: 100,
      height: 100
    },
    {
      src: authorisedLogos.msme,
      alt: 'MSME Logo',
      width: 100,
      height: 100
    },
    {
      src: authorisedLogos.startupIndia,
      alt: 'Startup India Logo',
      width: 100,
      height: 100
    }
  ];

  return (
    <footer className="bg-gray-100 pt-8 sm:pt-10 md:pt-12 lg:pt-16 pb-4 sm:pb-6">
      {/* Responsive Social Media Links */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="text-center">
          {loading ? (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="flex justify-center space-x-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-10 h-10 bg-gray-200 rounded-full"></div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 px-4">{footerData?.socialHeading}</p>
              <div className="flex justify-center space-x-3 sm:space-x-4 flex-wrap gap-2 sm:gap-0">
                {footerData?.socialLinks.facebook && (
                  <a href={footerData.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 relative bg-gradient-to-br from-[#b2e63a]/80 via-[#b2e63a]/85 to-[#1baf0a]/80 shadow-md shadow-[#1baf0a]/20 hover:shadow-lg hover:shadow-[#1baf0a]/30 hover:scale-110 group">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#b2e63a] to-[#1baf0a] opacity-0 group-hover:opacity-15 transition-opacity duration-300"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="sm:w-[18px] sm:h-[18px] bi bi-facebook relative z-10 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 16 16">
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                    </svg>
                  </a>
                )}
                {footerData?.socialLinks.twitter && (
                  <a href={footerData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 relative bg-gradient-to-br from-[#b2e63a]/80 via-[#b2e63a]/85 to-[#1baf0a]/80 shadow-md shadow-[#1baf0a]/20 hover:shadow-lg hover:shadow-[#1baf0a]/30 hover:scale-110 group">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#b2e63a] to-[#1baf0a] opacity-0 group-hover:opacity-15 transition-opacity duration-300"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="sm:w-[18px] sm:h-[18px] relative z-10 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                )}
                {footerData?.socialLinks.instagram && (
                  <a href={footerData.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 relative bg-gradient-to-br from-[#b2e63a]/80 via-[#b2e63a]/85 to-[#1baf0a]/80 shadow-md shadow-[#1baf0a]/20 hover:shadow-lg hover:shadow-[#1baf0a]/30 hover:scale-110 group">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#b2e63a] to-[#1baf0a] opacity-0 group-hover:opacity-15 transition-opacity duration-300"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="sm:w-[18px] sm:h-[18px] bi bi-instagram relative z-10 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 16 16">
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                    </svg>
                  </a>
                )}
                {footerData?.socialLinks.linkedin && (
                  <a href={footerData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 relative bg-gradient-to-br from-[#b2e63a]/80 via-[#b2e63a]/85 to-[#1baf0a]/80 shadow-md shadow-[#1baf0a]/20 hover:shadow-lg hover:shadow-[#1baf0a]/30 hover:scale-110 group">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#b2e63a] to-[#1baf0a] opacity-0 group-hover:opacity-15 transition-opacity duration-300"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="sm:w-[18px] sm:h-[18px] bi bi-linkedin relative z-10 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 16 16">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                    </svg>
                  </a>
                )}
                {footerData?.socialLinks.youtube && (
                  <a href={footerData.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 relative bg-gradient-to-br from-[#b2e63a]/80 via-[#b2e63a]/85 to-[#1baf0a]/80 shadow-md shadow-[#1baf0a]/20 hover:shadow-lg hover:shadow-[#1baf0a]/30 hover:scale-110 group">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#b2e63a] to-[#1baf0a] opacity-0 group-hover:opacity-15 transition-opacity duration-300"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="sm:w-[18px] sm:h-[18px] bi bi-youtube relative z-10 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 16 16">
                      <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
                    </svg>
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <hr className="border-gray-300 my-4 sm:my-6 mx-4 sm:mx-6 lg:mx-8" />

      {/* Responsive Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {/* Column 1 - About */}
          <div className="text-center sm:text-left mb-6 sm:mb-0">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ) : (
              <>
                <h6 className="font-bold mb-3 sm:mb-4 uppercase text-sm sm:text-base border-b border-gray-300 pb-4" style={{
                  background: 'linear-gradient(45deg, #b2e63a, #1baf0a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>{footerData?.companyName}</h6>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-w-md mx-auto sm:mx-0">
                  {footerData?.companyDescription}
                </p>
              </>
            )}
          </div>

          {/* Column 2 - Products */}
          <div className="text-center sm:text-left mb-6 sm:mb-0">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded w-32"></div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <h6 className="font-bold mb-3 sm:mb-4 uppercase text-sm sm:text-base border-b border-gray-300 pb-4" style={{
                  background: 'linear-gradient(45deg, #b2e63a, #1baf0a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>{footerData?.productsSection.title}</h6>
                <ul className="list-none mb-0 text-xs sm:text-sm space-y-1 sm:space-y-2">
                  {footerData?.productsSection.items.map((product, index) => (
                    <li key={index} className="mb-2">
                      <Link href={getProductLink(product)} className="text-gray-600 hover:text-green-600">
                        {product}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Column 3 - Useful Links */}
          <div className="text-center sm:text-left mb-6 sm:mb-0">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded w-28"></div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <h6 className="font-bold mb-3 sm:mb-4 capitalize text-sm sm:text-base border-b border-gray-300 pb-4" style={{
                  background: 'linear-gradient(45deg, #b2e63a, #1baf0a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>{footerData?.usefulLinksSection.title}</h6>
                <ul className="list-none mb-0 text-xs sm:text-sm space-y-1 sm:space-y-2">
                  {footerData?.usefulLinksSection.items.map((item, index) => (
                    <li key={index} className="mb-2">
                      <Link href={item.link} className="text-gray-600 hover:text-green-600">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Column 4 - Contact */}
          <div className="text-center sm:text-left">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ) : (
              <>
                <h6 className="font-bold mb-3 sm:mb-4 uppercase text-sm sm:text-base border-b border-gray-300 pb-4" style={{
                  background: 'linear-gradient(45deg, #b2e63a, #1baf0a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>{footerData?.contactSection.title}</h6>
                <div className="space-y-2 sm:space-y-3">
                  <p className="flex items-center justify-center sm:justify-start text-xs sm:text-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{
                      stroke: 'url(#locationGradient)'
                    }}>
                      <defs>
                        <linearGradient id="locationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#b2e63a" />
                          <stop offset="100%" stopColor="#1baf0a" />
                        </linearGradient>
                      </defs>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="break-words">{footerData?.contactSection.address}</span>
                  </p>
                  <p className="flex items-center justify-center sm:justify-start text-xs sm:text-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{
                      stroke: 'url(#emailGradient)'
                    }}>
                      <defs>
                        <linearGradient id="emailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#b2e63a" />
                          <stop offset="100%" stopColor="#1baf0a" />
                        </linearGradient>
                      </defs>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="break-all">{footerData?.contactSection.email}</span>
                  </p>
                  <p className="flex items-center justify-center sm:justify-start text-xs sm:text-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{
                      stroke: 'url(#phoneGradient)'
                    }}>
                      <defs>
                        <linearGradient id="phoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#b2e63a" />
                          <stop offset="100%" stopColor="#1baf0a" />
                        </linearGradient>
                      </defs>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{footerData?.contactSection.phone}</span>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Responsive Copyright */}
      <div className="text-center mt-6 sm:mt-8 md:mt-10 pt-3 sm:pt-4 border-t border-gray-300 mx-4 sm:mx-6 lg:mx-8">
        <p className="text-gray-600 text-xs sm:text-sm px-4 leading-relaxed">
          <span className="block sm:inline">© Trademark & Copyright 2024</span>
          <span className="hidden sm:inline"> | </span>
          <span className="block sm:inline">All Rights Reserved</span>
          <span className="hidden sm:inline"> | </span>
          <span className="block sm:inline">{footerData?.companyName || 'Green Business Initiative LLP'}</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;