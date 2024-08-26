import React from 'react';

import { HeaderComponent, PostComponent } from '../components'
import { Post as PostType } from '../interfaces/types';

export const Feeds: React.FC = () => {
  const posts: PostType[] = [
    {
      id: 1,
      user: { name: 'John Doe', avatar: 'avatar.jpg' },
      content: 'Hello, world!',
      date: '2023-11-22',
      likes: 10,
      comments: [],
    },
  ];
  
  return (
    <div>
      <HeaderComponent />
      {posts.map((post) => (
        <PostComponent key={post.id} {...post} />
      ))}
    </div>
  );
};
