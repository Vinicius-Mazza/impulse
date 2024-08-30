import React, { useState } from 'react';

import { HeaderComponent, PostComponent } from '../components'
import { Post as PostType } from '../interfaces';
import { filterPosts, FilterType } from '../utils/filters'

export const Feeds: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([
    {
      id: 1,
      user: { name: 'John Doe', avatar: 'avatar.jpg' },
      content: 'Hello, world!',
      date: new Date("2024-08-27"),
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
  
  const [filter, setFilter] = useState<FilterType>(FilterType.Popular);

  const handleFilterChange = (tab: FilterType) => {
    setFilter(tab);
  };
  const filteredPosts = filterPosts(posts, filter);

  return (
    <div>
      <HeaderComponent onFilterChange={handleFilterChange} />
      {filteredPosts.map((post) => (
        <PostComponent key={post.id} {...post} />
      ))}
    </div>
  );
};
