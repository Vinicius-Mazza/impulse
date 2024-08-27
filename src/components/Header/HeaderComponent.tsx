import React, { useState } from 'react';
import {
  Flex,
  Heading,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

interface HeaderProps {
  onFilterChange: (tab: string) => void;
}

export const HeaderComponent: React.FC<HeaderProps> = ({ onFilterChange }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  // const textColor = useColorModeValue('gray.800', 'white');

  const [activeTab, setActiveTab] = useState('popular');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onFilterChange(tab);
  };

  return (
    <Flex
      as="header"
      bg={bgColor}
      boxShadow="sm"
      justifyContent="space-between"
      alignItems="center"
      padding="4"
    >
      <Heading as="h2" fontSize="2xl" fontWeight="bold">
        Feeds
      </Heading>
      <Flex>
        <Button
          variant="ghost"
          fontSize="sm"
          color={activeTab === 'recents' ? '#101010' : '#bababa'}
          _hover={{ color: '#101010' }}
          _active={{ backgroundColor: 'transparent' }}
          onClick={() => handleTabClick('recents')}
        >
          Recentes
        </Button>
        <Button
          variant="ghost"
          fontSize="sm"
          color={activeTab === 'friends' ? '#101010' : '#bababa'}
          _hover={{ color: '#101010' }}
          _active={{ backgroundColor: 'transparent' }}
          onClick={() => handleTabClick('friends')}
        >
          Amigos
        </Button>
        <Button
          variant="ghost"
          fontSize="sm"
          color={activeTab === 'popular' ? '#101010' : '#bababa'}
          _hover={{ color: '#101010' }}
          _active={{ backgroundColor: 'transparent' }}
          onClick={() => handleTabClick('popular')}
        >
          Popular
        </Button>
      </Flex>
    </Flex>
  );
};
