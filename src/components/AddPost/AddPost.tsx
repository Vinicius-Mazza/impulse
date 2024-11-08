import React, { useState } from 'react'
import { 
  Flex,  
  HStack, 
  Input,
  Spacer,
  Box,
  For,
  Container,
  IconButton,
  Show
} from '@chakra-ui/react'
import Picker from '@emoji-mart/react'
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText
} from '../ui/select'
import { Avatar } from '../ui/avatar'
import { Button } from '../ui/button'
import { InputGroup } from '../ui/input-group'
import { useFetchData } from '../../hooks'
import { User, Emoji } from '../../interfaces'
import { PiNotePencilFill } from 'react-icons/pi'
import { FaImage, FaGlobeAmericas, FaSmile } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { RiVideoOnFill } from 'react-icons/ri'
import { FaLock } from 'react-icons/fa'
import { FaUserGroup } from 'react-icons/fa6'


export const AddPost: React.FC = () => {
  const urlApiUser = 'http://localhost:3001/users'
  const { data: users } = useFetchData<User[]>(urlApiUser, undefined, 'id=1')
  const userAvatar = users?.[0].avatar
  const userFullName = `${users?.[0].firstname} ${users?.[0].lastname}`

  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isInputVisible, setIsInputVisible] = useState(false)
  const [hasAutoFocus, setHasAutoFocus] = useState(false)

  type IconLocation = 'private' | 'public' | 'friends'

  const items = [
    { label: 'Privado', value: 'private'},
    { label: 'Amigos', value: 'friends'},
    { label: 'Público', value: 'public'}
  ]

  const renderIcon = (iconName: IconLocation) => {
    const icons: { value: IconLocation; icon: React.ReactNode }[] = [
      { value: 'private', icon: <FaLock /> },
      { value: 'friends', icon: <FaUserGroup /> },
      { value: 'public', icon: <FaGlobeAmericas /> }
    ]
    const foundIcon = icons.find((icon) => icon.value === iconName)
  
    return foundIcon?.icon || null
  }

  const SelectValueItem = () => (
    <SelectValueText 
      color={{ base: '#363636', _dark: '#f3f1f1' }} 
      fontWeight='semibold' 
    >
      {(items: Array<{ label: string; value: IconLocation }>) => {
        const { label, value } = items[0]
        return (
          <HStack >
            <Box  fontSize='14.5px'>{renderIcon(value)}</Box>
            {label}
          </HStack>
        )
      }}
    </SelectValueText>
  )

  const CustomInput = () => {
    return (
      <InputGroup 
        startElement={
          <Avatar right='10px' name={userFullName} src={userAvatar} />
        }
        endElement={
          <IconButton
            left='13px'
            rounded='full'
            size='lg'
            variant='plain'
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <FaSmile />
          </IconButton>
        }
      >
        <Input
          ps='2.75em'
          borderRadius='full' 
          width='746px'
          autoFocus={hasAutoFocus}
          onFocus={() => setHasAutoFocus(true)}
          onBlur={() => setHasAutoFocus(false)}
          value={inputValue} 
          placeholder='Compartilhe algo'
          onChange={(e) => {
            setInputValue(e.target.value)
          }}
        />
      </InputGroup>
    )
  }

  return (
    <Container>
      <IconButton 
        position='fixed'
        rounded='full'
        size='lg'
        bottom={{ base: '20px', md: '20px' }}
        right={{ base: '20px', md: '370px' }}
        bg={{ base: '#f3f1f1', _dark: '#18181b' }}
        color={{base: '#000', _dark: '#fff'}}
        onClick={() => {
          setIsInputVisible(!isInputVisible)
          setShowEmojiPicker(false)
        }}
      >
        <PiNotePencilFill />
      </IconButton>

      {isInputVisible && (
        <Flex 
          bottom='20px'
          padding='4'
          borderRadius='xl'
          right='485px'
          position='fixed'
          zIndex={10}
          direction='column'
          bg={{ base: '#f3f1f1', _dark: '#18181b' }}
        >
          <CustomInput />
          <HStack mt={2}>
            <For
              each={[
                { label: 'Video', icon: <RiVideoOnFill /> },
                { label: 'Imagem', icon: <FaImage /> },
                { label: 'Localização', icon: <FaLocationDot /> }
              ]}
            >
              {(item, index) => (
                <Button
                  key={index} 
                  size='md' 
                  variant='plain' 
                  color={{ base: '#363636', _dark: '#f3f1f1' }}
                  _hover={{ color: { base: '#101010', _dark: 'white' } }}
                >
                  {item.icon} {item.label}
                </Button>
              )}
            </For>
            <SelectRoot 
              variant='filled' 
              color={{ base: '#363636', _dark: '#f3f1f1' }}
              size='sm' 
              items={items}
              defaultValue={['public']}
            >  
              <SelectTrigger width='39%'>
                <SelectValueItem />
              </SelectTrigger>
              
              <SelectContent color={{ base: '#363636', _dark: '#f3f1f1' }}>
                {items.map((item) => (
                  <SelectItem item={item} key={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>

            <Spacer />
            <Button 
              borderRadius='full' 
              backgroundColor={{ base: '#000', _dark: '#f3f1f1' }} 
              color={{ base: '#fff', _dark: '#000' }}
              width='12%'
            >
              Enviar
            </Button>
          </HStack>
        </Flex>
      )}
      <Show when={showEmojiPicker}>
        <Flex
          bottom='123px'
          right='525px'
          position='fixed'
          zIndex={10}
        >
          <Picker
            set='native'
            locale='pt'
            skinTonePosition='none'
            navPosition='none'
            theme={{ base: 'light', _dark: 'dark' }}
            previewPosition='none'
            onEmojiSelect={(emoji: Emoji) => {
              setInputValue(prevValue => prevValue + emoji.native)
            }} 
          />
        </Flex>
      </Show>
    </Container>
  )
}

