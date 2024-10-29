import React, { useState } from 'react'
import { User } from '../../interfaces'
import { Button } from '../ui/button'
import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger
} from '../ui/hover-card'
import { Link, Show, Stack, Text } from '@chakra-ui/react'
import { Avatar } from '../ui/avatar'


interface HoverCardUserProps {
  user: User
  hoverTrigger?: 'mention' | 'default'
  cardType?: 'suggestion' | 'default'
}

export const HoverCardUser: React.FC<HoverCardUserProps> = ({ 
  user, hoverTrigger='default', cardType='default' 
}) => {
  const [open, setOpen] = useState(false)
  const userFullName = `${user.firstname} ${user.lastname}`

  return (
    <HoverCardRoot 
      size="sm" 
      open={open} 
      onOpenChange={(e) => setOpen(e.open)} 
      closeDelay={100}
    >
      <Show when={hoverTrigger === 'mention'} fallback={
        <HoverCardTrigger>
          <Link href="#">
            <Text textAlign='left' fontWeight='bold'>{userFullName}</Text>
          </Link>
        </HoverCardTrigger>
        }
      >
        <HoverCardTrigger>
          <Link variant="underline" colorPalette="blue" href="#">
            {user.firstname}
          </Link>
        </HoverCardTrigger>
      </Show>
      <HoverCardContent>
        <HoverCardArrow />
        <Stack gap="4" direction="row">
          <Avatar
            size="2xl"
            name={userFullName}
            src={user.avatar}
          />
          <Stack gap="3">
            <Stack gap="1">
              <Text textStyle="lg" fontWeight="semibold">
                {userFullName}
              </Text>
              <Text textStyle="sm" color="fg.subtle">
                {user.bio}
              </Text>
            </Stack>
            <Show when={cardType === 'suggestion'} fallback={
              <Button width="100px" size='md'>Adicionar</Button>
            }>
              <Button width="100px" size='md'>Ver perfil</Button>
            </Show>
          </Stack>
        </Stack>
      </HoverCardContent>
    </HoverCardRoot>
  )
}