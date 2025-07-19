import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAG4Gq5-Ls1t-EnUC0SZsqO32WPy1bbx0s",
  authDomain: "itparkbagat-dc9cf.firebaseapp.com",
  projectId: "itparkbagat-dc9cf",
  storageBucket: "itparkbagat-dc9cf.firebasestorage.app",
  messagingSenderId: "576931496779",
  appId: "1:576931496779:web:66da053d4a18d474c19ece",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Persistent storage using localStorage
const STORAGE_KEYS = {
  COURSES: "itpark_courses",
  NEWS: "itpark_news",
  STUDENTS: "itpark_students",
}

// Initialize default data
const defaultCourses = [
  {
    id: "1",
    title: { uz: "Python dasturlash", ru: "Программирование Python", en: "Python Programming" },
    description: { uz: "Python tilini o'rganish", ru: "Изучение языка Python", en: "Learn Python language" },
    fullDescription: {
      uz: "To'liq Python kursi",
      ru: "Полный курс Python с практическими проектами",
      en: "Complete Python course with practical projects",
    },
    category: "programming",
    duration: "3 месяца",
    level: "beginner",
    price: 2000000,
    instructor: "Алексей Петров",
    telegramBot: "https://t.me/itpark_python_bot",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
    ],
    students: 250,
    rating: 4.8,
  },
  {
    id: "2",
    title: { uz: "Web dizayn", ru: "Веб-дизайн", en: "Web Design" },
    description: { uz: "Zamonaviy web dizayn", ru: "Современный веб-дизайн", en: "Modern web design" },
    fullDescription: {
      uz: "To'liq web dizayn kursi",
      ru: "Полный курс веб-дизайна с изучением Figma и Adobe XD",
      en: "Complete web design course with Figma and Adobe XD",
    },
    category: "design",
    duration: "4 месяца",
    level: "intermediate",
    price: 2500000,
    instructor: "Мария Иванова",
    telegramBot: "https://t.me/itpark_design_bot",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=300&fit=crop",
    ],
    students: 180,
    rating: 4.9,
  },
  {
    id: "3",
    title: { uz: "JavaScript dasturlash", ru: "Программирование JavaScript", en: "JavaScript Programming" },
    description: { uz: "JavaScript tilini o'rganish", ru: "Изучение JavaScript", en: "Learn JavaScript" },
    fullDescription: {
      uz: "To'liq JavaScript kursi",
      ru: "Полный курс JavaScript от основ до React",
      en: "Complete JavaScript course from basics to React",
    },
    category: "programming",
    duration: "5 месяцев",
    level: "intermediate",
    price: 3000000,
    instructor: "Дмитрий Сидоров",
    telegramBot: "https://t.me/itpark_js_bot",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=300&fit=crop",
    ],
    students: 320,
    rating: 4.7,
  },
]

const defaultNews = [
  {
    id: "1",
    title: { uz: "IT PARK yangi kurs", ru: "Новый курс по искусственному интеллекту", en: "New AI course launched" },
    excerpt: {
      uz: "Yangi kurs haqida",
      ru: "IT PARK запускает новый курс по машинному обучению",
      en: "IT PARK launches new machine learning course",
    },
    content: {
      uz: "To'liq ma'lumot",
      ru: "Подробная информация о новом курсе по ИИ с практическими проектами",
      en: "Detailed information about new AI course with practical projects",
    },
    category: "Образование",
    date: "2025-01-15",
    author: "IT PARK Team",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop",
    ],
  },
  {
    id: "2",
    title: { uz: "Texnologiya yangiliklari", ru: "Технологические новости 2025", en: "Technology news 2025" },
    excerpt: {
      uz: "2025 yil texnologiyalari",
      ru: "Обзор главных технологических трендов 2025 года",
      en: "Overview of main technology trends 2025",
    },
    content: {
      uz: "2025 yil texnologiyalari haqida",
      ru: "Детальный обзор технологических новинок и трендов",
      en: "Detailed overview of technology innovations and trends",
    },
    category: "Технологии",
    date: "2025-01-10",
    author: "Анна Козлова",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1451187580459-43490279c09f?w=400&h=300&fit=crop",
    ],
  },
  {
    id: "3",
    title: { uz: "Talabalar muvaffaqiyati", ru: "Успехи наших студентов", en: "Our students' success" },
    excerpt: {
      uz: "Talabalarning yutuqlari",
      ru: "Наши выпускники получили работу в крупных IT компаниях",
      en: "Our graduates got jobs in major IT companies",
    },
    content: {
      uz: "Talabalar muvaffaqiyati haqida",
      ru: "Истории успеха выпускников IT PARK",
      en: "Success stories of IT PARK graduates",
    },
    category: "Достижения",
    date: "2025-01-05",
    author: "Карьерный центр",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
    ],
  },
]

