import { User } from '.'

interface StoryItem {
  content: string;
}

export interface Story {
  id: number
  user: User
  date: Date
  stories: StoryItem[]
}