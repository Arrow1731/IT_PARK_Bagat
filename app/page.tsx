import { HeroSection } from "@/components/hero-section"
import { PhotoCarousel } from "@/components/photo-carousel"
import { LatestNews } from "@/components/latest-news"
import { PopularCourses } from "@/components/popular-courses"
import { SmartStudents } from "@/components/smart-students"

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <PhotoCarousel />
      <LatestNews />
      <PopularCourses />
      <SmartStudents />
    </div>
  )
}
