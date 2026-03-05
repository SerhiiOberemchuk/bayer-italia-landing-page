import * as React from "react"
import { cn } from "@/lib/utils"

type BadgeVariant = "default" | "secondary" | "destructive" | "outline"

const baseBadgeClass =
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap overflow-hidden rounded-md border px-2 py-0.5 text-xs font-medium transition-colors"

const variantClassMap: Record<BadgeVariant, string> = {
  default: "border-transparent bg-primary text-primary-foreground",
  secondary: "border-transparent bg-secondary text-secondary-foreground",
  destructive: "border-transparent bg-destructive text-white",
  outline: "text-foreground",
}

export function badgeVariants({
  variant = "default",
  className,
}: {
  variant?: BadgeVariant
  className?: string
}) {
  return cn(baseBadgeClass, variantClassMap[variant], className)
}

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  asChild?: boolean
  variant?: BadgeVariant
}

export function Badge({
  className,
  variant = "default",
  asChild = false,
  children,
  ...props
}: BadgeProps) {
  const classes = badgeVariants({ variant, className })

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>
    return React.cloneElement(child, {
      ...(props as Record<string, unknown>),
      className: cn(classes, child.props.className),
      "data-slot": "badge",
    } as Record<string, unknown>)
  }

  return (
    <span {...props} className={classes} data-slot="badge">
      {children}
    </span>
  )
}
