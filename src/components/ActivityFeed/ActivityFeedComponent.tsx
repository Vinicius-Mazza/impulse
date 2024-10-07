import React from 'react'
import { 
  RecommendationsComponent, 
  StoriesComponent, 
  SuggestionListComponent 
} from '.'
import { Box, Flex, BoxProps, useDisclosure } from '@chakra-ui/react'

import { DrawerContent, DrawerRoot } from "../ui/drawer"
import { useFetchData } from '../../hooks'
import { Story, User } from '../../interfaces'


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
      <ActivityFeedContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <DrawerRoot open={open} placement={"end"} size={"full"} >
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
    //test
    const user: User = {
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      username: 'johndoe',
      avatar: 'https://randomuser.me/api/portraits/men/76.jpg'
    }

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
      <Flex h="20" alignItems="center" justifyContent="center" mx="1" mb={14} mt={170}>
        <StoriesComponent id={1} user={user} date={new Date('2024-10-01')} stories={[{"content": "http://localhost:3001/assets/images/storie01.jpg"}]} />
      </Flex>
      <Flex h="20" alignItems="center" justifyContent="right" mx="5" mb={14} mt={60}>
        <SuggestionListComponent />
      </Flex>
      <Flex h="20" alignItems="center" justifyContent="center" mx="1" mb={14} mt={0}>
        <RecommendationsComponent />
      </Flex>
    </Box>
  );
};