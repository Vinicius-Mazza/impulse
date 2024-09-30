import React from 'react';
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
} from '@chakra-ui/react';


export const StoriesComponent: React.FC = () => {
  return (
    <Flex direction="column">
      <Heading as="h3" size="md" mb={5}>Stories</Heading>
      <Flex mr={-20} gap='0.8rem'>      
        <StoriesContent />
        <StoriesContent />
      </Flex>
    </Flex>
  )
}


export const StoriesContent: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box w="150px" h="260px">
      <Image
        src='http://localhost:3001/assets/images/storie01.jpg'
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
            <Avatar size='xs' />
            <Heading as='h6' size='xs' color={"black"}>Teste Abcd</Heading>
          </AvatarGroup>
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <AvatarGroup spacing='0.1rem' ml={-4}>
              <Avatar size='xs' />
              <Heading as='h6' size='xs' color={"black"}>Teste Abcd</Heading>
            </AvatarGroup>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              src='http://localhost:3001/assets/images/storie01.jpg'
              alt='story'
              borderRadius='2xl'
              objectFit="cover"
              w="100%"
              h="100%"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}