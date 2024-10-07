import { Post } from "../../../interfaces"

export const filterFriends = (posts: Post[]): Post[] => {
  return posts.filter((post) => Number(post.id) === 3)
};