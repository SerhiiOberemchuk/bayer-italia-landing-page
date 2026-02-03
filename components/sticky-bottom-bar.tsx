import { Button } from "@/components/ui/button"
import { Send, MessageCircle } from "lucide-react"

export function StickyBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card/95 backdrop-blur-sm p-4 md:hidden">
      <div className="flex gap-3">
        <Button 
          className="flex-1 gap-2 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-xl h-12"
          asChild
        >
          <a href="https://t.me/bayer_italia_shop" target="_blank" rel="noopener noreferrer">
            <Send className="size-5" />
            Telegram
          </a>
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 gap-2 rounded-xl h-12 border-2 bg-transparent"
          asChild
        >
          <a href="https://t.me/raisa_orb" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-5" />
            Написати
          </a>
        </Button>
      </div>
    </div>
  )
}
