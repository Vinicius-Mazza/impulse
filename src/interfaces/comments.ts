import { User } from ".";

export interface Comment {
  id: number;
  user: User;
  content: string;
  date: Date;
}