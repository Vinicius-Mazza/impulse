import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@/interfaces";
import { HoverCardUser } from "@/components/HoverCardUser";

export const SuggestionList: React.FC<User> = (user) => {
  const userFullName = `${user.firstname} ${user.lastname}`;

  return (
    <Flex align="center" justifyContent="space-between">
      <Box mr="120px">
        <Flex align="center" mb="3">
          <Avatar size="lg" name={userFullName} src={user.avatar} />
          <Box marginLeft="8px">
            <Heading minWidth="72.1px" maxWidth="72.1px" size="md">
              <HoverCardUser user={user} cardType="suggestion" />
            </Heading>
          </Box>
        </Flex>
      </Box>
      <Button size="xs" borderRadius="30px">
        Adicionar
      </Button>
    </Flex>
  );
};
