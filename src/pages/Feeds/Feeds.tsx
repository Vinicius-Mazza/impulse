import React, { useState } from 'react';
import { Skeleton, Flex, Box } from '@chakra-ui/react';
import { 
  FeedsHeaderComponent, 
  PostComponent, 
  NotificationComponent, 
  ActivityFeedComponent
} from '../../components'
import { filterPosts, FilterType } from '../../utils/filters'
import { Post } from '../../interfaces'
import { useFetchData } from '../../hooks'

export const Feeds: React.FC = () => {
  const urlApiPosts = 'http://localhost:3001/posts'
  const { data: posts, isLoading, error } = useFetchData<Post[]>(urlApiPosts);
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const handleFilterChange = (tab: FilterType) => setFilter(tab);
  const filteredPosts = posts ? filterPosts(posts, filter) : [];

  return (
    <Flex>
      <Box flex="1" pr="340" mt={6}>
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
      </Box>
      <Box 
        as="aside"
        w="200px"
        bg="gray.100"
        position="fixed"
        top="0"
        right="0"
        height="100vh"
      >
        <ActivityFeedComponent />
      </Box>
    </Flex>
  );
};
