"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

const carouselImages = [
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
    alt: "IT Classroom",
    title: "Современные учебные классы",
  },
  {
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop",
    alt: "Programming Workshop",
    title: "Практические занятия по программированию",
  },
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    alt: "Tech Conference",
    title: "Технологические конференции",
  },
  {
    src: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=600&fit=crop",
    alt: "Student Projects",
    title: "Студенческие проекты",
  },
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
    alt: "Computer Lab",
    title: "Компьютерные лаборатории",
  },
]

export function PhotoCarousel() {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1))
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? carouselImages.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === carouselImages.length - 1 ? 0 : currentIndex + 1)
  }

  return (
    <section className="py-16 bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-600 mb-4">{t("ourFacilities")}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("facilitiesDescription")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Carousel */}
          <div className="relative">
            <div className="aspect-[4/3] relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={carouselImages[currentIndex].src || "/placeholder.svg"}
                alt={carouselImages[currentIndex].alt}
                className="w-full h-full object-cover transition-all duration-700 ease-in-out"
              />

              {/* Overlay with title */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white text-xl font-bold">{carouselImages[currentIndex].title}</h3>
              </div>

              {/* Navigation buttons */}
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 border-0 shadow-lg"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-5 w-5 text-gray-800 dark:text-white" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 border-0 shadow-lg"
                onClick={goToNext}
              >
                <ChevronRight className="h-5 w-5 text-gray-800 dark:text-white" />
              </Button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center mt-6 space-x-3">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-green-600 scale-125"
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-green-600">Наши современные возможности</h3>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                IT PARK оснащен самым современным оборудованием и технологиями для обеспечения качественного образования
                в сфере информационных технологий.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Современные компьютерные классы с новейшим оборудованием</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Лаборатории для практических занятий по программированию</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Конференц-залы для проведения семинаров и мероприятий</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Зоны для командной работы над проектами</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Высокоскоростной интернет и современное ПО</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
