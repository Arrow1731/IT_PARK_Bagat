"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Clock, ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { getCourses, formatPrice } from "@/lib/firebase"
import Link from "next/link"

interface Course {
  id: string
  title: Record<string, string>
  description: Record<string, string>
  category: string
  duration: string
  level: string
  image: string
  price: number
  instructor: string
  students: number
  rating: number
}

export function PopularCourses() {
  const { language, t } = useLanguage()
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesData = await getCourses()
      // Sort by students count and take top 3
      const popularCourses = coursesData.sort((a, b) => (b.students || 0) - (a.students || 0)).slice(0, 3)
      setCourses(popularCourses)
    }
    fetchCourses()
  }, [])

  return (
    <section className="py-16 bg-gradient-to-b from-white to-green-50 dark:from-background dark:to-green-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-600 mb-4">Популярные курсы</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Самые востребованные курсы с высокими рейтингами и большим количеством студентов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {courses.map((course) => (
            <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img
                  src={
                    course.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop"
                  }
                  alt={course.title[language]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-600 text-white">Популярный</Badge>
                </div>
              </div>

              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {course.category}
                  </Badge>
                  <span className="text-2xl font-bold text-green-600">{formatPrice(course.price)}</span>
                </div>
                <CardTitle className="text-xl group-hover:text-green-600 transition-colors">
                  {course.title[language]}
                </CardTitle>
                <CardDescription className="text-base">{course.description[language]}</CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students} студентов
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">
                    Преподаватель: <span className="font-medium">{course.instructor}</span>
                  </p>
                </div>

                <Link href={`/courses/${course.id}`}>
                  <Button className="w-full bg-green-600 hover:bg-green-700 group">
                    Подробнее о курсе
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/courses">
            <Button
              variant="outline"
              size="lg"
              className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white bg-transparent"
            >
              Посмотреть все курсы
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
