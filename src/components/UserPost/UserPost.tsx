import React, { useState, useRef, Fragment } from 'react'
import { 
  Box, 
  Flex, 
  Text, 
  Image, 
  Show, 
  Heading, 
  HStack, 
  Link
} from '@chakra-ui/react'
import TruncateMarkup from 'react-truncate-markup'
import { MediaPlayer, MediaProvider } from '@vidstack/react'
import { 
  defaultLayoutIcons, 
  DefaultVideoLayout 
} from '@vidstack/react/player/layouts/default'
import { Avatar } from '../ui/avatar'
import { Button } from '../ui/button'
import { useFetchData } from '../../hooks'
import { Post as PostType, FullContent, User } from '../../interfaces'
import { HoverCardUser } from '../HoverCardUser'
import '@vidstack/react/player/styles/default/theme.css'
import '@vidstack/react/player/styles/default/layouts/video.css'


export const UserPost: React.FC<PostType> = (post) => {
  const userFullname = `${post.user.firstname} ${post.user.lastname}`
  
  return (
    <Box overflow='hidden' mb={5}>
    {/* <Box width='809px' overflow='hidden' mb={5}> */}
      <Box p='4'>
        <Flex align='center' mb='4' gap={3.5}>
          <Avatar size='lg' name={userFullname} src={post.user.avatar} />
          <Box>
            <HoverCardUser user={post.user} />
            <Text fontSize='sm' color='gray.500'>
              {new String(post.date)}
            </Text>
          </Box>
        </Flex>
        {/* ... (imagens, emojis, etc.) */}
        <MediaContent content={post.content} />       
        <HStack mt={2}>
          <Button variant='ghost' colorScheme='teal' size='sm'>
            Like {post.likes}
          </Button>
          <Button variant='ghost' colorScheme='teal' size='sm'>
            Comentarios
          </Button>
        </HStack>
      </Box>
    </Box>
  )
}

const MediaContent: React.FC<{content: FullContent}> = ({ content }) => {
  const visibleImagesCount = 5

  return (
    <Box>
      {content.map((item, index) => (
        <Flex key={index}>
          {item.text && <TextContent text={item.text} />}
          {item.image && (
              <Flex wrap="wrap" justifyContent='start' gap={1.5}>
                {Array.isArray(item.image) ? (
                  item.image.slice(0, visibleImagesCount).map((img, imgIndex) => (
                    <MediaContentImage key={imgIndex} src={img.url} />
                  ))
                ) : (
                  <MediaContentImage src={item.image} />
                )}
                <Show when={item.image.length > visibleImagesCount}>
                  <ShowAllImages
                    hiddenImagesCount={item.image.length - visibleImagesCount} 
                  />
                </Show>
              </Flex>
            )}
          {item.video && (
            <MediaContentVideo src={item.video.url} />
          )}
        </Flex>
      ))}
    </Box>
  )
} 

