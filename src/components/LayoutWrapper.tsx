'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const isShowcaseRoute = pathname === '/showcase';

  return (
    <div className="min-h-full">
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isAdminRoute && !isShowcaseRoute && <Footer />}
      {!isAdminRoute && !isShowcaseRoute && <ScrollToTop />}
    </div>
  );
}