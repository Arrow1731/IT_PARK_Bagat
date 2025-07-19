"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, ExternalLink } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { getCourseById, formatPrice } from "@/lib/firebase"

interface Course {
  id: string
  title: Record<string, string>
  description: Record<string, string>
  fullDescription: Record<string, string>
  category: string
  duration: string
  level: string
  images: string[]
  price: number
  instructor: string
  students: number
  rating: number
  telegramBot: string
}

export default function CourseDetailPage() {
  const params = useParams()
  const { language, t } = useLanguage()
  const [course, setCourse] = useState<Course | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const fetchCourse = async () => {
      if (params.id) {
        const courseData = await getCourseById(params.id as string)
        setCourse(courseData)
      }
    }
    fetchCourse()
  }, [params.id])

  const handleRegister = () => {
    if (course?.telegramBot) {
      window.open(course.telegramBot, "_blank")
    }
  }

  if (!course) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Course Images */}
        <div className="space-y-4">
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <img
              src={
                course.images?.[currentImageIndex] ||
                course.image ||
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop"
              }
              alt={course.title[language]}
              className="w-full h-full object-cover"
            />
          </div>
          {course.images && course.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {course.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    currentImageIndex === index ? "border-green-500" : "border-transparent"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Course image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Course Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">
              {course.category}
            </Badge>
            <h1 className="text-3xl font-bold text-green-600 mb-4">{course.title[language]}</h1>
            <p className="text-lg text-muted-foreground">{course.description[language]}</p>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>
                {course.students} {t("students")}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{course.rating}</span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-green-600">{formatPrice(course.price)}</CardTitle>
              <CardDescription>
                {t("instructor")}: {course.instructor}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleRegister} className="w-full bg-green-600 hover:bg-green-700">
                <ExternalLink className="mr-2 h-4 w-4" />
                {t("registerForCourse")}
              </Button>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-xl font-semibold mb-3">{t("courseDetails")}</h2>
            <p className="text-muted-foreground leading-relaxed">{course.fullDescription[language]}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
