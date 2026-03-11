/**
 * https://ui.shadcn.com/docs/components/card
 */

import {
  forwardRef,
  type ReactNode,
  type HTMLAttributes,
} from 'react'

import { clsx } from 'clsx'

export const Card = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className,
    )}
    {...props}
  />
))
Card.displayName = 'Card'

export const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    title?: ReactNode;
    description?: ReactNode;
  }
>(({
  className, title, description, children, ...props
}, ref) => (
  <div
    ref={ref}
    className={clsx('flex flex-col space-y-2.5 p-6', className)}
    {...props}
  >
    {title && (
      <CardTitle>
        {title}
      </CardTitle>
    )}
    {description && (
      <CardDescription>
        {description}
      </CardDescription>
    )}
    {children}
  </div>
))
CardHeader.displayName = 'CardHeader'

export const CardTitle = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={clsx(
      'text-2xl font-semibold leading-none tracking-tight',
      className,
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={clsx('text-sm text-muted-foreground', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

export const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={clsx('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

export const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(' flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

