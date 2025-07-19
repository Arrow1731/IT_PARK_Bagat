"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Language = "uz" | "ru" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  uz: {
    home: "Bosh sahifa",
    courses: "Kurslar",
    news: "Yangiliklar",
    heroTitle: "IT PARK - Kelajak Texnologiyalari Markazi",
    heroDescription:
      "Zamonaviy IT ta'lim va innovatsion texnologiyalar markazi. Bizning kurslarimiz orqali IT sohasida professional bo'ling.",
    exploreCourses: "Kurslarni ko'rish",
    latestNews: "So'nggi yangiliklar",
    successRate: "Muvaffaqiyat darajasi",
    students: "Talabalar",
    ourFacilities: "Bizning imkoniyatlar",
    facilitiesDescription: "Zamonaviy jihozlar va professional muhit bilan ta'minlangan o'quv xonalarimiz",
    coursesDescription: "IT sohasidagi eng so'nggi texnologiyalar bo'yicha professional kurslar",
    newsDescription: "IT PARK hayoti va texnologiya sohasidagi so'nggi yangiliklar",
    searchCourses: "Kurslarni qidirish...",
    selectCategory: "Kategoriyani tanlang",
    selectLevel: "Darajani tanlang",
    allCategories: "Barcha kategoriyalar",
    allLevels: "Barcha darajalar",
    programming: "Dasturlash",
    design: "Dizayn",
    dataScience: "Ma'lumotlar fani",
    cybersecurity: "Kiberxavfsizlik",
    beginner: "Boshlang'ich",
    intermediate: "O'rta",
    advanced: "Yuqori",
    instructor: "O'qituvchi",
    registerForCourse: "Kursga yozilish",
    courseDetails: "Kurs tafsilotlari",
    author: "Muallif",
    viewAllNews: "Barcha yangiliklarni ko'rish",
  },
  ru: {
    home: "Главная",
    courses: "Курсы",
    news: "Новости",
    heroTitle: "IT PARK - Центр Технологий Будущего",
    heroDescription:
      "Современный центр IT образования и инновационных технологий. Станьте профессионалом в IT сфере с нашими курсами.",
    exploreCourses: "Изучить курсы",
    latestNews: "Последние новости",
    successRate: "Успешность",
    students: "Студенты",
    ourFacilities: "Наши возможности",
    facilitiesDescription: "Учебные аудитории, оснащенные современным оборудованием и профессиональной средой",
    coursesDescription: "Профессиональные курсы по новейшим технологиям в IT сфере",
    newsDescription: "Последние новости из жизни IT PARK и сферы технологий",
    searchCourses: "Поиск курсов...",
    selectCategory: "Выберите категорию",
    selectLevel: "Выберите уровень",
    allCategories: "Все категории",
    allLevels: "Все уровни",
    programming: "Программирование",
    design: "Дизайн",
    dataScience: "Наука о данных",
    cybersecurity: "Кибербезопасность",
    beginner: "Начальный",
    intermediate: "Средний",
    advanced: "Продвинутый",
    instructor: "Преподаватель",
    registerForCourse: "Записаться на курс",
    courseDetails: "Детали курса",
    author: "Автор",
    viewAllNews: "Посмотреть все новости",
  },
  en: {
    home: "Home",
    courses: "Courses",
    news: "News",
    heroTitle: "IT PARK - Future Technology Center",
    heroDescription:
      "Modern IT education and innovative technology center. Become a professional in IT field with our courses.",
    exploreCourses: "Explore Courses",
    latestNews: "Latest News",
    successRate: "Success Rate",
    students: "Students",
    ourFacilities: "Our Facilities",
    facilitiesDescription: "Classrooms equipped with modern equipment and professional environment",
    coursesDescription: "Professional courses on the latest technologies in IT field",
    newsDescription: "Latest news from IT PARK life and technology sphere",
    searchCourses: "Search courses...",
    selectCategory: "Select Category",
    selectLevel: "Select Level",
    allCategories: "All Categories",
    allLevels: "All Levels",
    programming: "Programming",
    design: "Design",
    dataScience: "Data Science",
    cybersecurity: "Cybersecurity",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    instructor: "Instructor",
    registerForCourse: "Register for Course",
    courseDetails: "Course Details",
    author: "Author",
    viewAllNews: "View All News",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ru")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["uz", "ru", "en"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[Language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
