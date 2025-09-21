import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import UserCard from '../../components/common/UserCard';
import { UserProps } from '../../interfaces';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleViewUser = (user: UserProps) => {
    console.log('Viewing user:', user);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Users</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onView={() => handleViewUser(user)}
              />
            ))}
          </div>

          {users.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No users found.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UsersPage;