import React from 'react'
import { Box, Image, Heading, HStack } from '@chakra-ui/react'
import { Avatar } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import { Story as StoryType } from '../../interfaces'


export const Story: React.FC<StoryType> = (storyData) => {
  return (    
    <HStack mr={-10}>
      <StoriesContent 
        id={storyData.id} 
        user={storyData.user} 
        date={storyData.date} 
        stories={storyData.stories}
      />
    </HStack>
  )
}

const StoriesContent: React.FC<StoryType> = (storyData) => {
  const userFullName = `${storyData.user.firstname} ${storyData.user.lastname}`

  return (
    <Box w="150px" h="260px">
      <DialogStories 
        id={storyData.id} 
        user={storyData.user} 
        date={storyData.date} 
        stories={storyData.stories} 
      />
      <Box
        position="absolute"
        mt={-8}
        ml={1}
        width="143px"
        height="30px"
        backgroundColor="rgba(255, 255, 255)"
        borderRadius="full"
        display="flex"
        justifyContent="left"
        alignItems="left"
        zIndex={1}
      >
        <Button 
          bg="white" 
          justifyContent="left" 
          borderRadius="full" 
          height="30px" 
          width="143px"
        >          
          <HStack ml={-4}>
            <Avatar size='sm' name={userFullName} src={storyData.user.avatar} />
            <Heading fontWeight='bold' as='h6' size='xs' color={"black"}>
              {userFullName}
            </Heading>
          </HStack>
        </Button>
      </Box>
    </Box>
  )
}

const DialogStories: React.FC<StoryType> = (storyData) => {
  const userFullName = `${storyData.user.firstname} ${storyData.user.lastname}`
  const userAvatar = storyData.user.avatar
  
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Image
          src={storyData.stories[0].content}
          alt='story'
          borderRadius='2xl'
          objectFit="cover"
          w="100%"
          h="100%"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <HStack>
              <Avatar name={userFullName} src={userAvatar} size='sm' />
              <Heading as='h6' size='xs'>{userFullName}</Heading>
            </HStack>
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Image
            src={storyData.stories[0].content}
            alt='story'
            borderRadius='2xl'
            objectFit="cover"
            w="100%"
            h="100%"
          />
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}