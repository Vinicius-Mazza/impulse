import { User } from "@/interfaces";

export interface StoryItem {
  content: string;
}

export interface Story {
  id: number;
  user: User;
  date: Date;
  stories: StoryItem[];
}
