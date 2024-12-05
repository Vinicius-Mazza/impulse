import React, { useState } from "react";
import {
  Box,
  Flex,
  Icon,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Heading,
  HStack,
  Spacer,
} from "@chakra-ui/react";
// import { FiMenu } from 'react-icons/fi'
import { FaUserGroup, FaCompass } from "react-icons/fa6";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { FaImage } from "react-icons/fa";
import { IoSettings, IoMail } from "react-icons/io5";
import { User as UserType } from "@/interfaces";
import { DrawerContent, DrawerRoot } from "@/components/ui/drawer";
import { Avatar } from "@/components/ui/avatar";

interface LinkItemProps {
  name: string;
  icon: React.ReactNode;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Feeds", icon: <FaCompass /> },
  { name: "Mensagens", icon: <IoMail /> },
  { name: "Fóruns", icon: <HiChatBubbleLeftRight /> },
  { name: "Amigos", icon: <FaUserGroup /> },
  { name: "Galeria", icon: <FaImage /> },
  { name: "Configurações", icon: <IoSettings /> },
];

export const Sidebar: React.FC<UserType> = ({
  id,
  firstname,
  lastname,
  username,
  avatar,
}: UserType) => {
  const { open, onOpen, onClose } = useDisclosure();
  const [userData, setUserData] = useState({
    id,
    firstname,
    lastname,
    username,
    avatar,
  });

  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        userData={userData}
      />
      <DrawerRoot open={open} placement="end" size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} userData={userData} />
        </DrawerContent>
      </DrawerRoot>

      {/* mobilenav
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        Content
      </Box> */}
    </Box>
  );
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
  userData: UserType;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { userData, ...otherProps } = rest;
  const { firstname, lastname, avatar, username } = userData;
  const fullName = `${firstname} ${lastname}`;

  return (
    <Box
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      minH="calc(100vh - 20px)"
      {...otherProps}
    >
      <Flex
        h="20"
        alignItems="center"
        justifyContent="center"
        mx="8"
        mb={10}
        mt={20}
      >
        <Flex direction="column" alignItems="center">
          <Avatar size="2xl" name={fullName} src={avatar} mb={1} />
          <Heading as="h3" fontWeight="bold" size="md">
            {fullName}
          </Heading>
          <Text fontSize="sm" color="gray.500">
            @{username}
          </Text>
        </Flex>
      </Flex>

      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: React.ReactNode;
  children: string | number;
}

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="3"
        mx="4"
        borderRadius="15px"
        mb={3}
        role="group"
        cursor="pointer"
        _hover={{
          bg: { base: "black", _dark: "white" },
          color: { base: "white", _dark: "black" },
          borderRadius: "15px",
        }}
        {...rest}
      >
        <HStack>
          <Icon
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
          >
            {icon}
          </Icon>
          <Spacer />
          {children}
        </HStack>
      </Flex>
    </Box>
  );
};

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