const defaultStudents = [
  {
    id: "1",
    name: "Алишер Каримов",
    course: "Python Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    achievement: "Создал AI-приложение для анализа данных",
    socials: {
      telegram: "https://t.me/alisher_dev",
      instagram: "https://instagram.com/alisher.dev",
      linkedin: "https://linkedin.com/in/alisher-karimov",
      github: "https://github.com/alisherdev",
    },
  },
  {
    id: "2",
    name: "Дилноза Рахимова",
    course: "UI/UX Designer",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    achievement: "Победитель конкурса дизайна мобильных приложений",
    socials: {
      telegram: "https://t.me/dilnoza_design",
      instagram: "https://instagram.com/dilnoza.design",
      linkedin: "https://linkedin.com/in/dilnoza-rakhimova",
    },
  },
  {
    id: "3",
    name: "Бахтиёр Усманов",
    course: "Full Stack Developer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    achievement: "Разработал e-commerce платформу с 10K+ пользователей",
    socials: {
      telegram: "https://t.me/bakhtiyor_dev",
      linkedin: "https://linkedin.com/in/bakhtiyor-usmanov",
      github: "https://github.com/bakhtiyordev",
    },
  },
  {
    id: "4",
    name: "Нигора Абдуллаева",
    course: "Data Scientist",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    achievement: "Создала ML модель для прогнозирования продаж",
    socials: {
      telegram: "https://t.me/nigora_data",
      instagram: "https://instagram.com/nigora.data",
      linkedin: "https://linkedin.com/in/nigora-abdullaeva",
    },
  },
  {
    id: "5",
    name: "Жасур Турсунов",
    course: "Mobile Developer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    achievement: "Приложение в топ-10 App Store Узбекистана",
    socials: {
      telegram: "https://t.me/jasur_mobile",
      instagram: "https://instagram.com/jasur.mobile",
      github: "https://github.com/jasurdev",
    },
  },
  {
    id: "6",
    name: "Мадина Исмаилова",
    course: "Frontend Developer",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face",
    achievement: "Ведущий разработчик в международной IT компании",
    socials: {
      telegram: "https://t.me/madina_frontend",
      instagram: "https://instagram.com/madina.frontend",
      linkedin: "https://linkedin.com/in/madina-ismailova",
    },
  },
]

// Storage helper functions
const getFromStorage = (key: string, defaultValue: any[]) => {
  if (typeof window === "undefined") return defaultValue
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : defaultValue
  } catch (error) {
    console.error(`Error reading from localStorage for key ${key}:`, error)
    return defaultValue
  }
}

const saveToStorage = (key: string, data: any[]) => {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error(`Error saving to localStorage for key ${key}:`, error)
  }
}

// Helper function to format price in UZS
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("uz-UZ", {
    style: "currency",
    currency: "UZS",
    minimumFractionDigits: 0,
  })
    .format(price)
    .replace("UZS", "сум")
}

// Courses
export const getCourses = async () => {
  try {
    return getFromStorage(STORAGE_KEYS.COURSES, defaultCourses)
  } catch (error) {
    console.error("Error fetching courses:", error)
    return defaultCourses
  }
}

export const getCourseById = async (id: string) => {
  try {
    const courses = getFromStorage(STORAGE_KEYS.COURSES, defaultCourses)
    return courses.find((course: any) => course.id === id) || null
  } catch (error) {
    console.error("Error fetching course:", error)
    return null
  }
}

export const addCourse = async (courseData: any) => {
  try {
    const courses = getFromStorage(STORAGE_KEYS.COURSES, defaultCourses)
    const newCourse = {
      ...courseData,
      id: Date.now().toString(),
      students: Math.floor(Math.random() * 100) + 50,
      rating: (Math.random() * 1 + 4).toFixed(1),
    }
    courses.push(newCourse)
    saveToStorage(STORAGE_KEYS.COURSES, courses)
    console.log("Course added successfully:", newCourse)
    return newCourse
  } catch (error) {
    console.error("Error adding course:", error)
    throw error
  }
}

export const updateCourse = async (id: string, courseData: any) => {
  try {
    const courses = getFromStorage(STORAGE_KEYS.COURSES, defaultCourses)
    const index = courses.findIndex((course: any) => course.id === id)
    if (index !== -1) {
      courses[index] = { ...courses[index], ...courseData }
      saveToStorage(STORAGE_KEYS.COURSES, courses)
      console.log("Course updated successfully:", courses[index])
      return courses[index]
    }
    throw new Error("Course not found")
  } catch (error) {
    console.error("Error updating course:", error)
    throw error
  }
}

