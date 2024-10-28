import React, { useState } from 'react'
import { 
  // Recommendations, 
  Stories, 
  SuggestionList 
} from '.'
import { 
  Box, 
  Flex, 
  BoxProps, 
  Show, 
  useDisclosure, 
  Heading 
} from '@chakra-ui/react'
import { DrawerContent, DrawerRoot } from '../ui/drawer'
import { useFetchData } from '../../hooks'
import { Story, User } from '../../interfaces'
import {
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot
} from '../ui/pagination'
import { Button } from '../ui/button'


export const ActivityFeed: React.FC = () => {
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
  )
}

interface ActivityFeedProps extends BoxProps {
  onClose: () => void
}

const ActivityFeedContent = ({ onClose, ...rest }: ActivityFeedProps) => {
  const urlApiUsers = 'http://localhost:3001/users'
  const { data: users } = useFetchData<User[]>(urlApiUsers)
  const urlApiStories = 'http://localhost:3001/stories'
  const { data: stories } = useFetchData<Story[]>(urlApiStories)
  const [page, setPage] = useState(1)
  const pageSize = 2
  const count = (stories || []).length
  const startRange = (page - 1) * pageSize
  const endRange = startRange + pageSize
  const visibleItems = (stories || []).slice(startRange, endRange)

  function shuffleArray<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5)
  }

  const userSuggestion = users && users.length >= 3
    ? shuffleArray(users).slice(0, 3)
    : []

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
          fontWeight="extrabold" 
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
                color={{ base: '#bababa', _dark: '#8f8f8f' }}
                _hover={{ 
                    backgroundColor: 'transparent', 
                    color: { base: '#101010', _dark: 'white' } 
                  }} 
              />
            </Show>
            <Show when={page === 1}>
              <Box marginLeft="94px"></Box>
            </Show>
            <Flex gap='3rem'>
              {visibleItems.map((story, index) => (
                <Stories key={index} {...story} />
              ))}
            </Flex>
            <Show when={page < Math.ceil(count / pageSize)}>
              <PaginationNextTrigger 
                marginLeft="40px" 
                mt={28} 
                color={{ base: '#bababa', _dark: '#8f8f8f' }}
                _hover={{ 
                  backgroundColor: 'transparent', 
                  color: { base: '#101010', _dark: 'white' } 
                }}
              />
            </Show>
            <Show when={page === Math.ceil(count / pageSize)}>
              <Box marginLeft="72px"></Box>
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
        w='30px' 
        alignItems="flex-start" 
        justifyContent="space-between" 
        ml='-102px' 
        mt='20px'
      >
        <Flex direction="column">
          <Heading as="h2" fontSize="2xl" fontWeight='extrabold' mb={5} mr={20}>
            Sugestões
          </Heading>
          {userSuggestion.map((user, index) => (
            <SuggestionList key={index} {...user} />
          ))}
          <Button              
            width='20%'
            height='50%'
            variant="plain"
            fontSize="sm"
            color={ 
              { base: '#bababa', _dark: '#8f8f8f' }
            }
            _hover={{ color: { base: '#101010', _dark: 'white' } }}
          >
            Ver todos
          </Button>
        </Flex>
      </Flex>
      {/* <Flex h="20" alignItems="center" justifyContent="center" mx="1">
        <Recommendations />
      </Flex> */}
    </Box>
  )
}