import React from 'react'
import { Toaster, toaster } from "../ui/toaster"


interface NotificationProps {
  title: string
  description: string
  type?: 'success' | 'error' | 'warning' | 'info' | "loading"
  duration?: number,
  // position?: string
}

export const NotificationComponent: React.FC<NotificationProps> = ({
  title,
  description,
  type = 'info',
  duration = 5000,
  // position = 'top-right'
}) => {
  toaster.create({
    title,
    description,
    type,
    duration,
    // position
  })
  return <Toaster />
}