export const deleteCourse = async (id: string) => {
  try {
    const courses = getFromStorage(STORAGE_KEYS.COURSES, defaultCourses)
    const index = courses.findIndex((course: any) => course.id === id)
    if (index !== -1) {
      const deletedCourse = courses.splice(index, 1)[0]
      saveToStorage(STORAGE_KEYS.COURSES, courses)
      console.log("Course deleted successfully:", deletedCourse)
      return deletedCourse
    }
    throw new Error("Course not found")
  } catch (error) {
    console.error("Error deleting course:", error)
    throw error
  }
}

// News
export const getNews = async () => {
  try {
    const news = getFromStorage(STORAGE_KEYS.NEWS, defaultNews)
    return news.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error("Error fetching news:", error)
    return defaultNews
  }
}

export const getLatestNews = async (limitCount = 3) => {
  try {
    const news = getFromStorage(STORAGE_KEYS.NEWS, defaultNews)
    const sortedNews = news.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    return sortedNews.slice(0, limitCount)
  } catch (error) {
    console.error("Error fetching latest news:", error)
    return defaultNews.slice(0, limitCount)
  }
}

export const getNewsById = async (id: string) => {
  try {
    const news = getFromStorage(STORAGE_KEYS.NEWS, defaultNews)
    return news.find((item: any) => item.id === id) || null
  } catch (error) {
    console.error("Error fetching news:", error)
    return null
  }
}

export const addNews = async (newsData: any) => {
  try {
    const news = getFromStorage(STORAGE_KEYS.NEWS, defaultNews)
    const newNews = {
      ...newsData,
      id: Date.now().toString(),
    }
    news.unshift(newNews)
    saveToStorage(STORAGE_KEYS.NEWS, news)
    console.log("News added successfully:", newNews)
    return newNews
  } catch (error) {
    console.error("Error adding news:", error)
    throw error
  }
}

export const updateNews = async (id: string, newsData: any) => {
  try {
    const news = getFromStorage(STORAGE_KEYS.NEWS, defaultNews)
    const index = news.findIndex((item: any) => item.id === id)
    if (index !== -1) {
      news[index] = { ...news[index], ...newsData }
      saveToStorage(STORAGE_KEYS.NEWS, news)
      console.log("News updated successfully:", news[index])
      return news[index]
    }
    throw new Error("News not found")
  } catch (error) {
    console.error("Error updating news:", error)
    throw error
  }
}

export const deleteNews = async (id: string) => {
  try {
    const news = getFromStorage(STORAGE_KEYS.NEWS, defaultNews)
    const index = news.findIndex((item: any) => item.id === id)
    if (index !== -1) {
      const deletedNews = news.splice(index, 1)[0]
      saveToStorage(STORAGE_KEYS.NEWS, news)
      console.log("News deleted successfully:", deletedNews)
      return deletedNews
    }
    throw new Error("News not found")
  } catch (error) {
    console.error("Error deleting news:", error)
    throw error
  }
}

// Students
export const getStudents = async () => {
  try {
    return getFromStorage(STORAGE_KEYS.STUDENTS, defaultStudents)
  } catch (error) {
    console.error("Error fetching students:", error)
    return defaultStudents
  }
}

export const getStudentById = async (id: string) => {
  try {
    const students = getFromStorage(STORAGE_KEYS.STUDENTS, defaultStudents)
    return students.find((student: any) => student.id === id) || null
  } catch (error) {
    console.error("Error fetching student:", error)
    return null
  }
}

export const addStudent = async (studentData: any) => {
  try {
    const students = getFromStorage(STORAGE_KEYS.STUDENTS, defaultStudents)
    const newStudent = {
      ...studentData,
      id: Date.now().toString(),
    }
    students.push(newStudent)
    saveToStorage(STORAGE_KEYS.STUDENTS, students)
    console.log("Student added successfully:", newStudent)
    return newStudent
  } catch (error) {
    console.error("Error adding student:", error)
    throw error
  }
}

export const updateStudent = async (id: string, studentData: any) => {
  try {
    const students = getFromStorage(STORAGE_KEYS.STUDENTS, defaultStudents)
    const index = students.findIndex((student: any) => student.id === id)
    if (index !== -1) {
      students[index] = { ...students[index], ...studentData }
      saveToStorage(STORAGE_KEYS.STUDENTS, students)
      console.log("Student updated successfully:", students[index])
      return students[index]
    }
    throw new Error("Student not found")
  } catch (error) {
    console.error("Error updating student:", error)
    throw error
  }
}

export const deleteStudent = async (id: string) => {
  try {
    const students = getFromStorage(STORAGE_KEYS.STUDENTS, defaultStudents)
    const index = students.findIndex((student: any) => student.id === id)
    if (index !== -1) {
      const deletedStudent = students.splice(index, 1)[0]
      saveToStorage(STORAGE_KEYS.STUDENTS, students)
      console.log("Student deleted successfully:", deletedStudent)
      return deletedStudent
    }
    throw new Error("Student not found")
  } catch (error) {
    console.error("Error deleting student:", error)
    throw error
  }
}
