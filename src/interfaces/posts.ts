import { User } from '.';
import { Comment } from '.';

export interface Post {
  id: number;
  user: User;
  content: string;
  date: Date;
  likes: number;
  comments: Comment[];
}