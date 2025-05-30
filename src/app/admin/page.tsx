import { supabase } from '@/lib/supabase';

async function getStats() {
  const [
    productsCount,
    usersCount,
    blogsCount,
    investorsCount,
    internshipsCount,
    contactsCount
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact' }),
    supabase.from('admin_users').select('*', { count: 'exact' }),
    supabase.from('blogs').select('*', { count: 'exact' }),
    supabase.from('investors').select('*', { count: 'exact' }),
    supabase.from('internships').select('*', { count: 'exact' }),
    supabase.from('contacts').select('*', { count: 'exact' })
  ]);

  return {
    products: productsCount.count || 0,
    users: usersCount.count || 0,
    blogs: blogsCount.count || 0,
    investors: investorsCount.count || 0,
    internships: internshipsCount.count || 0,
    contacts: contactsCount.count || 0
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { title: 'Products', value: stats.products, color: 'bg-blue-500' },
    { title: 'Admin Users', value: stats.users, color: 'bg-green-500' },
    { title: 'Blogs', value: stats.blogs, color: 'bg-purple-500' },
    { title: 'Investors', value: stats.investors, color: 'bg-yellow-500' },
    { title: 'Internships', value: stats.internships, color: 'bg-red-500' },
    { title: 'Contacts', value: stats.contacts, color: 'bg-indigo-500' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`${card.color} rounded-lg p-6 text-white shadow-lg`}
          >
            <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
            <p className="text-3xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 