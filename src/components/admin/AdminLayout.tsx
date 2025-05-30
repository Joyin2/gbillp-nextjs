import { ReactNode } from 'react';
import Link from 'next/link';
import { 
  HomeIcon, 
  UserGroupIcon, 
  ShoppingBagIcon, 
  NewspaperIcon, 
  BriefcaseIcon, 
  UserIcon,
  EnvelopeIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Products', href: '/admin/products', icon: ShoppingBagIcon },
  { name: 'Admin Users', href: '/admin/users', icon: UserGroupIcon },
  { name: 'Blogs', href: '/admin/blogs', icon: NewspaperIcon },
  { name: 'Investors', href: '/admin/investors', icon: BriefcaseIcon },
  { name: 'Internships', href: '/admin/internships', icon: UserIcon },
  { name: 'Contacts', href: '/admin/contacts', icon: EnvelopeIcon },
  { name: 'Test Connection', href: '/admin/test', icon: BeakerIcon },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0">
          <div className="p-4 border-b">
            <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          </div>
          <nav className="mt-4 overflow-y-auto h-[calc(100vh-4rem)]">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 ml-64">
          <div className="p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 