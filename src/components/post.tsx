import React from 'react';

export interface PostType {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  user: {
    name: string|null;
    image: string|null;
  };
}

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="post max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="post-header flex justify-between items-center mb-4">
        <div className="flex items-center">
          {post.user.image && (
            <img
              src={post.user.image}
              alt={post.user.name??""}
              className="w-10 h-10 rounded-full mr-4"
            />
          )}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
            <p className="text-sm text-gray-500">By {post.user.name}</p>
          </div>
        </div>
        {/* <span className="text-sm text-gray-500">
          {new Date(post.createdAt).toLocaleDateString()}
        </span> */}
      </div>
      <p className="text-gray-600 mb-4">{post.content}</p>

    </div>
  );
};

export default Post;