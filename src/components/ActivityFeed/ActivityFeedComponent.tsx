import React from 'react';
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
} from '@chakra-ui/react';


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
        <StoriesComponent />
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