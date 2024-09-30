import React from 'react';
import { Feeds } from './pages'
import { SidebarComponent } from './components'
import { Box, Flex } from '@chakra-ui/react';
import { useFetchData } from './hooks';
import { User } from './interfaces';

function App() {
  const urlApiUser = 'http://localhost:3001/users'
  const { data: users } = useFetchData<User[]>(urlApiUser, undefined, 'id=1');
  const user = users?.[0];

  return (
    <Flex>
      <Box as="aside" w="200px">
        { user && <SidebarComponent {...user}/> }
      </Box>
      <Box flex="1" paddingLeft="10">
        <Feeds />
      </Box>
    </Flex>
  );
}

export default App;