import type { ButtonProps } from '#/components/animate-ui/components/buttons/button'
import { buttonVariants } from '#/components/animate-ui/components/buttons/button'
import { cn } from '#/lib/utils'
import type { LinkProps as RouterLinkProps } from '@tanstack/react-router'
import { Link as RouterLink } from '@tanstack/react-router'

type LinkProps = RouterLinkProps &
  Pick<ButtonProps, 'variant' | 'size'> & {
    className?: string
  }

export function Link({ className, variant, size, ...props }: LinkProps) {
  return (
    <RouterLink
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}
