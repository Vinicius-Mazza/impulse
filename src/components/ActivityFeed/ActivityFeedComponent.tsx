import React, { useState } from 'react'
import { 
  RecommendationsComponent, 
  StoriesComponent, 
  SuggestionListComponent 
} from '.'
import { 
  Box, 
  Flex, 
  BoxProps, 
  Show, 
  useDisclosure, 
  Heading 
} from '@chakra-ui/react'
import { DrawerContent, DrawerRoot } from "../ui/drawer"
import { useFetchData } from '../../hooks'
import { Story } from '../../interfaces'
import {
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot
} from '../ui/pagination'

export const ActivityFeedComponent: React.FC = () => {
  const { open, onOpen, onClose } = useDisclosure()

  return (
    <Box 
      minH="100vh" 
      w={{ base: 'full', md: 60 }}
      pos="absolute"
      top="0"
      right="0"
      h="full"
    >
      <ActivityFeedContent 
        onClose={() => onClose} 
        display={{ base: 'none', md: 'block' }} 
      />
      <DrawerRoot open={open} placement={"end"} size={"full"}>
        <DrawerContent>
          <ActivityFeedContent onClose={onClose} />
        </DrawerContent>
      </DrawerRoot>
    </Box>
  );
};

interface ActivityFeedProps extends BoxProps {
  onClose: () => void
}

const ActivityFeedContent = ({ onClose, ...rest }: ActivityFeedProps) => {
    const urlApiStories = 'http://localhost:3001/stories'
    const { data: stories } = useFetchData<Story[]>(urlApiStories)
    const [page, setPage] = useState(1)
    const pageSize = 2
    const count = (stories || []).length
    const startRange = (page - 1) * pageSize
    const endRange = startRange + pageSize
    const visibleItems = (stories || []).slice(startRange, endRange)

  return (
    <Box
      w={{ base: 'full', md: 60 }}
      pr="200px"
      pos="absolute"
      top="0"
      right="0"
      h="full"
      minH="calc(100vh - 20px)"
      {...rest}
    >
      <Flex justifyContent="center" ml={-40} mt={12}>
        <Heading 
          as="h2" 
          fontSize="2xl" 
          fontWeight="bold" 
          mb={5}
        >
          Stories
        </Heading>
      </Flex>
      <Flex h="50" alignItems="center" justifyContent="center" mx="1">
        <PaginationRoot
          page={page}
          count={count}
          pageSize={pageSize}
          size="sm"
          onPageChange={(e) => setPage(e.page)}
        >
        <Flex>
          <Flex gap={1.5}>
            <Show when={page > 1} >
              <PaginationPrevTrigger 
                marginLeft="62px" 
                mt={28} 
                borderRadius="20px" 
                _hover={{ backgroundColor: 'transparent' }} 
              />
            </Show>
            <Show when={page === 1}>
              <Box marginLeft="94px"></Box>
            </Show>
            <Flex gap='3rem'>
              {visibleItems.map((story, index) => (
                <StoriesComponent key={index} {...story} />
              ))}
            </Flex>
            <Show when={page < Math.ceil(count / pageSize)}>
              <PaginationNextTrigger 
                marginLeft="40px" 
                mt={28} 
                borderRadius="20px" 
                _hover={{ backgroundColor: 'transparent' }} 
              />
            </Show>
            <Show when={page === Math.ceil(count / pageSize)}>
              <Box marginLeft="73px"></Box>
            </Show>
            <Show 
              when={
                page === Math.ceil(count / pageSize) && 
                visibleItems.length === 1
              }
            >
              <Box marginLeft="150px"></Box>
            </Show>
          </Flex>
        </Flex>
        </PaginationRoot>
      </Flex>

      <Flex 
        h="10" 
        alignItems="center" 
        justifyContent="right" 
        mx="5" 
        mb={10} 
        mt={10}
      >
        <SuggestionListComponent />
      </Flex>

      <Flex h="20" alignItems="center" justifyContent="center" mx="1">
        <RecommendationsComponent />
      </Flex>
    </Box>
  )
}