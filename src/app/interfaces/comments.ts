import { User } from "@/interfaces";

interface FullContentItem {
  text?: string;
  image?: string;
}

export type FullContentComment = FullContentItem[];

export interface Comment {
  id: number;
  user: User;
  content: FullContentComment;
  date: Date;
  likes: number;
}
