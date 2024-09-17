import React, { useState } from 'react'
import {
  Box,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Avatar,
  Heading,
} from '@chakra-ui/react'
// import { FiMenu } from 'react-icons/fi'
import { FaUserGroup, FaCompass } from "react-icons/fa6";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { FaImage } from "react-icons/fa";
import { IoSettings, IoMail } from "react-icons/io5";

import { IconType } from 'react-icons'
import { User as UserType } from '../../interfaces';

interface LinkItemProps {
  name: string
  icon: IconType
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'News Feed', icon: FaCompass },
  { name: 'Messages', icon: IoMail },
  { name: 'Forums', icon: HiChatBubbleLeftRight },
  { name: 'Friends', icon: FaUserGroup },
  { name: 'Media', icon: FaImage },
  { name: 'Settings', icon: IoSettings },
]


export const SidebarComponent: React.FC<UserType> = ({ id, firstname, lastname, username, avatar }: UserType) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [userData, setUserData] = useState({ id, firstname, lastname, username, avatar });
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} userData={userData} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} userData={userData} />
        </DrawerContent>
      </Drawer>

      {/* mobilenav
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        Content
      </Box> */}

    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
  userData: UserType;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { userData, ...otherProps } = rest
  const { firstname, lastname, avatar, username } = userData
  const fullName = `${firstname} ${lastname}`

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      minH="calc(100vh - 20px)" 
      {...otherProps}>
      
      <Flex h="20" alignItems="center" justifyContent="center" mx="8" mb={14} mt={70}>
        <Flex direction="column" alignItems="center">
          <Avatar size='xl' name={fullName} src={avatar} mb={5} />
          <Heading as="h3" size="md">{fullName}</Heading>
          <Text fontSize="sm" color="gray.500">{username}</Text>
        </Flex>
      </Flex>
      
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  children: string | number
}

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="3"
        mx="4"
        borderRadius="lg"
        mb={3}

        role="group"
        cursor="pointer" 

        _hover={{ // Update hover styles here
          bg: '#101010', // Change hover background color to #101010
          color: 'white', // Change hover text color to white
          borderRadius: '20px',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{ // Update hover styles for icon
              color: 'white', // Change hover color to white
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
}

// interface MobileProps extends FlexProps {
//   onOpen: () => void
// }

// const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
//   return (
//     <Flex
//       ml={{ base: 0, md: 60 }}
//       px={{ base: 4, md: 24 }}
//       height="20"
//       alignItems="center"
//       bg={useColorModeValue('white', 'gray.900')}
//       borderBottomWidth="1px"
//       borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
//       justifyContent="flex-start"
//       {...rest}>
//       <IconButton
//         variant="outline"
//         onClick={onOpen}
//         aria-label="open menu"
//         icon={<FiMenu />}
//       />

//       <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
//         Logo
//       </Text>
//     </Flex>
//   )
// }