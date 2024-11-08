import { FilterType } from '../../utils/filters'
import { Flex, Group } from '@chakra-ui/react'
import { EmptyState } from '../../components/ui/empty-state'
import { Button } from '../../components/ui/button'
import { MdOutlineExplore } from 'react-icons/md'
import { MdOutlineAddCircleOutline, MdOutlineTrendingUp } from 'react-icons/md'
import { FaRegCommentDots } from 'react-icons/fa'


type EmptyStateSize = 'lg' | 'md' | undefined

interface CustomEmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  children?: React.ReactNode
  size?: EmptyStateSize
}

export const CustomEmptyState: React.FC<CustomEmptyStateProps> = ({ 
    icon, 
    title, 
    description, 
    children,
    size="lg"
  }) => {
  return (
    <EmptyState size={size} icon={icon} title={title} description={description}>
      {children}
    </EmptyState>
  )
}

export const FeedEmptyState: React.FC<{
  filterType: FilterType
}> = 
  ({ filterType }) => {
  
  const emptyStates = {
    [FilterType.All]: {
      size: 'lg' as EmptyStateSize,
      icon: <MdOutlineExplore />,
      title: 'Nada por aqui ainda!',
      description: `
        Seja o primeiro a compartilhar seus pensamentos e experiências.
      `
    },
    [FilterType.Recents]: {
      size: 'lg' as EmptyStateSize,
      icon: <MdOutlineAddCircleOutline />,
      title: 'Atualize seu feed!',
      description: `
        Para ver as publicações mais recentes, 
        faça uma nova postagem ou siga mais pessoas.
      `
    },
    [FilterType.Friends]: {
      size: 'lg' as EmptyStateSize,
      icon: <FaRegCommentDots />,
      title: 'Seus amigos estão quietos hoje.',
      description: `
        Que tal dar uma olhada no seu feed?
      `
    },
    [FilterType.Popular]: {
      size: 'lg' as EmptyStateSize,
      icon: <MdOutlineTrendingUp />,
      title: 'Nada tão popular ainda!',
      description: `
        As postagens mais engajadas aparecerão aqui. 
        Compartilhe conteúdos incríveis para alcançar o topo!
      `
    }
  }

  const { icon, title, description, size } = emptyStates[filterType] || {}

  return (
    <Flex paddingTop='150px'>
      <EmptyState size={size} icon={icon} title={title} description={description}>
        <Group>
          <Button>Fazer nova postagem</Button>
          <Button variant="outline">Encontrar amigos</Button>
        </Group>
      </EmptyState>
    </Flex>
  )
}