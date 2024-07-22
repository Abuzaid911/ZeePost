import React from 'react';
import Image from 'next/image';

export interface PostType {
  id: string;
  title: string;
  content: string;
  user: {
    name: string;
    image: string | null;
    handle: string;
  };
  timestamp: string;
}

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="p-4 my-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="flex items-start">
        <img
          className="rounded-full"
          src={post.user?.image ?? "/default-avatar.png"}
          alt={post.user?.name ?? "User"}
          width={48}
          height={48}
          loading="lazy"
        />
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">{post.user?.name}</p>
              {/* <p className="text-sm text-gray-500">{post.user?.handle} &middot; {post.timestamp}</p> */}
            </div>
          </div>
          <div className="mt-2">
            <h2 className="text-lg font-semibold text-gray-900">{post.title}</h2>
            <p className="mt-1 text-gray-700">{post.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;