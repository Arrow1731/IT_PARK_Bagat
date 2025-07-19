"use client"

import { useLanguage } from "@/components/language-provider"
import { MessageCircle, Instagram, Facebook, Youtube, Linkedin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const { t } = useLanguage()

  const handleSocialClick = (platform: string) => {
    const urls = {
      telegram: "https://t.me/itpark_uz",
      instagram: "https://instagram.com/itpark.uz",
      facebook: "https://facebook.com/itpark.uz",
      youtube: "https://youtube.com/@itpark_uz",
      linkedin: "https://linkedin.com/company/itpark-uz",
    }

    window.open(urls[platform as keyof typeof urls], "_blank")
  }

  return (
    <footer className="bg-gradient-to-r from-green-600 to-green-700 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center shadow-md">
                <span className="text-green-600 font-bold text-lg">IT</span>
              </div>
              <span className="font-bold text-xl text-white">IT PARK</span>
            </div>
            <p className="text-green-100">Современный центр IT образования и инновационных технологий</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Навигация</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-green-100 hover:text-white transition-colors">
                {t("home")}
              </Link>
              <Link href="/courses" className="block text-green-100 hover:text-white transition-colors">
                {t("courses")}
              </Link>
              <Link href="/news" className="block text-green-100 hover:text-white transition-colors">
                {t("news")}
              </Link>
              <Link href="/admin" className="block text-green-100 hover:text-white transition-colors">
                Админ панель
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Контакты</h3>
            <div className="space-y-2 text-green-100">
              <a href="tel:+998977926299" className="block hover:text-white transition-colors">
                 +998 97 792 62 99
              </a>
              <a href="mailto:info@itpark.uz" className="block hover:text-white transition-colors">
                
              </a>
              <a
                href="https://maps.app.goo.gl/ECUHhBKeRNEWbH6o8"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-white transition-colors"
              >
                Богатский район, Хорезмский область, Узбекистан
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Социальные сети</h3>
            <div className="flex space-x-4">
              <button
                onClick={() => handleSocialClick("telegram")}
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="Telegram"
              >
                <MessageCircle className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleSocialClick("instagram")}
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleSocialClick("facebook")}
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleSocialClick("youtube")}
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleSocialClick("linkedin")}
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-green-500 mt-8 pt-8 text-center text-green-100">
          <p>&copy; 2025 IT PARK. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
