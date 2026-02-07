"use client"

import { AnimateIn } from "@/components/animate-in"

const brands = [
  { name: "ZARA", style: "font-bold tracking-[0.3em]" },
  { name: "MANGO", style: "font-bold tracking-[0.2em]" },
  { name: "COS", style: "font-bold tracking-[0.4em]" },
  { name: "MASSIMO DUTTI", style: "font-medium tracking-[0.15em]" },
  { name: "PUMA", style: "font-bold tracking-[0.2em]" },
  { name: "& OTHER STORIES", style: "font-light tracking-[0.1em]" },
]

export function BrandsMarquee() {
  return (
    <AnimateIn variant="fade" duration={800}>
      <section className="group border-y border-border/50 bg-card py-6 overflow-hidden">
        <div className="relative">
          <div className="flex animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap">
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <span
                key={index}
                className={`mx-8 md:mx-16 text-lg md:text-2xl text-foreground/80 hover:text-foreground transition-colors duration-300 ${brand.style}`}
              >
                {brand.name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </AnimateIn>
  )
}
