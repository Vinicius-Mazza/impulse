import { Post } from '.';

export interface FilterFunction {
  (posts: Post[]): Post[];
}