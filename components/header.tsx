"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  const navigation = [
    { name: t("home"), href: "/" },
    { name: t("courses"), href: "/courses" },
    { name: t("news"), href: "/news" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-green-600 to-green-700 dark:from-gray-800 dark:to-gray-900 backdrop-blur supports-[backdrop-filter]:bg-green-600/95 dark:supports-[backdrop-filter]:bg-gray-800/95 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-white dark:bg-gray-100 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-green-600 dark:text-gray-800 font-bold text-lg">IT</span>
            </div>
            <span className="font-bold text-xl text-white dark:text-gray-100">IT PARK</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white/90 dark:text-gray-200 hover:text-white dark:hover:text-white transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <LanguageToggle />
            <ModeToggle />

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white dark:text-gray-200 hover:bg-white/20 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20 dark:border-gray-600 py-4">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white/90 dark:text-gray-200 hover:text-white dark:hover:text-white transition-colors py-2 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
