import * as React from "react"
import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        `
        h-11 w-full min-w-0
        rounded-xl
        border border-input
        bg-transparent
        px-4 py-2
        text-sm
        placeholder:text-muted-foreground
        transition-colors
        outline-none

        focus:border-foreground/40
        focus-visible:ring-0
        focus-visible:ring-offset-0

        disabled:pointer-events-none
        disabled:cursor-not-allowed
        disabled:opacity-50

        file:border-0
        file:bg-transparent
        file:text-sm
        file:font-medium
        `,
        className
      )}
      {...props}
    />
  )
}

export { Input }
