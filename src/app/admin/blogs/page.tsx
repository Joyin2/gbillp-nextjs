'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useAuth } from '@/lib/auth/AuthContext';

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  created_at: string;
  status: 'draft' | 'published';
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        console.log('Starting to fetch blogs...');

        // Attempt to fetch blogs directly
        const { data, error: supabaseError } = await supabase
          .from('blogs')
          .select('id, title, excerpt, created_at, status')
          .order('created_at', { ascending: false });

        if (supabaseError) {
          console.error('Supabase error details:', {
            message: supabaseError.message,
            code: supabaseError.code,
            details: supabaseError.details,
            hint: supabaseError.hint
          });

          // Handle specific error cases
          if (supabaseError.code === '42P01') {
            throw new Error('The blogs table does not exist. Please check your database setup.');
          } else if (supabaseError.code === '42501') {
            throw new Error('You do not have permission to access the blogs table.');
          } else {
            throw new Error(`Failed to fetch blogs: ${supabaseError.message}`);
          }
        }

        if (!data) {
          console.log('No data returned from query');
          setBlogs([]);
          return;
        }

        console.log('Blogs fetched successfully:', data);
        setBlogs(data);
      } catch (error) {
        console.error('Error in fetchBlogs:', error);
        if (error instanceof Error) {
          console.error('Error details:', {
            message: error.message,
            name: error.name,
            stack: error.stack
          });
          setError(error.message);
        } else {
          console.error('Unknown error type:', error);
          setError('An unexpected error occurred while fetching blogs.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [supabase]);

  const handleDelete = async (id: string) => {
    if (!user) {
      setError('You must be logged in to delete blogs.');
      return;
    }

    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const { error: deleteError } = await supabase
          .from('blogs')
          .delete()
          .eq('id', id);

        if (deleteError) {
          throw new Error(deleteError.message);
        }
        
        setBlogs(blogs.filter(blog => blog.id !== id));
      } catch (error) {
        console.error('Error deleting blog:', error);
        setError(error instanceof Error ? error.message : 'Failed to delete blog. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
        {user ? (
          <Link
            href="/admin/blogs/create"
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
          >
            Create New Blog
          </Link>
        ) : (
          <Link
            href="/admin/login"
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
          >
            Login to Create Blog
          </Link>
        )}
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-12 bg-white shadow rounded-lg">
          <p className="text-gray-500">No blogs found. {user ? 'Create your first blog post!' : 'Login to create a blog post.'}</p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Excerpt
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  {user && (
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <motion.tr
                    key={blog.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {blog.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 line-clamp-2">
                        {blog.excerpt}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        blog.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </td>
                    {user && (
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/admin/blogs/edit/${blog.id}`}
                          className="text-emerald-600 hover:text-emerald-900 mr-4"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
} 