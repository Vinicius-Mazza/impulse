import { Post } from "@/interfaces";

export const filterRecents = (posts: Post[]): Post[] => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  oneWeekAgo.setHours(0, 0, 0, 0);

  return posts.filter((post) => {
    const postDateUTC = new Date(post.date).toUTCString();
    const oneWeekAgoUTC = oneWeekAgo.toUTCString();

    const postTimestamp = new Date(postDateUTC).getTime();
    const oneWeekAgoTimestamp = new Date(oneWeekAgoUTC).getTime();
    return postTimestamp >= oneWeekAgoTimestamp;
  });
};
