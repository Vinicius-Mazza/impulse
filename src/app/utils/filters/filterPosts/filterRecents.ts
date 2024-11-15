import { DateTime } from "luxon";
import { Post } from "@/interfaces";

export const filterRecents = (posts: Post[]): Post[] => {
  const oneWeekAgo = DateTime.utc().minus({ days: 7 }).startOf("day");

  return posts.filter((post) => {
    const dateObject = new Date(post.date);
    const postDateTime = DateTime.fromISO(dateObject.toISOString(), {
      zone: "utc",
    });
    return postDateTime >= oneWeekAgo;
  });
};
