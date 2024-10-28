import React, { useState } from 'react'
import { Flex, Box, HStack, Stack } from '@chakra-ui/react'
import { 
  FeedsHeaderSection, 
  UserPost, 
  Notification, 
  ActivityFeed
} from '../../components'
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText
} from "../../components/ui/skeleton"
import { filterPosts, FilterType } from '../../utils/filters'
import { Post } from '../../interfaces'
import { useFetchData } from '../../hooks'


export const Feeds: React.FC = () => {
  const urlApiPosts = 'http://localhost:3001/posts'
  const { data: posts, isLoading, error } = useFetchData<Post[]>(urlApiPosts)
  const [filter, setFilter] = useState<FilterType>(FilterType.All)
  const handleFilterChange = (tab: FilterType) => setFilter(tab)
  const filteredPosts = posts ? filterPosts(posts, filter) : []

  return (
    <Flex>
      <Box flex={0.7} pr="340" mt={6}>
        <FeedsHeaderSection onFilterChange={handleFilterChange} />
        {isLoading ? (
          <FeedSkeleton />
        ) : error ? (
          <>
            <FeedSkeleton />
            <Notification 
              title="Erro ao carregar dados" 
              description="Ocorreu um erro inesperado." 
              type="error" 
            />
          </>
        ) : (
          <div>
            {filteredPosts.map((post) => (
              <UserPost key={post.id} {...post} />
            ))}
          </div>
        )}
      </Box>
      <Box 
        as="aside"
        w="380px"
        position="fixed"
        top="0"
        right="0"
        height="100vh"
      >
        <ActivityFeed />
      </Box>
    </Flex>
  )
}

const FeedSkeleton : React.FC = () => {
  return (
    <Stack gap="6" maxW="xs">
      <HStack width="full">
        <SkeletonCircle size="10" />
        <SkeletonText noOfLines={2} />
      </HStack>
      <Skeleton width="869px" height="200px" />
    </Stack>
  )
}