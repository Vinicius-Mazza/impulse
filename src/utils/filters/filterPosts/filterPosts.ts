import { Post } from '../../../interfaces';
import { FilterType } from '../filterTypes';
import { filterRecents, filterFriends, filterPopular } from '.'


export interface FilterFunction {
  (posts: Post[]): Post[];
} 

const filterMap: Map<FilterType, FilterFunction> = new Map([
  [FilterType.Recents, filterRecents],
  [FilterType.Friends, filterFriends],
  [FilterType.Popular, filterPopular]
]);

export const filterPosts = (posts: Post[], filterType: FilterType): Post[] => {
  const filterFunction = filterMap.get(filterType);
  return filterFunction ? filterFunction(posts) : posts;
};