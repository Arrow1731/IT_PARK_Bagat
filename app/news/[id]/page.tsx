"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Calendar, User } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { getNewsById } from "@/lib/firebase"

interface NewsItem {
  id: string
  title: Record<string, string>
  content: Record<string, string>
  category: string
  date: string
  images: string[]
  author: string
}

export default function NewsDetailPage() {
  const params = useParams()
  const { language, t } = useLanguage()
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      if (params.id) {
        const newsData = await getNewsById(params.id as string)
        setNewsItem(newsData)
      }
    }
    fetchNews()
  }, [params.id])

  if (!newsItem) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <article className="space-y-6">
        <header className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Badge variant="outline">{newsItem.category}</Badge>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(newsItem.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {newsItem.author}
            </div>
          </div>
          <h1 className="text-4xl font-bold text-green-600">{newsItem.title[language]}</h1>
        </header>

        {newsItem.images && newsItem.images.length > 0 && (
          <div className="space-y-4">
            <img
              src={newsItem.images[0] || "/placeholder.svg"}
              alt={newsItem.title[language]}
              className="w-full aspect-video object-cover rounded-lg"
            />
            {newsItem.images.length > 1 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {newsItem.images.slice(1).map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`News image ${index + 2}`}
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: newsItem.content[language] }} />
        </div>
      </article>
    </div>
  )
}
