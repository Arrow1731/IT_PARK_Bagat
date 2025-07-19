"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Upload, X, MessageCircle, Instagram, Linkedin, Github } from "lucide-react"
import { getStudents, addStudent, updateStudent, deleteStudent } from "@/lib/firebase"

interface Student {
  id?: string
  name: string
  course: string
  image: string
  achievement: string
  socials: {
    telegram?: string
    instagram?: string
    linkedin?: string
    github?: string
  }
}

export function StudentManager() {
  const [students, setStudents] = useState<Student[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string>("")
  const [formData, setFormData] = useState<Student>({
    name: "",
    course: "",
    image: "",
    achievement: "",
    socials: {
      telegram: "",
      instagram: "",
      linkedin: "",
      github: "",
    },
  })

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    const studentsData = await getStudents()
    setStudents(studentsData)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        if (result) {
          setUploadedImage(result)
          setFormData((prev) => ({
            ...prev,
            image: result,
          }))
        }
      }
      reader.readAsDataURL(file)
    }
    event.target.value = ""
  }

  const removeImage = () => {
    setUploadedImage("")
    setFormData((prev) => ({
      ...prev,
      image: "",
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingStudent) {
        await updateStudent(editingStudent.id!, formData)
      } else {
        await addStudent(formData)
      }

      await fetchStudents()
      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error("Error saving student:", error)
    }
  }

  const handleEdit = (student: Student) => {
    setEditingStudent(student)
    setFormData(student)
    setUploadedImage(student.image || "")
    setIsDialogOpen(true)
  }

  const handleDelete = async (studentId: string) => {
    if (confirm("Вы уверены, что хотите удалить этого студента?")) {
      try {
        await deleteStudent(studentId)
        await fetchStudents()
      } catch (error) {
        console.error("Error deleting student:", error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      course: "",
      image: "",
      achievement: "",
      socials: {
        telegram: "",
        instagram: "",
        linkedin: "",
        github: "",
      },
    })
    setUploadedImage("")
    setEditingStudent(null)
  }

  const handleSocialClick = (url: string) => {
    if (url) {
      window.open(url, "_blank")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Управление студентами</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Добавить студента
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingStudent ? "Редактировать студента" : "Добавить нового студента"}</DialogTitle>
              <DialogDescription>Заполните информацию о студенте</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload Section */}
              <div className="space-y-4">
                <Label>Фото студента</Label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <Label htmlFor="student-image-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
                          Загрузите фото студента
                        </span>
                        <Input
                          id="student-image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                        <Button type="button" variant="outline" className="mt-2 bg-transparent">
                          Выбрать файл
                        </Button>
                      </Label>
                    </div>
                  </div>
                </div>

                {uploadedImage && (
                  <div className="relative w-32 h-32 mx-auto">
                    <img
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Student preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-0 right-0 h-6 w-6"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Имя студента</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="например: Алишер Каримов"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Курс/Специализация</Label>
                  <Input
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    placeholder="например: Python Developer"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Достижение</Label>
                <Textarea
                  value={formData.achievement}
                  onChange={(e) => setFormData({ ...formData, achievement: e.target.value })}
                  placeholder="например: Создал AI-приложение для анализа данных"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-4">
                <Label>Социальные сети</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Telegram</Label>
                    <Input
                      value={formData.socials.telegram || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socials: { ...formData.socials, telegram: e.target.value },
                        })
                      }
                      placeholder="https://t.me/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Instagram</Label>
                    <Input
                      value={formData.socials.instagram || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socials: { ...formData.socials, instagram: e.target.value },
                        })
                      }
                      placeholder="https://instagram.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>LinkedIn</Label>
                    <Input
                      value={formData.socials.linkedin || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socials: { ...formData.socials, linkedin: e.target.value },
                        })
                      }
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>GitHub</Label>
                    <Input
                      value={formData.socials.github || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socials: { ...formData.socials, github: e.target.value },
                        })
                      }
                      placeholder="https://github.com/username"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  {editingStudent ? "Обновить" : "Добавить"}
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
        {students.map((student) => (
          <Card key={student.id} className="overflow-hidden">
            <div className="relative">
              <div className="aspect-square overflow-hidden">
                <img
                  src={
                    student.image ||
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" ||
                    "/placeholder.svg"
                  }
                  alt={student.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h4 className="text-lg font-bold mb-1">{student.name}</h4>
                <p className="text-sm opacity-90">{student.course}</p>
              </div>
            </div>

            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardDescription className="text-sm leading-relaxed">{student.achievement}</CardDescription>
                </div>
                <div className="flex gap-1 ml-2">
                  <Button size="icon" variant="outline" onClick={() => handleEdit(student)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" onClick={() => handleDelete(student.id!)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex justify-center space-x-2">
                {student.socials.telegram && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="p-2 h-auto bg-transparent"
                    onClick={() => handleSocialClick(student.socials.telegram!)}
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                )}
                {student.socials.instagram && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="p-2 h-auto bg-transparent"
                    onClick={() => handleSocialClick(student.socials.instagram!)}
                  >
                    <Instagram className="h-4 w-4" />
                  </Button>
                )}
                {student.socials.linkedin && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="p-2 h-auto bg-transparent"
                    onClick={() => handleSocialClick(student.socials.linkedin!)}
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                )}
                {student.socials.github && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="p-2 h-auto bg-transparent"
                    onClick={() => handleSocialClick(student.socials.github!)}
                  >
                    <Github className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