const TextContent: React.FC<{text: string}> = ({ text }) => {
  const urlApiUsers = 'http://localhost:3001/users'
  const { data: users } = useFetchData<User[]>(urlApiUsers)
  const [isTruncated, setIsTruncated] = useState(true)

  interface Element {
    type: string
    value: string
  }

  const renderMention = (username: string) => {
    const user = (users || []).find(user => user.username === username)
    return (
      <span key={username}>
        <TruncateMarkup.Atom key={username}>
          <Show when={user} fallback={`@${username}`}>
            <>
              <Avatar 
                size="sm" 
                name={`${user?.firstname ?? ''} ${user?.lastname ?? ''}`}
                src={user?.avatar ?? ''} 
              />
              &nbsp;{user && <HoverCardUser user={user} hoverTrigger='mention'/>}
            </>
          </Show>
        </TruncateMarkup.Atom>
      </span>
    )
  }
  
  const renderUrl = (url: string) => {
    return (
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        colorPalette="blue"
        key={url}
      >
        {url}
      </Link>
    )
  }

  const renderHashtag = (hashtag: string) => {
    return (
      <Link href={`/search?query=${hashtag}`} colorPalette="blue" key={hashtag}>
        #{hashtag}
      </Link>
    )
  }
  
  const renderFormattedText = (text: string) => {
    const regexes = [
      { type: 'mention', regex: /@(\w+)/g },
      { type: 'url', regex: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]+)+(?:[/?#][^\s]*)?)/gi },
      { type: 'hashtag', regex: /#(\w+)/g }
    ]

    const renderers = [
      { type: 'mention', render: renderMention },
      { type: 'url', render: renderUrl },
      { type: 'hashtag', render: renderHashtag }
    ]

    const elements: Element[] = []
    let lastIndex = 0
  
    regexes.forEach(({ type, regex }) => {
      let match
      while ((match = regex.exec(text)) !== null) {
        elements.push({ type: 'text', value: text.substring(lastIndex, match.index) })
        elements.push({ type: type, value: match[1] })
        lastIndex = match.index + match[0].length
      }
    })

    if (lastIndex < text.length) {
      elements.push({ type: 'text', value: text.substring(lastIndex) })
    }
    
    return (
      <Fragment>
        {elements.map((element) => {
          const renderer = renderers.find((r) => r.type === element.type)
          return renderer ? renderer.render(element.value) : element.value
        })}
      </Fragment>
    )
  }

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated)
  }

  const readMoreEllipsis = (
    <span>
      ...
      <br />
      <Link color="#8f8f8f" onClick={toggleTruncate}>Ver mais</Link>
    </span>
  )

  return (
    <div>
      <Show 
        when={isTruncated}
        fallback={
          <Text
            as="div"
            whiteSpace="pre-wrap"
            fontSize="md"
            lineHeight="1.6"
            mb={5}
            fontWeight='500'
            width="100%"
          >
            {renderFormattedText(text)}
            <br />
            <Link color="#8f8f8f" onClick={toggleTruncate}>Ver menos</Link>
          </Text>
        }
      >
        <TruncateMarkup lines={4} ellipsis={readMoreEllipsis}>          
          <Text
            as="div"
            whiteSpace="pre-wrap"
            fontSize="md"
            lineHeight="1.6"
            mb={5}
            fontWeight='500'
            width="100%"
          >
            {renderFormattedText(text)}
          </Text>
        </TruncateMarkup>
      </Show>
    </div>
  )
}

const MediaContentImage: React.FC<{src: string}> = ({ src }) => {
  const [imageDimensions, setImageDimensions] = useState<{
    width: number
    height: number
  }>({
    width: 0,
    height: 0
  })
  const imageRef = useRef<HTMLImageElement>(null)

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const image = event.target as HTMLImageElement
    const imageWidth = image.naturalWidth - 790
    setImageDimensions({ width: imageWidth, height: 295 })
  }

  return (
    <Flex wrap="wrap">
      <Image
        ref={imageRef}
        onLoad={handleImageLoad}
        width={imageDimensions.width}
        height={imageDimensions.height}
        borderRadius='2xl'
        mb={0.8}
        src={src}
        alt="postImage"
      />
    </Flex>
  )
}

const ShowAllImages: React.FC<{hiddenImagesCount: number}> = ({ hiddenImagesCount }) => {
  return (
    <Box
      width="170px"
      height="295px"
      bg="rgba(186, 186, 186, 0.5)"
      borderRadius="2xl"
      display="flex"
      justifyContent="center" 
      alignItems="center"
    >
      <Button
        as="div"
        bg="rgba(255, 255, 255, 0.7)"
        borderRadius="full"
        width="100px"
        height="100px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Heading size="4xl" fontWeight="bold" color="#101010">
          +{hiddenImagesCount}
        </Heading>
      </Button>
    </Box>
  )
}

const MediaContentVideo: React.FC<{src: string}> = ({ src }) => {
  return (
    <MediaPlayer aspectRatio="21/9" title="Impulse" src={src}>
      <MediaProvider />
      <DefaultVideoLayout icons={defaultLayoutIcons} />
    </MediaPlayer>
  )
}