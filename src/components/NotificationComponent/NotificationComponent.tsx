import React from 'react';
import { ToastPosition, useToast } from '@chakra-ui/react';

interface NotificationProps {
  title: string;
  description: string;
  status?: 'success' | 'error' | 'warning' | 'info' | "loading";
  duration?: number;
  isClosable?: boolean;
  position?: ToastPosition
}

export const NotificationComponent: React.FC<NotificationProps> = ({
  title,
  description,
  status = 'info',
  duration = 5000,
  isClosable = true,
  position = 'top-right'
}) => {
  const toast = useToast();

  toast({
    title,
    description,
    status,
    duration,
    isClosable,
    position,
  });

  return null; // O componente não renderiza nada na tela
};
