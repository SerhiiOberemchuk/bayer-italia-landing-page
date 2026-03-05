import * as React from "react"
import { cn } from "@/lib/utils"

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"

type ButtonSize = "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"

const baseButtonClass =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"

const variantClassMap: Record<ButtonVariant, string> = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive:
    "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20",
  outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
}

const sizeClassMap: Record<ButtonSize, string> = {
  default: "h-9 px-4 py-2",
  sm: "h-8 px-3 py-1.5",
  lg: "h-10 px-6",
  icon: "size-9",
  "icon-sm": "size-8",
  "icon-lg": "size-10",
}

export function buttonVariants({
  variant = "default",
  size = "default",
  className,
}: {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}) {
  return cn(baseButtonClass, variantClassMap[variant], sizeClassMap[size], className)
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
  size?: ButtonSize
  variant?: ButtonVariant
}

export function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  type,
  ...props
}: ButtonProps) {
  const classes = buttonVariants({ variant, size, className })

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>
    return React.cloneElement(child, {
      ...(props as Record<string, unknown>),
      className: cn(classes, child.props.className),
      "data-slot": "button",
    } as Record<string, unknown>)
  }

  return (
    <button
      {...props}
      type={type ?? "button"}
      className={classes}
      data-slot="button"
    >
      {children}
    </button>
  )
}
