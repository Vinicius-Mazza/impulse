import React, { useState } from 'react';

import { HeaderComponent, PostComponent } from '../components'
import { Post as PostType } from '../interfaces/types';

export const Feeds: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([
    {
      id: 1,
      user: { name: 'John Doe', avatar: 'avatar.jpg' },
      content: 'Hello, world!',
      date: new Date("2024-08-23"),
      likes: 10,
      comments: [],
    },
    {
      id: 2,
      user: { name: 'Jane Doe', avatar: 'avatar.jpg' },
      content: 'Hello, world! 02',
      date: new Date("2023-11-22"),
      likes: 25,
      comments: [],
    },
    {
      id: 3,
      user: { name: 'Test', avatar: 'avatar.jpg' },
      content: 'Hello, world! 03',
      date: new Date("2023-11-22"),
      likes: 6,
      comments: [],
    }
  ]);
  const [filter, setFilter] = useState('popular');

  const handleFilterChange = (tab: string) => {
    setFilter(tab);
  };

  const filteredPosts = posts.filter((post) => {
    switch (filter) {
      case 'recents':
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        oneWeekAgo.setHours(0, 0, 0, 0);
  
        const postDateUTC = new Date(post.date).toUTCString();
        const oneWeekAgoUTC = oneWeekAgo.toUTCString();
  
        const postTimestamp = new Date(postDateUTC).getTime();
        const oneWeekAgoTimestamp = new Date(oneWeekAgoUTC).getTime();
  
        return postTimestamp >= oneWeekAgoTimestamp;

      case 'friends':
        return post.id === 3;
      case 'popular':
        return post.likes >= 10
      default:
        return true;
    }
  });

  return (
    <div>
      <HeaderComponent onFilterChange={handleFilterChange} />
      {filteredPosts.map((post) => (
        <PostComponent key={post.id} {...post} />
      ))}
    </div>
  );
};
