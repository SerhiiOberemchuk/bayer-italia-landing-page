import Image from "next/image"
import { Send, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-card px-4 py-12 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="relative h-16 w-16 mb-4">
            <Image
              src="/images/bayer-italia-logo.png"
              alt="Bayer Italia Logo"
              fill
              className="object-contain"
            />
          </div>
          
          <h3 className="font-serif text-xl font-semibold text-foreground">Bayer Italia</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-md">
            Ваш персональний баєр з Італії. Оригінальні речі напряму з італійських магазинів.
          </p>

          {/* Contact Links */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a 
              href="https://t.me/bayer_italia_shop" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Send className="size-4" />
              @bayer_italia_shop
            </a>
            <a 
              href="https://t.me/raisa_orb" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <MessageCircle className="size-4" />
              @raisa_orb
            </a>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 pt-8 border-t w-full">
            <p className="text-xs text-muted-foreground">
              Ми не є офіційним магазином. Працюємо як персональний баєр-сервіс — закуповуємо оригінальні товари в Італії на замовлення клієнтів.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              © {new Date().getFullYear()} Bayer Italia. Всі права захищено.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
