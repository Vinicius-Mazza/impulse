import { Post } from "../../../interfaces";

export const filterPopular = (posts: Post[]): Post[] => {
  return posts.filter((post) => post.likes >= 10);
};