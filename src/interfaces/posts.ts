import { User } from '.'
import { Comment } from '.'


export interface Image {
  url: string
}

export interface Video {
  url: string
}

interface FullContentItem {
  text?: string
  image?: string | Image[]
  video?: Video
}

export type FullContent = FullContentItem[]

export interface Post {
  id: number
  user: User
  content: FullContent
  date: Date
  likes: number
  comments: Comment[]
}