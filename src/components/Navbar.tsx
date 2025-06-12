"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { logo } from '@/lib/imageUrls';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? '' : name);
  };

  // Handle clicks outside of mobile menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Add scroll event listener to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-black/40 backdrop-blur-xl py-4'
        : 'bg-transparent py-4'}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-14 w-14 overflow-hidden">
                <Image
                  src="https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/logo.png"
                  alt="Green Business Initiative Logo"
                  width={56}
                  height={56}
                  className="object-cover"
                />
              </div>
              <div className="text-lg font-bold text-white hidden sm:block uppercase leading-tight">
                <div className="light-gradient-text" style={{ wordSpacing: '0.3em' }}>Green Business</div>
                <div className="light-gradient-text" style={{ wordSpacing: '0.5em' }}>Initiative LLP</div>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavLink href="/" scrolled={scrolled}>Home</NavLink>
            <NavLink href="/about" scrolled={scrolled}>About</NavLink>
            
            {/* Products Dropdown */}
            <div className="relative group">
              <button
                className={`px-3 py-2 rounded-md group flex items-center font-bold uppercase ${scrolled
                  ? 'hover:bg-white/20'
                  : 'hover:bg-white/10'} transition-colors duration-200`}
              >
                <span className="text-white">Products</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:rotate-180 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-1 w-56 origin-top-left rounded-md shadow-lg overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                <div className="bg-black/80 backdrop-blur-sm ring-1 ring-white/10 py-1 divide-y divide-white/10">
                  <ProductLink href="/products/pickle">Pickle</ProductLink>
                  <ProductLink href="/products/rice">Rice</ProductLink>
                  <ProductLink href="/products/dry-bean">Dry Bean (Forash)</ProductLink>
                  <ProductLink href="/products/dry-hathkora">Dry Hathkora</ProductLink>
                  <ProductLink href="/products/tezpatta">Tezpatta</ProductLink>
                  <ProductLink href="/products/handicraft">Decorative Handicraft</ProductLink>
                  <ProductLink href="/products/plantation">Orange & Lemon Plantation</ProductLink>
                  <ProductLink href="/products/chaiwala">Sylethi Chaiwala</ProductLink>
                </div>
              </div>
            </div>
            
            <NavLink href="/eco-tourism" scrolled={scrolled}>Eco-Tourism</NavLink>
            <NavLink href="/blogs" scrolled={scrolled}>Blogs</NavLink>
            <NavLink href="/investor" scrolled={scrolled}>Investor</NavLink>
            <NavLink href="/internship" scrolled={scrolled}>Internship</NavLink>
            
            {/* Contact Button with highlight */}
            <Link
              href="/contact"
              className={`ml-2 px-4 py-2 rounded-full font-medium transition-all duration-300 bg-gradient-to-r from-[#b2e63a] to-[#31cc20] text-white hover:shadow-emerald-500/20 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 uppercase`}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              className="outline-none p-2 rounded-md transition-colors duration-200 hover:bg-white/10"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 ${scrolled ? 'text-white' : 'text-white'}`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="lg:hidden fixed inset-0 z-50 mt-20 bg-black bg-opacity-50 overflow-y-auto"
          onClick={(e) => e.target === e.currentTarget && setIsMenuOpen(false)}
        >
          <div className="bg-gradient-to-b from-emerald-800 to-teal-600 text-white rounded-t-xl shadow-xl max-w-sm mx-auto overflow-hidden transform transition-all">
            <div className="px-4 py-4 space-y-3">
              <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
              <MobileNavLink href="/about" onClick={() => setIsMenuOpen(false)}>About GBI</MobileNavLink>
              
              {/* Mobile Products Dropdown */}
              <div className="border-b border-emerald-500/30 pb-2">
                <button
                  className="w-full flex justify-between items-center px-3 py-2 text-white hover:bg-emerald-700/50 rounded-md transition-colors duration-200 uppercase"
                  onClick={() => toggleDropdown('products')}
                >
                  <span className="font-medium">Products</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {activeDropdown === 'products' && (
                  <div className="pl-4 mt-1 space-y-1 border-l-2 border-emerald-400 ml-3">
                    <MobileProductLink href="/products/pickle" onClick={() => setIsMenuOpen(false)}>Pickle</MobileProductLink>
                    <MobileProductLink href="/products/rice" onClick={() => setIsMenuOpen(false)}>Rice</MobileProductLink>
                    <MobileProductLink href="/products/dry-bean" onClick={() => setIsMenuOpen(false)}>Dry Bean (Forash)</MobileProductLink>
                    <MobileProductLink href="/products/dry-hathkora" onClick={() => setIsMenuOpen(false)}>Dry Hathkora</MobileProductLink>
                    <MobileProductLink href="/products/tezpatta" onClick={() => setIsMenuOpen(false)}>Tezpatta</MobileProductLink>
                    <MobileProductLink href="/products/handicraft" onClick={() => setIsMenuOpen(false)}>Decorative Handicraft</MobileProductLink>
                    <MobileProductLink href="/products/plantation" onClick={() => setIsMenuOpen(false)}>Orange & Lemon Plantation</MobileProductLink>
                    <MobileProductLink href="/products/chaiwala" onClick={() => setIsMenuOpen(false)}>Sylethi Chaiwala</MobileProductLink>
                  </div>
                )}
              </div>
              
              <MobileNavLink href="/eco-tourism" onClick={() => setIsMenuOpen(false)}>Eco-Tourism</MobileNavLink>
              <MobileNavLink href="/blogs" onClick={() => setIsMenuOpen(false)}>Blogs & News</MobileNavLink>
              <MobileNavLink href="/investor" onClick={() => setIsMenuOpen(false)}>Investor</MobileNavLink>
              <MobileNavLink href="/internship" onClick={() => setIsMenuOpen(false)}>Internship</MobileNavLink>
              
              {/* Contact Button */}
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="block w-full text-center px-4 py-3 rounded-md bg-gradient-to-r from-[#b2e63a] to-[#31cc20] text-white font-medium hover:shadow-lg transition-all duration-200 shadow-md uppercase"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// Helper Components
const NavLink = ({ href, children, scrolled }: { href: string; children: React.ReactNode; scrolled: boolean }) => (
  <Link
    href={href}
    className={`px-3 py-2 rounded-md font-bold text-white uppercase ${scrolled
      ? 'hover:bg-white/20'
      : 'hover:bg-white/10'} transition-colors duration-200`}
  >
    {children}
  </Link>
);

const ProductLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="block px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors duration-200 font-bold uppercase"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) => (
  <Link
    href={href}
    className="block px-3 py-2 text-white hover:bg-emerald-700/50 rounded-md transition-colors duration-200 font-bold uppercase"
    onClick={onClick}
  >
    {children}
  </Link>
);

const MobileProductLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) => (
  <Link
    href={href}
    className="block px-3 py-1.5 text-sm text-white/90 hover:bg-emerald-700/30 hover:text-white rounded transition-colors duration-200 font-bold uppercase"
    onClick={onClick}
  >
    {children}
  </Link>
);

const SocialIcon = ({ icon }: { icon: string }) => {
  const getIcon = () => {
    switch (icon) {
      case 'facebook':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
          </svg>
        );
      case 'twitter':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        );
      case 'instagram':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <a 
      href="#" 
      className="text-white hover:text-emerald-200 transition-colors duration-200 p-2 rounded-full bg-white/10 hover:bg-white/20"
    >
      {getIcon()}
    </a>
  );
};

export default Navbar;