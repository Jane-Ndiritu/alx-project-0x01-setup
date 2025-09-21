import React from 'react';
import { UserProps } from '@/interfaces';

interface UserCardProps {
  user: UserProps;
  onView?: () => void;
  className?: string;
}

const UserCard: React.FC<UserCardProps> = ({ user, onView, className = '' }) => {
  return (
    <div className={`p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {user.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">@{user.username}</p>
        </div>
      </div>

      <div className="mb-4 space-y-1 text-sm text-gray-600">
        <p>📧 {user.email}</p>
        <p>🏢 {user.company.name}</p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <span className="text-sm text-gray-500">ID: {user.id}</span>
        {onView && (
          <button
            onClick={onView}
            className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;