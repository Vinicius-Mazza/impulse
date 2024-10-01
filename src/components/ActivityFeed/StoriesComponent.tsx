import React, { useState } from 'react'
import { 
  Flex, 
  Box,
  Button, 
  Image, 
  Heading, 
  AvatarGroup,
  Avatar, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  useDisclosure
} from '@chakra-ui/react'
import { Story } from '../../interfaces'


export const StoriesComponent: React.FC<Story> = ({ id, user, date, stories }) => {
  return (
    <Flex direction="column">
      <Heading as="h3" size="md" mb={5}>Stories</Heading>
      <Flex mr={-20} gap='0.8rem'>      
        <StoriesContent id={id} user={user} date={date} stories={stories}/>
        <StoriesContent id={id} user={user} date={date} stories={stories}/>
      </Flex>
    </Flex>
  )
}


const StoriesContent: React.FC<Story> = ({ id, user, date, stories }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [storyData, setStoryData] = useState({ id, user, date, stories })
  
  return (
    <Box w="150px" h="260px">
      <Image
        src={stories[0].content}
        alt='story'
        borderRadius='2xl'
        objectFit="cover"
        w="100%"
        h="100%"
        onClick={onOpen}
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
        <Button colorScheme="white" justifyContent="left" borderRadius="full" height="30px" width="143px">
          <AvatarGroup spacing='0.1rem' ml={-4}>
            <Avatar size='xs' src={user.avatar} />
            <Heading as='h6' size='xs' color={"black"}>{user.firstname} {user.lastname}</Heading>
          </AvatarGroup>
        </Button>
      </Box>
      <StoriesModal isOpen={isOpen} onClose={onClose} storyData={storyData} />
    </Box>
  )
}

interface ModalStoriesProps {
  onClose: () => void
  isOpen: boolean
  storyData: Story
}

const StoriesModal = ({ onClose, isOpen, ...rest }: ModalStoriesProps) => {
  const { storyData } = rest
  const userFullName = `${storyData.user.firstname} ${storyData.user.lastname}`
  const userAvatar = storyData.user.avatar
  const stories = storyData.stories[0].content
  
  return (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        <AvatarGroup spacing='0.1rem' ml={-4}>
          <Avatar src={userAvatar} size='xs' />
          <Heading as='h6' size='xs' color={"black"}>{userFullName}</Heading>
        </AvatarGroup>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Image
          src={stories}
          alt='story'
          borderRadius='2xl'
          objectFit="cover"
          w="100%"
          h="100%"
        />
      </ModalBody>
    </ModalContent>
  </Modal>
  )
}