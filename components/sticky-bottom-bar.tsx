import { Button } from "@/components/ui/button"
import { Send, MessageCircle } from "lucide-react"
import type { Dictionary } from "@/lib/i18n/dictionary"

interface StickyBottomBarProps {
  dict: Dictionary["stickyBar"]
}

export function StickyBottomBar({ dict }: StickyBottomBarProps) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t bg-card/95 p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] backdrop-blur-sm md:hidden"
      aria-label="Mobile quick actions"
    >
      <div className="flex gap-3">
        <Button
          className="flex-1 gap-2 rounded-xl bg-[#005e8a] text-white h-12 transition-transform active:scale-[0.97] hover:bg-[#004a6b]"
          asChild
        >
          <a
            href="https://t.me/buyer_italia_shop"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buyer Italia Telegram channel"
          >
            <Send className="size-5" aria-hidden="true" />
            {dict.telegram}
          </a>
        </Button>
        <Button
          variant="outline"
          className="flex-1 gap-2 rounded-xl h-12 border-2 bg-transparent transition-transform active:scale-[0.97]"
          asChild
        >
          <a
            href="https://t.me/raisa_orb"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Write to Raisa on Telegram"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            {dict.write}
          </a>
        </Button>
      </div>
    </nav>
  )
}
