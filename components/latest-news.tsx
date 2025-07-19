"use client"

import { useState, useEffect } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { getLatestNews } from "@/lib/firebase"
import Link from "next/link"

interface NewsItem {
  id: string
  title: Record<string, string>
  excerpt: Record<string, string>
  category: string
  date: string
  image: string
}

export function LatestNews() {
  const { language, t } = useLanguage()
  const [news, setNews] = useState<NewsItem[]>([])

  useEffect(() => {
    const fetchNews = async () => {
      const newsData = await getLatestNews(3)
      setNews(newsData)
    }
    fetchNews()

    // Refresh news every 30 seconds to show newly published news
    const interval = setInterval(fetchNews, 30000)
    return () => clearInterval(interval)
  }, [])

  if (news.length === 0) {
    return (
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-600 mb-4">{t("latestNews")}</h2>
            <p className="text-muted-foreground text-lg">{t("newsDescription")}</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Новости скоро появятся...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-600 mb-4">{t("latestNews")}</h2>
          <p className="text-muted-foreground text-lg">{t("newsDescription")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {news.map((item) => (
            <Link key={item.id} href={`/news/${item.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={
                      item.image || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop"
                    }
                    alt={item.title[language]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{item.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="text-green-600 line-clamp-2 group-hover:text-green-700 transition-colors">
                    {item.title[language]}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">{item.excerpt[language]}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/news">
            <Button variant="outline" size="lg">
              {t("viewAllNews")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
