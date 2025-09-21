import React from 'react';
import { UserProps } from '@/interfaces';

interface UserCardProps {
  user: UserProps;
  onView?: (user: UserProps) => void;
  onEdit?: (user: UserProps) => void;
  onDelete?: (user: UserProps) => void;
  className?: string;
  showActions?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onView,
  onEdit,
  onDelete,
  className = '',
  showActions = true,
  variant = 'default'
}) => {
  const handleView = () => onView?.(user);
  const handleEdit = () => onEdit?.(user);
  const handleDelete = () => onDelete?.(user);

  // Generate gradient based on user ID for consistent colors
  const gradientColors = [
    'from-blue-500 to-purple-600',
    'from-green-500 to-teal-600',
    'from-orange-500 to-red-600',
    'from-pink-500 to-rose-600',
    'from-indigo-500 to-blue-600',
    'from-emerald-500 to-green-600',
    'from-amber-500 to-orange-600',
    'from-violet-500 to-purple-600',
    'from-cyan-500 to-blue-600',
    'from-lime-500 to-green-600'
  ];
  
  const gradient = gradientColors[user.id % gradientColors.length];

  if (variant === 'compact') {
    return (
      <div className={`max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 ${gradient} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-800 truncate">{user.name}</h3>
            <p className="text-gray-600 text-sm truncate">@{user.username}</p>
            <p className="text-blue-600 text-sm truncate">{user.email}</p>
          </div>
        </div>
        {showActions && (
          <div className="mt-4 flex space-x-2">
            {onView && (
              <button
                onClick={handleView}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
              >
                View
              </button>
            )}
            {onEdit && (
              <button
                onClick={handleEdit}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>
      {/* Header with Avatar and Basic Info */}
      <div className="flex items-center space-x-4 mb-4">
        <div className={`w-16 h-16 ${gradient} rounded-full flex items-center justify-center text-white font-bold text-2xl`}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">@{user.username}</p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mb-4 space-y-2">
        <div className="flex items-center text-gray-600">
          <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="truncate">{user.email}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>{user.phone}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          <span>{user.website}</span>
        </div>
      </div>

      {/* Address Section */}
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Address
        </h4>
        <p className="text-sm text-gray-600">
          {user.address.street}, {user.address.suite}
          <br />
          {user.address.city}, {user.address.zipcode}
          <br />
          <span className="text-xs text-gray-500">
            📍 {user.address.geo.lat}, {user.address.geo.lng}
          </span>
        </p>
      </div>

      {/* Company Section */}
      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-medium text-blue-700 mb-2 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-4 0H9m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12m4 0V9" />
          </svg>
          Company
        </h4>
        <p className="text-sm font-semibold text-blue-800">{user.company.name}</p>
        <p className="text-sm text-blue-600 mt-1">"{user.company.catchPhrase}"</p>
        <p className="text-xs text-blue-500 italic mt-1">{user.company.bs}</p>
      </div>

      {/* Footer with Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          <span>User ID: {user.id}</span>
        </div>
        
        {showActions && (
          <div className="flex space-x-2">
            {onView && (
              <button
                onClick={handleView}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                View
              </button>
            )}
            {onEdit && (
              <button
                onClick={handleEdit}
                className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={handleDelete}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;