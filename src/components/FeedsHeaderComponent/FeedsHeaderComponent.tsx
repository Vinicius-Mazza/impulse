import React, { useState } from 'react';
import {
  Flex,
  Heading,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { FilterType } from '../../utils/filters'

interface FeedsHeaderProps {
  onFilterChange: (tab: FilterType) => void;
}

export const FeedsHeaderComponent: React.FC<FeedsHeaderProps> = ({ onFilterChange }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  // const textColor = useColorModeValue('gray.800', 'white');

  const [activeTab, setActiveTab] = useState<FilterType>(FilterType.Popular);

  const handleTabClick = (tab: FilterType) => {
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
          onClick={() => handleTabClick(FilterType.Recents)}
        >
          Recentes
        </Button>
        <Button
          variant="ghost"
          fontSize="sm"
          color={activeTab === 'friends' ? '#101010' : '#bababa'}
          _hover={{ color: '#101010' }}
          _active={{ backgroundColor: 'transparent' }}
          onClick={() => handleTabClick(FilterType.Friends)}
        >
          Amigos
        </Button>
        <Button
          variant="ghost"
          fontSize="sm"
          color={activeTab === 'popular' ? '#101010' : '#bababa'}
          _hover={{ color: '#101010' }}
          _active={{ backgroundColor: 'transparent' }}
          onClick={() => handleTabClick(FilterType.Popular)}
        >
          Popular
        </Button>
      </Flex>
    </Flex>
  );
};
