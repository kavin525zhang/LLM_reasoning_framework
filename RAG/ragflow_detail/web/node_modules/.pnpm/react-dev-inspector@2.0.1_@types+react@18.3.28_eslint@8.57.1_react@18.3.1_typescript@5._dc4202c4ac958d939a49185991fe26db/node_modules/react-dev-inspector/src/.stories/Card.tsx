import type { ReactNode } from 'react'
import {
  Button,
  Card as CardContainer,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './components'


export const Card = ({
  title = 'Title',
  description = 'Description',
  cancelText = 'Cancel',
  onCancel,
  confirmText = 'OK',
  onConfirm,
  children,
}: {
  title?: ReactNode;
  description?: ReactNode;
  cancelText?: ReactNode;
  onCancel?: () => void;
  confirmText?: ReactNode;
  onConfirm?: () => void;
  children?: ReactNode;
}) => (
  <CardContainer className='w-96'>
    <CardHeader>
      <CardTitle>
        {title}
      </CardTitle>
      <CardDescription>
        {description}
      </CardDescription>
    </CardHeader>

    <CardContent>
      {children}
    </CardContent>

    <CardFooter className='flex justify-between'>
      <Button
        variant='outline'
        onClick={onCancel}
      >
        {cancelText}
      </Button>
      <Button
        onClick={onConfirm}
      >
        {confirmText}
      </Button>
    </CardFooter>
  </CardContainer>
)
