import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'h-8 w-full min-w-0 rounded-lg border border-input bg-black/5 px-2.5 py-1 text-base text-foreground backdrop-blur-sm transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground autofill:[-webkit-text-fill-color:var(--foreground)] autofill:shadow-[inset_0_0_0px_1000px_rgba(0,0,0,0.04)] autofill:[transition:background-color_9999s_ease-in-out_0s] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-white/15 dark:text-white dark:placeholder:text-white/60 dark:autofill:[-webkit-text-fill-color:white] dark:autofill:shadow-[inset_0_0_0px_1000px_rgba(255,255,255,0.15)] dark:focus-visible:border-white/70 dark:focus-visible:ring-white/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
