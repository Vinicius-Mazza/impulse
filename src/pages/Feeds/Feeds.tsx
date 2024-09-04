import React, { useState } from 'react';
import { FeedsHeaderComponent, PostComponent } from '../../components'
import { filterPosts, FilterType } from '../../utils/filters'
import { useFetchPosts } from '../../hooks'

export const Feeds: React.FC = () => {
  const { posts, isLoading, error } = useFetchPosts();
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const handleFilterChange = (tab: FilterType) => setFilter(tab);
  const filteredPosts = filterPosts(posts, filter);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Ocorreu um erro: {error.message}</p>;
  }

  return (
    <div>
      <FeedsHeaderComponent onFilterChange={handleFilterChange} />
      {filteredPosts.map((post) => (
        <PostComponent key={post.id} {...post} />
      ))}
    </div>
  );
};
