import React from 'react';

export interface PostType {
  id: string;
  title: string;
  content: string;
}

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
};

export default Post;