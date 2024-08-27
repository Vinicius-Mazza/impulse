export interface User {
  name: string;
  avatar: string;
}

export interface Post {
  id: number;
  user: User;
  content: string;
  date: Date;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: number;
  user: User;
  content: string;
  date: Date;
}