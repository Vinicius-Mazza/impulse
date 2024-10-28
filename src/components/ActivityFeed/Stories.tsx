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
import { Story } from '../../interfaces'


export const Stories: React.FC<Story> = ({ id, user, date, stories }) => {
  return (    
    <HStack mr={-10}>
      <StoriesContent id={id} user={user} date={date} stories={stories}/>
    </HStack>
  )
}

const StoriesContent: React.FC<Story> = ({ id, user, date, stories }) => {
  const userFullName = `${user.firstname} ${user.lastname}`

  return (
    <Box w="150px" h="260px">
      <DialogStories id={id} user={user} date={date} stories={stories} />
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
            <Avatar size='sm' name={userFullName} src={user.avatar} />
            <Heading fontWeight='bold' as='h6' size='xs' color={"black"}>
              {userFullName}
            </Heading>
          </HStack>
        </Button>
      </Box>
    </Box>
  )
}

const DialogStories: React.FC<Story> = ({ id, user, date, stories }) => {
  const userFullName = `${user.firstname} ${user.lastname}`
  const userAvatar = user.avatar
  
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Image
          src={stories[0].content}
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
            src={stories[0].content}
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