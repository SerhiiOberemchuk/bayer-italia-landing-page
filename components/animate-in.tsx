import { Children, type CSSProperties, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type AnimationVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade"
  | "scale"
  | "blur"

interface AnimateInProps {
  children: ReactNode
  variant?: AnimationVariant
  delay?: number
  duration?: number
  className?: string
}

export function AnimateIn({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 600,
  className,
}: AnimateInProps) {
  const style = {
    "--animate-in-delay": `${delay}ms`,
    "--animate-in-duration": `${duration}ms`,
  } as CSSProperties

  return (
    <div
      className={cn("animate-in", className)}
      data-animate-variant={variant}
      style={style}
    >
      {children}
    </div>
  )
}

interface StaggerChildrenProps {
  children: ReactNode
  staggerDelay?: number
  baseDelay?: number
  variant?: AnimationVariant
  duration?: number
  className?: string
  childClassName?: string
}

export function StaggerChildren({
  children,
  staggerDelay = 100,
  baseDelay = 0,
  variant = "fade-up",
  duration = 600,
  className,
  childClassName,
}: StaggerChildrenProps) {
  const childArray = Children.toArray(children)

  return (
    <div className={className}>
      {childArray.map((child, index) => (
        <AnimateIn
          key={index}
          variant={variant}
          delay={baseDelay + index * staggerDelay}
          duration={duration}
          className={childClassName}
        >
          {child}
        </AnimateIn>
      ))}
    </div>
  )
}
