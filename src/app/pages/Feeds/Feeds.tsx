import React, { useState } from "react";
import { Flex, Box, HStack, Stack, Show, Container } from "@chakra-ui/react";
import {
  FeedsHeaderSection,
  UserPost,
  Notification,
  ActivityFeed,
  FeedEmptyState,
  CustomEmptyState,
  AddPost,
} from "@/components";
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@/components/ui/skeleton";
import { filterPosts, FilterType } from "@/utils/filters";
import { Post } from "@/interfaces";
import { useFetchData } from "@/hooks";
import { LuServerOff } from "react-icons/lu";

export const Feeds: React.FC = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const buildApiUrl = (route: string) => `${apiUrl}/${route}`;
  const urlApiPosts = buildApiUrl("posts");

  const { data: posts, isLoading, error } = useFetchData<Post[]>(urlApiPosts);
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const handleFilterChange = (tab: FilterType) => setFilter(tab);
  const filteredPosts: Post[] | null = posts ? filterPosts(posts, filter) : [];
  const displayPosts = filteredPosts ?? [];

  return (
    <Flex>
      <Box flex={0.7} pr="340" mt={6}>
        <FeedsHeaderSection onFilterChange={handleFilterChange} />
        {isLoading ? (
          <FeedSkeleton />
        ) : error ? (
          <Container>
            <Notification
              title="Erro ao carregar dados"
              description="Ocorreu um erro inesperado."
              type="error"
            />
            <Flex paddingTop="150px">
              <CustomEmptyState
                icon={<LuServerOff />}
                title="Erro ao carregar dados."
                description="Verifique sua conexão com a internet e tente atualizar a página."
              />
            </Flex>
          </Container>
        ) : (
          <Container>
            <Show
              when={displayPosts.length !== 0}
              fallback={<FeedEmptyState filterType={filter} />}
            >
              {displayPosts.map((post) => (
                <UserPost key={post.id} {...post} />
              ))}
              <AddPost />
            </Show>
          </Container>
        )}
      </Box>
      <Box
        as="aside"
        w="380px"
        position="fixed"
        top="0"
        right="0"
        height="100vh"
      >
        <ActivityFeed />
      </Box>
    </Flex>
  );
};

const FeedSkeleton: React.FC = () => {
  return (
    <Stack gap="6" maxW="xs">
      <HStack width="full">
        <SkeletonCircle size="10" />
        <SkeletonText noOfLines={2} />
      </HStack>
      <Skeleton width="869px" height="200px" />
    </Stack>
  );
};
