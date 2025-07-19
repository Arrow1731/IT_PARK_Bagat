"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Upload, X } from "lucide-react"
import { getCourses, addCourse, updateCourse, deleteCourse, formatPrice } from "@/lib/firebase"

interface Course {
  id?: string
  title: Record<string, string>
  description: Record<string, string>
  fullDescription: Record<string, string>
  category: string
  duration: string
  level: string
  price: number
  instructor: string
  telegramBot: string
  image: string
  images: string[]
}

export function CourseManager() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [formData, setFormData] = useState<Course>({
    title: { uz: "", ru: "", en: "" },
    description: { uz: "", ru: "", en: "" },
    fullDescription: { uz: "", ru: "", en: "" },
    category: "",
    duration: "",
    level: "",
    price: 0,
    instructor: "",
    telegramBot: "",
    image: "",
    images: [],
  })

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    const coursesData = await getCourses()
    setCourses(coursesData)
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
      if (editingCourse) {
        await updateCourse(editingCourse.id!, formData)
      } else {
        await addCourse(formData)
      }

      await fetchCourses()
      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error("Error saving course:", error)
    }
  }

  const handleEdit = (course: Course) => {
    setEditingCourse(course)
    setFormData(course)
    setUploadedImages(course.images || [])
    setIsDialogOpen(true)
  }

  const handleDelete = async (courseId: string) => {
    if (confirm("Вы уверены, что хотите удалить этот курс?")) {
      try {
        await deleteCourse(courseId)
        await fetchCourses()
      } catch (error) {
        console.error("Error deleting course:", error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: { uz: "", ru: "", en: "" },
      description: { uz: "", ru: "", en: "" },
      fullDescription: { uz: "", ru: "", en: "" },
      category: "",
      duration: "",
      level: "",
      price: 0,
      instructor: "",
      telegramBot: "",
      image: "",
      images: [],
    })
    setUploadedImages([])
    setEditingCourse(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Управление курсами</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Добавить курс
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingCourse ? "Редактировать курс" : "Добавить новый курс"}</DialogTitle>
              <DialogDescription>Заполните информацию о курсе на всех языках</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload Section */}
              <div className="space-y-4">
                <Label>Изображения курса</Label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <Label htmlFor="image-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
                          Загрузите изображения курса
                        </span>
                        <Input
                          id="image-upload"
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
                  <Label>Название (Узбекский)</Label>
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
                  <Label>Название (Русский)</Label>
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
                  <Label>Название (English)</Label>
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
                  <Label>Описание (Узбекский)</Label>
                  <Textarea
                    value={formData.description.uz}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: { ...formData.description, uz: e.target.value },
                      })
                    }
                    rows={3}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Описание (Русский)</Label>
                  <Textarea
                    value={formData.description.ru}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: { ...formData.description, ru: e.target.value },
                      })
                    }
                    rows={3}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Описание (English)</Label>
                  <Textarea
                    value={formData.description.en}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: { ...formData.description, en: e.target.value },
                      })
                    }
                    rows={3}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Полное описание (Узбекский)</Label>
                  <Textarea
                    value={formData.fullDescription.uz}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fullDescription: { ...formData.fullDescription, uz: e.target.value },
                      })
                    }
                    rows={4}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Полное описание (Русский)</Label>
                  <Textarea
                    value={formData.fullDescription.ru}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fullDescription: { ...formData.fullDescription, ru: e.target.value },
                      })
                    }
                    rows={4}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Полное описание (English)</Label>
                  <Textarea
                    value={formData.fullDescription.en}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fullDescription: { ...formData.fullDescription, en: e.target.value },
                      })
                    }
                    rows={4}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Категория</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="programming">Программирование</SelectItem>
                      <SelectItem value="design">Дизайн</SelectItem>
                      <SelectItem value="data-science">Наука о данных</SelectItem>
                      <SelectItem value="cybersecurity">Кибербезопасность</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Уровень</Label>
                  <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите уровень" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Начальный</SelectItem>
                      <SelectItem value="intermediate">Средний</SelectItem>
                      <SelectItem value="advanced">Продвинутый</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Длительность</Label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="например: 3 месяца"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Цена (сум)</Label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    placeholder="например: 2000000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Преподаватель</Label>
                  <Input
                    value={formData.instructor}
                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Telegram Bot URL</Label>
                <Input
                  value={formData.telegramBot}
                  onChange={(e) => setFormData({ ...formData, telegramBot: e.target.value })}
                  placeholder="https://t.me/your_bot"
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  {editingCourse ? "Обновить" : "Добавить"}
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
        {courses.map((course) => (
          <Card key={course.id}>
            <div className="aspect-video relative overflow-hidden rounded-t-lg">
              <img
                src={
                  course.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop"
                }
                alt={course.title.ru}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-green-600">{course.title.ru}</CardTitle>
                  <CardDescription>{course.description.ru}</CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="outline" onClick={() => handleEdit(course)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" onClick={() => handleDelete(course.id!)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Badge variant="secondary">{course.category}</Badge>
                  <Badge variant="outline">{course.level}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Длительность: {course.duration} | Цена: {formatPrice(course.price)}
                </p>
                <p className="text-sm text-muted-foreground">Преподаватель: {course.instructor}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
