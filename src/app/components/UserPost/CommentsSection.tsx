import React, { useState, useRef } from "react";
import {
  Flex,
  Box,
  Text,
  Input,
  IconButton,
  HStack,
  Stack,
  Show,
  FormatNumber,
  Link,
  Spacer,
} from "@chakra-ui/react";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { HoverCardUser, TextFormatter, ImageFormatter } from "@/components";
import { Comment as CommentType, FullContentComment, User } from "@/interfaces";
import { InputGroup } from "@/components/ui/input-group";
// import { Button } from "@/components/ui/button";
import { formatRelativeDate } from "@/utils/dateHelpers";
import { Avatar } from "@/components/ui/avatar";
import { useFetchData } from "@/hooks";
import { FaSmile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { IoMdShareAlt } from "react-icons/io";
import { IoHeart, IoHeartOutline, IoFlag } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";
import { RiImageAddLine } from "react-icons/ri";

export const CommentsSection: React.FC<CommentType[]> = (comments) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const buildApiUrl = (route: string) => `${apiUrl}/${route}`;
  const commentsArray = Object.values(comments);

  const urlApiUser = buildApiUrl("users");
  const { data: users } = useFetchData<User[]>(urlApiUser, undefined, "id=1");
  const userAvatar = users?.[0].avatar;
  const userFullName = `${users?.[0].firstname} ${users?.[0].lastname}`;

  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyValue, setReplyValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleReplyClick = (username: string) => {
    setReplyTo(username);
    setReplyValue(`@${username} `);
    inputRef.current?.focus();
  };

  return (
    <Flex
      padding="4"
      borderRadius="xl"
      direction="column"
      bg={{ base: "#f3f1f1", _dark: "#18181b" }}
    >
      {commentsArray.map((comment) => (
        <Comment
          key={comment.id}
          {...comment}
          onReplyClick={() => handleReplyClick(comment.user.username)}
        />
      ))}
      {/* <HStack> */}
      <InputGroup
        startElement={
          <Avatar size="xs" right="10px" name={userFullName} src={userAvatar} />
        }
        endElement={
          <HStack>
            <IconButton
              left="29px"
              rounded="full"
              size="lg"
              variant="plain"
              // onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <FaSmile />
            </IconButton>
            <IconButton left="13px" rounded="full" size="lg" variant="plain">
              {/* <IoSend /> */}
              <RiImageAddLine />
            </IconButton>
          </HStack>
        }
      >
        <Input
          // width="680px"
          ps="2.75em"
          borderRadius="full"
          ref={inputRef}
          value={replyValue}
          placeholder={
            replyTo ? `Respondendo a @${replyTo}` : "Digite sua resposta..."
          }
          onChange={(e) => setReplyValue(e.target.value)}
        />
        {/* <StyledInput
          ps="2.75em"
          borderRadius="full"
          ref={inputRef}
          value={replyValue}
          placeholder={
            replyTo ? `Respondendo a @${replyTo}` : "Digite sua resposta..."
          }
          onChange={(e) => setReplyValue(e.target.value)}
        /> */}
      </InputGroup>
      {/* <Button
          borderRadius="full"
          backgroundColor={{ base: "#000", _dark: "#f3f1f1" }}
          color={{ base: "#fff", _dark: "#000" }}
          width="12%"
        >
          Enviar
        </Button> */}
      {/* </HStack> */}
    </Flex>
  );
};

const CommentOptions: React.FC = () => {
  return (
    <MenuRoot positioning={{ placement: "left-start" }}>
      <MenuTrigger asChild>
        <IconButton
          size="xs"
          aria-label="Post menu"
          variant="outline"
          rounded="full"
        >
          <SlOptionsVertical />
        </IconButton>
      </MenuTrigger>
      <MenuContent>
        <MenuItem
          value="delete"
          color="fg.error"
          _hover={{ bg: "bg.error", color: "fg.error" }}
        >
          <IoFlag />
          Denunciar Comentário
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

const Comment: React.FC<CommentType & { onReplyClick: () => void }> = (
  comment
) => {
  const dateObject = new Date(comment.date);

  return (
    <div>
      <Box overflow="hidden" mb={1}>
        <Box p="1">
          <Flex align="center" mb="2" gap={3.5}>
            <Avatar
              size="xs"
              name={comment.user.avatar}
              src={comment.user.avatar}
            />

            <HStack alignContent="center">
              <HoverCardUser fontSize="xs" user={comment.user} />
              <Text pt="5px" fontSize="xs" color="gray.500" fontWeight="bold">
                Postado {formatRelativeDate(dateObject.toISOString())}
              </Text>
            </HStack>
            <Spacer />
            <CommentOptions />
          </Flex>
          <Stack pl="45px">
            <CommentContent content={comment.content} />
            <HStack mt="-5" gap="5" fontSize="13px">
              <HStack gap="-1">
                <IconButton variant="plain" color="pink.600" size="xs">
                  <IoHeartOutline />
                </IconButton>
                <HStack>
                  <Text>Like</Text>
                  <Show when={comment.likes !== 0}>
                    <Text>
                      <FormatNumber
                        value={comment.likes}
                        notation="compact"
                        compactDisplay="short"
                      />
                    </Text>
                  </Show>
                </HStack>
              </HStack>
              <Link variant="plain" onClick={comment.onReplyClick}>
                <IoMdShareAlt />
                <Text>Responder</Text>
              </Link>
            </HStack>
          </Stack>
        </Box>
      </Box>
    </div>
  );
};

const CommentContent: React.FC<{ content: FullContentComment }> = ({
  content,
}) => {
  return (
    <Box>
      {content.map((item, index) => (
        <Flex key={index}>
          {item.text && <TextFormatter text={item.text} fontSize="14px" />}
          {item.image && (
            <Flex mb="5" wrap="wrap" justifyContent="start">
              <ImageFormatter
                src={item.image}
                widthCalc={790}
                heightCalc={168}
                aspectRatio={"4 / 3"}
              />
            </Flex>
          )}
        </Flex>
      ))}
    </Box>
  );
};
