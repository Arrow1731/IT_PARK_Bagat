"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { getNews } from "@/lib/firebase"
import Link from "next/link"

interface NewsItem {
  id: string
  title: Record<string, string>
  excerpt: Record<string, string>
  category: string
  date: string
  image: string
  author: string
}

export default function NewsPage() {
  const { language, t } = useLanguage()
  const [news, setNews] = useState<NewsItem[]>([])

  useEffect(() => {
    const fetchNews = async () => {
      const newsData = await getNews()
      setNews(newsData)
    }
    fetchNews()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-green-600 mb-4">{t("news")}</h1>
        <p className="text-muted-foreground text-lg">{t("newsDescription")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <Link key={item.id} href={`/news/${item.id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img
                  src={item.image || "/placeholder.svg?height=200&width=300&query=tech news"}
                  alt={item.title[language]}
                  className="w-full h-full object-cover"
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
                <CardTitle className="text-green-600 line-clamp-2">{item.title[language]}</CardTitle>
                <CardDescription className="line-clamp-3">{item.excerpt[language]}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t("author")}: {item.author}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
