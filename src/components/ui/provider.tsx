"use client"

import { ChakraProvider, defaultSystem, SystemContext } from "@chakra-ui/react"
import { ColorModeProvider } from "./color-mode"

export function Provider(props: React.PropsWithChildren<{ value: SystemContext }>) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider>{props.children}</ColorModeProvider>
    </ChakraProvider>
  )
}
