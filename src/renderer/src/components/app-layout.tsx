import { cn } from '@renderer/utils'
import { ComponentProps, ReactElement } from 'react'

export const RootLayout = ({
  children,
  className,
  ...rest
}: ComponentProps<'main'>): ReactElement => {
  return (
    <main className={cn('flex flex-col h-screen', className)} {...rest}>
      {children}
    </main>
  )
}

export const SidebarLayout = ({
  children,
  className,
  ...rest
}: ComponentProps<'aside'>): ReactElement => {
  return (
    <aside className={cn('w-1/3 max-w-[400px] hidden md:block overflow-auto', className)} {...rest}>
      {children}
    </aside>
  )
}

export const ContentLayout = ({
  className,
  children,
  ...rest
}: ComponentProps<'div'>): ReactElement => {
  return (
    <div
      className={cn('flex-1 overflow-auto border-l border-l-foreground-muted/30', className)}
      {...rest}
    >
      {children}
    </div>
  )
}
