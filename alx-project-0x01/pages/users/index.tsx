import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import UserCard from '../../components/common/UserCard';
import PostCard from '../../components/common/PostCard';
import { UserProps, PostProps } from '../../interfaces';

export async function getStaticProps() {
  try {
    const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await usersResponse.json();
    
    const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await postsResponse.json();
    
    return {
      props: {
        users: users || [],
        posts: posts.slice(0, 5) || []
      }
    };
  } catch (error) {
    return {
      props: {
        users: [],
        posts: []
      }
    };
  }
}

interface UsersPageProps {
  users: UserProps[];
  posts: PostProps[];
}

// CHANGE: Rename component from UsersPage to Users
const Users: React.FC<UsersPageProps> = ({ users, posts }) => {
  const handleViewUser = (user: UserProps) => {
    console.log('Viewing user:', user);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Users</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onView={() => handleViewUser(user)}
              />
            ))}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Recent Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                body={post.body}
                userId={post.userId}
                id={post.id}
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

// CHANGE: This must be exactly "export default Users;" 
export default Users;