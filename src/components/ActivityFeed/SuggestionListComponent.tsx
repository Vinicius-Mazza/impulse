import React from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { Avatar } from '../ui/avatar'
import { Button } from '../ui/button'
import { User } from '../../interfaces'


export const SuggestionListComponent: React.FC<User> = ({ id, firstname, lastname, username, avatar }) => {
  const userFullName = `${firstname} ${lastname}`
  
  return (
    <Flex align='center' justifyContent='space-between'>
      <Box mr='120px'>
        <Flex align='center' mb='3'>
          <Avatar size='lg' name={userFullName} src={avatar} />
          <Box marginLeft="8px">
            <Heading 
              minWidth='72.1px' 
              maxWidth='72.1px' 
              fontWeight='bold' 
              size='md'
            >
              {firstname}<br />{lastname}
            </Heading>
          </Box>
        </Flex>
      </Box>
      <Button size='xs' borderRadius='30px'>Adicionar</Button>
    </Flex>
  )
}
