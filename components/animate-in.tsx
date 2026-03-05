"use client"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

type AnimationVariant = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "fade" | "scale" | "blur"

interface AnimateInProps {
  children: React.ReactNode
  variant?: AnimationVariant
  delay?: number
  duration?: number
  className?: string
}

const variantStyles: Record<AnimationVariant, { from: string; to: string }> = {
  "fade-up": {
    from: "opacity-0 translate-y-8",
    to: "opacity-100 translate-y-0",
  },
  "fade-down": {
    from: "opacity-0 -translate-y-8",
    to: "opacity-100 translate-y-0",
  },
  "fade-left": {
    from: "opacity-0 translate-x-8",
    to: "opacity-100 translate-x-0",
  },
  "fade-right": {
    from: "opacity-0 -translate-x-8",
    to: "opacity-100 translate-x-0",
  },
  fade: {
    from: "opacity-0",
    to: "opacity-100",
  },
  scale: {
    from: "opacity-0 scale-95",
    to: "opacity-100 scale-100",
  },
  blur: {
    from: "opacity-0 blur-sm",
    to: "opacity-100 blur-0",
  },
}

export function AnimateIn({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 600,
  className,
}: AnimateInProps) {
  const { ref, isInView } = useInView<HTMLDivElement>()
  const styles = variantStyles[variant]

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out will-change-transform",
        isInView ? styles.to : styles.from,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

interface StaggerChildrenProps {
  children: React.ReactNode
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
  const childArray = Array.isArray(children) ? children : [children]

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
