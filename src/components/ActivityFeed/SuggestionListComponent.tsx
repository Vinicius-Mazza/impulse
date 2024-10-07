import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'

export const SuggestionListComponent: React.FC = () => {
  return (
    <Flex direction="column">
      <Heading as="h2" fontSize="2xl" fontWeight="bold">Sugestões</Heading>
    </Flex>
  )
}
