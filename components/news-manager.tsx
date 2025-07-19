"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Calendar, Upload, X } from "lucide-react"
import { getNews, addNews, updateNews, deleteNews } from "@/lib/firebase"

interface NewsItem {
  id?: string
  title: Record<string, string>
  excerpt: Record<string, string>
  content: Record<string, string>
  category: string
  date: string
  author: string
  image: string
  images: string[]
}

export function NewsManager() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [formData, setFormData] = useState<NewsItem>({
    title: { uz: "", ru: "", en: "" },
    excerpt: { uz: "", ru: "", en: "" },
    content: { uz: "", ru: "", en: "" },
    category: "",
    date: new Date().toISOString().split("T")[0],
    author: "",
    image: "",
    images: [],
  })

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    const newsData = await getNews()
    setNews(newsData)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader()
          reader.onload = (e) => {
            const result = e.target?.result as string
            if (result) {
              setUploadedImages((prev) => [...prev, result])
              setFormData((prev) => ({
                ...prev,
                images: [...prev.images, result],
                image: prev.image || result,
              }))
            }
          }
          reader.readAsDataURL(file)
        }
      })
    }
    event.target.value = ""
  }

  const removeImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index)
    setUploadedImages(newImages)
    setFormData((prev) => ({
      ...prev,
      images: newImages,
      image: newImages[0] || "",
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingNews) {
        await updateNews(editingNews.id!, formData)
      } else {
        await addNews(formData)
      }

      await fetchNews()
      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error("Error saving news:", error)
    }
  }

  const handleEdit = (newsItem: NewsItem) => {
    setEditingNews(newsItem)
    setFormData(newsItem)
    setUploadedImages(newsItem.images || [])
    setIsDialogOpen(true)
  }

  const handleDelete = async (newsId: string) => {
    if (confirm("Вы уверены, что хотите удалить эту новость?")) {
      try {
        await deleteNews(newsId)
        await fetchNews()
      } catch (error) {
        console.error("Error deleting news:", error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: { uz: "", ru: "", en: "" },
      excerpt: { uz: "", ru: "", en: "" },
      content: { uz: "", ru: "", en: "" },
      category: "",
      date: new Date().toISOString().split("T")[0],
      author: "",
      image: "",
      images: [],
    })
    setUploadedImages([])
    setEditingNews(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Управление новостями</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Добавить новость
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingNews ? "Редактировать новость" : "Добавить новую новость"}</DialogTitle>
              <DialogDescription>Заполните информацию о новости на всех языках</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload Section */}
              <div className="space-y-4">
                <Label>Изображения новости</Label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <Label htmlFor="news-image-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
                          Загрузите изображения новости
                        </span>
                        <Input
                          id="news-image-upload"
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                        <Button type="button" variant="outline" className="mt-2 bg-transparent">
                          Выбрать файлы
                        </Button>
                      </Label>
                    </div>
                  </div>
                </div>

                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {uploadedImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Заголовок (Узбекский)</Label>
                  <Input
                    value={formData.title.uz}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: { ...formData.title, uz: e.target.value },
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Заголовок (Русский)</Label>
                  <Input
                    value={formData.title.ru}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: { ...formData.title, ru: e.target.value },
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Заголовок (English)</Label>
                  <Input
                    value={formData.title.en}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: { ...formData.title, en: e.target.value },
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Краткое описание (Узбекский)</Label>
                  <Textarea
                    value={formData.excerpt.uz}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        excerpt: { ...formData.excerpt, uz: e.target.value },
                      })
                    }
                    rows={3}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Краткое описание (Русский)</Label>
                  <Textarea
                    value={formData.excerpt.ru}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        excerpt: { ...formData.excerpt, ru: e.target.value },
                      })
                    }
                    rows={3}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Краткое описание (English)</Label>
                  <Textarea
                    value={formData.excerpt.en}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        excerpt: { ...formData.excerpt, en: e.target.value },
                      })
                    }
                    rows={3}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Полный контент (Узбекский)</Label>
                  <Textarea
                    value={formData.content.uz}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        content: { ...formData.content, uz: e.target.value },
                      })
                    }
                    rows={5}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Полный контент (Русский)</Label>
                  <Textarea
                    value={formData.content.ru}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        content: { ...formData.content, ru: e.target.value },
                      })
                    }
                    rows={5}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Полный контент (English)</Label>
                  <Textarea
                    value={formData.content.en}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        content: { ...formData.content, en: e.target.value },
                      })
                    }
                    rows={5}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Категория</Label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="например: Технологии"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Дата</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Автор</Label>
                  <Input
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  {editingNews ? "Обновить" : "Добавить"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Отмена
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.map((item) => (
          <Card key={item.id}>
            <div className="aspect-video relative overflow-hidden rounded-t-lg">
              <img
                src={item.image || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop"}
                alt={item.title.ru}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-green-600 line-clamp-2">{item.title.ru}</CardTitle>
                  <CardDescription className="line-clamp-2">{item.excerpt.ru}</CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="outline" onClick={() => handleEdit(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" onClick={() => handleDelete(item.id!)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{item.category}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Автор: {item.author}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
