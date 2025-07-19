"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Trophy, Target, Zap, MessageCircle, Instagram, Linkedin, Github } from "lucide-react"
import { getStudents } from "@/lib/firebase"

const studentAchievements = [
  {
    icon: <Star className="h-8 w-8 text-yellow-500" />,
    title: "Высокие рейтинги",
    description: "95% наших студентов получают высокие оценки",
    color: "bg-yellow-50 dark:bg-yellow-950",
  },
  {
    icon: <Trophy className="h-8 w-8 text-green-600" />,
    title: "Победители конкурсов",
    description: "Наши студенты регулярно побеждают в IT-конкурсах",
    color: "bg-green-50 dark:bg-green-950",
  },
  {
    icon: <Target className="h-8 w-8 text-blue-600" />,
    title: "Целеустремленные",
    description: "Фокус на достижении профессиональных целей",
    color: "bg-blue-50 dark:bg-blue-950",
  },
  {
    icon: <Zap className="h-8 w-8 text-purple-600" />,
    title: "Быстро обучаются",
    description: "Осваивают новые технологии в кратчайшие сроки",
    color: "bg-purple-50 dark:bg-purple-950",
  },
]

interface Student {
  id: string
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

export function SmartStudents() {
  const [students, setStudents] = useState<Student[]>([])

  useEffect(() => {
    const fetchStudents = async () => {
      const studentsData = await getStudents()
      setStudents(studentsData)
    }
    fetchStudents()

    // Refresh students every 30 seconds to show newly added students
    const interval = setInterval(fetchStudents, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleSocialClick = (url: string) => {
    if (url) {
      window.open(url, "_blank")
    }
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-background dark:to-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Наши студенты
          </Badge>
          <h2 className="text-4xl font-bold text-green-600 mb-4">Смелые, умные студенты</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Наши студенты - это будущие лидеры IT-индустрии. Они отличаются высокой мотивацией, стремлением к знаниям и
            готовностью принимать вызовы современного мира технологий.
          </p>
        </div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {studentAchievements.map((achievement, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div
                  className={`w-16 h-16 rounded-full ${achievement.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {achievement.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{achievement.title}</h3>
                <p className="text-muted-foreground text-sm">{achievement.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Student Profiles */}
        {students.length > 0 && (
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center text-green-600 mb-8">Истории успеха наших выпускников</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {students.map((student, index) => (
                <Card
                  key={student.id}
                  className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
                >
                  <div className="relative">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={
                          student.image ||
                          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" ||
                          "/placeholder.svg"
                        }
                        alt={student.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h4 className="text-xl font-bold mb-1">{student.name}</h4>
                      <Badge className="bg-green-600 text-white mb-2">{student.course}</Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{student.achievement}</p>

                    {/* Social Media Links */}
                    <div className="flex justify-center space-x-3">
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
        )}

        {/* Statistics */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-green-100">Трудоустройство выпускников</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9/5</div>
              <div className="text-green-100">Средний рейтинг студентов</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-green-100">Успешных проектов</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
