import React, { useState, useRef } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Show,
  Heading,
  HStack,
  Link,
  IconButton,
  FormatNumber,
  Spacer,
} from "@chakra-ui/react";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { Post as PostType, FullContent } from "@/interfaces";
import {
  HoverCardUser,
  CommentsSection,
  TextFormatter,
  ImageFormatter,
} from "@/components";
import { formatRelativeDate } from "@/utils/dateHelpers";
import { LiaComment } from "react-icons/lia";
import { SlOptionsVertical } from "react-icons/sl";
import {
  IoHeart,
  IoHeartOutline,
  IoShareSocial,
  IoFlag,
} from "react-icons/io5";
import { FaUserLargeSlash } from "react-icons/fa6";
import { MdOutlineSaveAlt } from "react-icons/md";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

export const UserPost: React.FC<PostType> = (post) => {
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  const toggleLocalCommentsVisibility = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };
  const userFullName = `${post.user.firstname} ${post.user.lastname}`;
  const dateObject = new Date(post.date);

  return (
    <Box overflow="hidden" mb={5}>
      {/* <Box width="809px" overflow="hidden" mb={5}> */}
      <Box p="4">
        <Flex align="center" mb="4" gap={3.5}>
          <Avatar size="lg" name={userFullName} src={post.user.avatar} />
          <Box>
            <HoverCardUser user={post.user} />
            <Text fontSize="xs" color="gray.500" fontWeight="bold">
              Postado {formatRelativeDate(dateObject.toISOString())}
            </Text>
          </Box>
          <Spacer />
          <PostOptions />
        </Flex>
        {/* ... (imagens, emojis, etc.) */}
        <PostContent content={post.content} />
        <HStack mt={2} gap="5">
          <HStack gap="-1">
            <IconButton variant="plain" color="pink.600" size="xs">
              <IoHeartOutline />
            </IconButton>
            <HStack>
              <Text>Like</Text>
              <Show when={post.likes !== 0}>
                <Text>
                  <FormatNumber
                    value={post.likes}
                    notation="compact"
                    compactDisplay="short"
                  />
                </Text>
              </Show>
            </HStack>
          </HStack>
          <HStack>
            <Link variant="plain" onClick={toggleLocalCommentsVisibility}>
              <LiaComment />
              <Text>Comentários</Text>
            </Link>
            <Show when={post.comments.length !== 0}>
              <Text>
                <FormatNumber
                  value={post.comments.length}
                  notation="compact"
                  compactDisplay="short"
                />
              </Text>
            </Show>
          </HStack>
          <Link variant="plain">
            <IoShareSocial />
            <Text>Compartilhar</Text>
          </Link>
        </HStack>
        {isCommentsVisible && (
          <Box>
            {/* Seção de comentários */}
            <CommentsSection {...post.comments} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

const PostOptions: React.FC = () => {
  return (
    <MenuRoot positioning={{ placement: "left-start" }}>
      <MenuTrigger asChild>
        <IconButton aria-label="Post menu" variant="outline" rounded="full">
          <SlOptionsVertical />
        </IconButton>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="save">
          <MdOutlineSaveAlt />
          Salvar postagem
        </MenuItem>
        <MenuItem value="block">
          <FaUserLargeSlash />
          Bloquear usuário
        </MenuItem>
        <MenuItem
          value="delete"
          color="fg.error"
          _hover={{ bg: "bg.error", color: "fg.error" }}
        >
          <IoFlag />
          Denunciar Postagem
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

const PostContent: React.FC<{ content: FullContent }> = ({ content }) => {
  const visibleImagesCount = 5;

  return (
    <Box>
      {content.map((item, index) => (
        <Flex key={index}>
          {item.text && <TextFormatter text={item.text} />}
          {item.image && (
            <Flex wrap="wrap" justifyContent="start" gap={1.5}>
              {Array.isArray(item.image) ? (
                item.image
                  .slice(0, visibleImagesCount)
                  .map((img, imgIndex) => (
                    <ImageFormatter
                      key={imgIndex}
                      src={img.url}
                      widthCalc={790}
                      heightCalc={268}
                    />
                  ))
              ) : (
                <ImageFormatter
                  src={item.image}
                  widthCalc={790}
                  heightCalc={268}
                />
              )}
              <Show when={item.image.length > visibleImagesCount}>
                <ShowAllImages
                  hiddenImagesCount={item.image.length - visibleImagesCount}
                />
              </Show>
            </Flex>
          )}
          {item.video && <MediaContentVideo src={item.video.url} />}
        </Flex>
      ))}
    </Box>
  );
};

const ShowAllImages: React.FC<{ hiddenImagesCount: number }> = ({
  hiddenImagesCount,
}) => {
  return (
    <Box
      width="170px"
      height="268px"
      bg="rgba(186, 186, 186, 0.5)"
      borderRadius="2xl"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Button
        as="div"
        bg="rgba(255, 255, 255, 0.7)"
        borderRadius="full"
        width="100px"
        height="100px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Heading size="4xl" fontWeight="bold" color="#101010">
          +{hiddenImagesCount}
        </Heading>
      </Button>
    </Box>
  );
};

const MediaContentVideo: React.FC<{ src: string }> = ({ src }) => {
  return (
    <MediaPlayer aspectRatio="21/9" title="Impulse" src={src}>
      <MediaProvider />
      <DefaultVideoLayout icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
};
