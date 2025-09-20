import React from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostCardProps {
  post: Post;
  onView?: (post: Post) => void;
  className?: string;
}

const PostCard: React.FC<PostCardProps> = ({ post, onView, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${className}`}>
      <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
        {post.title}
      </h3>
      <p className="text-gray-600 mb-4 line-clamp-3">
        {post.body}
      </p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          User ID: {post.userId}
        </span>
        {onView && (
          <button
            onClick={() => onView(post)}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;