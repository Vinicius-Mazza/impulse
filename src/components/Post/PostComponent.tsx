import React from 'react';
// import { Avatar, Box, Flex, Text, Button, Image } from '@chakra-ui/react';
import { Avatar, Box, Flex, Text, Button } from '@chakra-ui/react';
import { Post as PostType } from '../../interfaces';


export const PostComponent: React.FC<PostType> = ({ user, content, date, likes, comments }) => {
  return (
    <Box borderWidth='1px' borderRadius='lg' overflow='hidden'>

      <Box p='4'>
        <Flex align='center' mb='4'>
          <Avatar size='sm' src={user.avatar} />
          <Box ml='2'>
            <Text fontWeight='bold'>{user.name}</Text>
            <Text fontSize='sm' color='gray.500'>
              {new String(date.toLocaleDateString('pt-BR'))}
            </Text>
          </Box>
        </Flex>
        <Text>{content}</Text>
        {/* ... (imagens, emojis, etc.) */}
        <Button variant='ghost' colorScheme='teal' size='sm'>
          Like {likes}
        </Button>
        <Button variant='ghost' colorScheme='teal' size='sm'>
          Comment
        </Button>
      </Box>
    </Box>
  );
};
