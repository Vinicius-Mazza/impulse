import { Post } from '../../../interfaces';
import { FilterType } from '../filterTypes'

export const filterPosts = (posts: Post[], filterPost: FilterType): Post[] => {
  switch (filterPost) {
    case 'recents':
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

    case 'friends':
      return posts.filter((post) => post.id === 3);
      
    case 'popular':
      return posts.filter((post) => post.likes >= 10);

    default:
      return posts;
  }
};
