import React, { useState } from 'react';
import { Skeleton } from '@chakra-ui/react';
import { FeedsHeaderComponent, PostComponent, NotificationComponent } from '../../components'
import { filterPosts, FilterType } from '../../utils/filters'
import { useFetchPosts } from '../../hooks'

export const Feeds: React.FC = () => {
  const { posts, isLoading, error } = useFetchPosts();
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const handleFilterChange = (tab: FilterType) => setFilter(tab);
  const filteredPosts = filterPosts(posts, filter);

  return (
    <div>
      <FeedsHeaderComponent onFilterChange={handleFilterChange} />
      {isLoading ? (
        <Skeleton height='20px' />
      ) : error ? (
        <>
          <Skeleton height='20px' />
          <NotificationComponent 
            title="Erro ao carregar dados" 
            description="Ocorreu um erro inesperado." 
            status="error" 
          />
        </>
      ) : (
        <div>
          {filteredPosts.map((post) => (
            <PostComponent key={post.id} {...post} />
          ))}
        </div>
      )}
    </div>
  );
};
