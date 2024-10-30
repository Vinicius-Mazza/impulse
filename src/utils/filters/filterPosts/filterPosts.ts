import { Post } from '../../../interfaces'
import { FilterType } from '../filterTypes'
import { filterRecents, filterFriends, filterPopular } from '.'


export interface FilterFunction {
  (posts: Post[]): Post[]
} 

const filterMap: Map<FilterType, FilterFunction> = new Map([
  [FilterType.Recents, filterRecents],
  [FilterType.Friends, filterFriends],
  [FilterType.Popular, filterPopular]
])

export const filterPosts = 
  (posts: Post[], filterType: FilterType): Post[] | null => {
  const filterFunction = filterMap.get(filterType)
  const filteredPosts = filterFunction ? filterFunction(posts) : posts

  return filteredPosts.length > 0 ? filteredPosts : null
}