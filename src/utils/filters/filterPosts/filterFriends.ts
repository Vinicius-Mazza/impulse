import { Post } from "../../../interfaces";

export const filterFriends = (posts: Post[]): Post[] => {
  return posts.filter((post) => post.id === 3);
};