'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testConnection() {
      try {
        // Test the connection by fetching the current user
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        // If we get here, the connection is working
        setStatus('success');
      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      }
    }

    testConnection();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Supabase Connection Test</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
        {status === 'loading' && (
          <div className="text-blue-600">Testing connection...</div>
        )}
        {status === 'success' && (
          <div className="text-green-600">✅ Connection successful!</div>
        )}
        {status === 'error' && (
          <div className="text-red-600">
            ❌ Connection failed: {error}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
        <div className="space-y-2">
          <p className="flex items-center">
            <strong className="w-64">NEXT_PUBLIC_SUPABASE_URL:</strong>
            <span className={process.env.NEXT_PUBLIC_SUPABASE_URL ? 'text-green-600' : 'text-red-600'}>
              {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Not set'}
            </span>
          </p>
          <p className="flex items-center">
            <strong className="w-64">NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong>
            <span className={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'text-green-600' : 'text-red-600'}>
              {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Not set'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
} 