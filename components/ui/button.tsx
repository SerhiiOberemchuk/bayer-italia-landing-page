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
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.15em] transition-colors duration-200 outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2"

const variantClassMap: Record<ButtonVariant, string> = {
  default: "border border-foreground bg-foreground text-background hover:bg-[#34322f]",
  destructive:
    "border border-destructive bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20",
  outline: "border border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background",
  secondary: "border border-border bg-secondary text-secondary-foreground hover:bg-secondary/70",
  ghost: "border border-transparent bg-transparent hover:border-border",
  link: "text-primary underline-offset-4 hover:underline",
}

const sizeClassMap: Record<ButtonSize, string> = {
  default: "h-11 px-5",
  sm: "h-9 px-4",
  lg: "h-13 px-7",
  icon: "size-11",
  "icon-sm": "size-9",
  "icon-lg": "size-13",
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
