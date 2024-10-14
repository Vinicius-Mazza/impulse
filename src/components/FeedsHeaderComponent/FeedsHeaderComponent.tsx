import React, { useState } from 'react'
import { Flex, Heading, Box, For } from '@chakra-ui/react'
import { Button } from '../ui/button'
import { FilterType } from '../../utils/filters'


interface FeedsHeaderProps {
  onFilterChange: (tab: FilterType) => void
}

export const FeedsHeaderComponent: React.FC<FeedsHeaderProps> = ({ onFilterChange }) => {
  const [activeTab, setActiveTab] = useState<FilterType>(FilterType.All)

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={1}
      bg={{ base: "white", _dark: "black" }}
      justifyContent="space-between"
      alignItems="center"
      padding="1"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        padding="4"
      >
        <Heading as="h2" fontSize="2xl" fontWeight="extrabold">
          Feeds
        </Heading>
        <Flex>
          <For 
            each={[
              { tabValue: FilterType.All, tabName: "Todos" },
              { tabValue: FilterType.Recents, tabName: "Recentes" },
              { tabValue: FilterType.Friends, tabName: "Amigos" },
              { tabValue: FilterType.Popular, tabName: "Popular" }
            ]} 
          >
            {(item, index) => (
              <TabButton
                key={index}
                activeTab={activeTab}
                tabValue={item.tabValue}
                onFilterChange={onFilterChange}
                setActiveTab={setActiveTab}
              >
                {item.tabName}
              </TabButton>
            )}
          </For>
        </Flex>
      </Flex>
    </Box>
  )
}


interface TabButtonProps {
  activeTab: FilterType
  tabValue: FilterType
  setActiveTab: (tab: FilterType) => void
  onFilterChange: (tab: FilterType) => void
  children: React.ReactNode
}

const TabButton: React.FC<TabButtonProps> = ({
  activeTab,
  setActiveTab,
  tabValue,
  onFilterChange,
  children
}) => {
  const isActive = activeTab === tabValue
  const handleTabClick = (tab: FilterType) => {
    setActiveTab(tab)
    onFilterChange(tab)
  }

  return (
    <Button
      variant="plain"
      fontSize="sm"
      color={
        isActive
          ? { base: '#101010', _dark: 'white' }
          : { base: '#bababa', _dark: '#8f8f8f' }
      }
      _hover={{ color: { base: '#101010', _dark: 'white' } }}
      _active={{ backgroundColor: 'transparent' }}
      onClick={() => handleTabClick(tabValue)}
    >
      {children}
    </Button>
  )
}