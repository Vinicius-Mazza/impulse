import React from 'react'
import { 
  RecommendationsComponent, 
  StoriesComponent, 
  SuggestionListComponent 
} from '.'
import {
  Box,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  BoxProps,
  useDisclosure
} from '@chakra-ui/react'
import { useFetchData } from '../../hooks'
import { Story, User } from '../../interfaces'


export const ActivityFeedComponent: React.FC = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box 
      minH="100vh" 
      bg={bgColor} 
      w={{ base: 'full', md: 60 }}
      pos="absolute"
      top="0"
      right="0"
      h="full"
    >
      <ActivityFeedContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <ActivityFeedContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

interface ActivityFeedProps extends BoxProps {
  onClose: () => void;
}

const ActivityFeedContent = ({ onClose, ...rest }: ActivityFeedProps) => {
    //test
    const user: User = {
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      username: 'johndoe',
      avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
    };

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      w={{ base: 'full', md: 60 }}
      pr="200"
      pos="absolute"
      top="0"
      right="0"
      h="full"
      minH="calc(100vh - 20px)"
      {...rest}
    >
      <Flex h="20" alignItems="center" justifyContent="center" mx="8" mb={14} mt={170}>
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