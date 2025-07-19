"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  students: number
  rating: number
}

export default function CoursesPage() {
  const { language, t } = useLanguage()
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesData = await getCourses()
      setCourses(coursesData)
      setFilteredCourses(coursesData)
    }
    fetchCourses()
  }, [])

  useEffect(() => {
    let filtered = courses

    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description[language].toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((course) => course.category === categoryFilter)
    }

    if (levelFilter !== "all") {
      filtered = filtered.filter((course) => course.level === levelFilter)
    }

    setFilteredCourses(filtered)
  }, [courses, searchTerm, categoryFilter, levelFilter, language])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-green-600 mb-4">{t("courses")}</h1>
        <p className="text-muted-foreground text-lg">{t("coursesDescription")}</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("searchCourses")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-4">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder={t("selectCategory")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("allCategories")}</SelectItem>
              <SelectItem value="programming">{t("programming")}</SelectItem>
              <SelectItem value="design">{t("design")}</SelectItem>
              <SelectItem value="data-science">{t("dataScience")}</SelectItem>
              <SelectItem value="cybersecurity">{t("cybersecurity")}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder={t("selectLevel")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("allLevels")}</SelectItem>
              <SelectItem value="beginner">{t("beginner")}</SelectItem>
              <SelectItem value="intermediate">{t("intermediate")}</SelectItem>
              <SelectItem value="advanced">{t("advanced")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Link key={course.id} href={`/courses/${course.id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img
                  src={
                    course.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop"
                  }
                  alt={course.title[language]}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-green-600">{course.title[language]}</CardTitle>
                <CardDescription>{course.description[language]}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{course.duration}</span>
                  <span className="font-semibold text-green-600">{formatPrice(course.price)}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
