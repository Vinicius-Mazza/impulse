import React, { useState } from 'react'
import { Flex, Box, Image, Heading, HStack } from '@chakra-ui/react'
import { Avatar } from '../ui/avatar'
import { Button } from "../ui/button"
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog"
import { Story } from '../../interfaces'


export const StoriesComponent: React.FC<Story> = ({ id, user, date, stories }) => {
  return (
    <Flex direction="column">
      <Heading as="h2" fontSize="2xl" fontWeight="bold" mb={5}>Stories</Heading>
      <HStack mr={-10} gap='0.8rem'>
        <StoriesContent id={id} user={user} date={date} stories={stories}/>
        <StoriesContent id={id} user={user} date={date} stories={stories}/>
      </HStack>
    </Flex>
  )
}


const StoriesContent: React.FC<Story> = ({ id, user, date, stories }) => {
  const [storyData, setStoryData] = useState({ id, user, date, stories })
  
  return (
    <Box w="150px" h="260px">
      <DialogStories storyData={storyData} />
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
        <Button bg="white" justifyContent="left" borderRadius="full" height="30px" width="143px">          
          <HStack ml={-4}>
            <Avatar size='sm' src={user.avatar} />
            <Heading as='h6' size='xs' color={"black"}>{user.firstname} {user.lastname}</Heading>
          </HStack>
        </Button>
      </Box>
    </Box>
  )
}

interface DialogStoriesProps {
  storyData: Story
}

const DialogStories = ({ storyData }: DialogStoriesProps) => {
  const userFullName = `${storyData.user.firstname} ${storyData.user.lastname}`
  const userAvatar = storyData.user.avatar
  const stories = storyData.stories[0].content
  
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Image
          src={stories}
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
              <Avatar src={userAvatar} size='sm' />
              <Heading as='h6' size='xs'>{userFullName}</Heading>
            </HStack>
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Image
            src={stories}
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