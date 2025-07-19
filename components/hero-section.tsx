"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Users, Award } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Link from "next/link"

export function HeroSection() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getHeroImage = () => {
    if (!mounted) return "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=500&fit=crop"

    return theme === "dark"
      ? "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=500&fit=crop" // Dark tech image
      : "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=500&fit=crop" // Light classroom image
  }

  return (
    <section className="relative py-20 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-green-600 leading-tight">{t("heroTitle")}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{t("heroDescription")}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/courses">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  {t("exploreCourses")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/news">
                <Button size="lg" variant="outline">
                  {t("latestNews")}
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Code className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">50+</div>
                <div className="text-sm text-muted-foreground">{t("courses")}</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">1000+</div>
                <div className="text-sm text-muted-foreground">{t("students")}</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">95%</div>
                <div className="text-sm text-muted-foreground">{t("successRate")}</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src={getHeroImage() || "/placeholder.svg"}
              alt="IT PARK"
              className="rounded-lg shadow-2xl transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
