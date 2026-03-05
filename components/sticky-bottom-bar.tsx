"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Send, MessageCircle } from "lucide-react"
import type { Dictionary } from "@/lib/i18n/dictionary"

interface StickyBottomBarProps {
  dict: Dictionary["stickyBar"]
}

export function StickyBottomBar({ dict }: StickyBottomBarProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 border-t bg-card/95 backdrop-blur-sm p-4 md:hidden transition-transform duration-500 ease-out ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex gap-3">
        <Button 
          className="flex-1 gap-2 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-xl h-12 transition-transform active:scale-[0.97]"
          asChild
        >
          <a href="https://t.me/buyer_italia_shop" target="_blank" rel="noopener noreferrer">
            <Send className="size-5" />
            {dict.telegram}
          </a>
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 gap-2 rounded-xl h-12 border-2 bg-transparent transition-transform active:scale-[0.97]"
          asChild
        >
          <a href="https://t.me/raisa_orb" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-5" />
            {dict.write}
          </a>
        </Button>
      </div>
    </div>
  )
}
