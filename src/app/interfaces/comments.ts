import { User } from "@/interfaces";

export interface Comment {
  id: number;
  user: User;
  content: string;
  date: Date;
}
