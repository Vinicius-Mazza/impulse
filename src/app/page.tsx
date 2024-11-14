"use client";

import { ColorModeProvider } from "@/components/ui/color-mode";
import { Feeds } from "@/pages";
import { Sidebar } from "@/components";
import { Box, Flex } from "@chakra-ui/react";
import { useFetchData } from "@/hooks";
import { User } from "@/interfaces";

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const buildApiUrl = (route: string) => `${apiUrl}/${route}`;

  const urlApiUser = buildApiUrl("users");

  const { data: users } = useFetchData<User[]>(urlApiUser, undefined, "id=1");
  const user = users?.[0];

  return (
    <ColorModeProvider>
      <Flex>
        <Box as="aside" w="200px">
          {user && <Sidebar {...user} />}
        </Box>
        <Box flex="1" paddingLeft="10">
          <Feeds />
        </Box>
      </Flex>
    </ColorModeProvider>
  );
}
