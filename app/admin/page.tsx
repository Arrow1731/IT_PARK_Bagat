"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminLogin } from "@/components/admin-login"
import { CourseManager } from "@/components/course-manager"
import { NewsManager } from "@/components/news-manager"
import { StudentManager } from "@/components/student-manager"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const authStatus = localStorage.getItem("adminAuth")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (success: boolean) => {
    setIsAuthenticated(success)
    if (success) {
      localStorage.setItem("adminAuth", "true")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("adminAuth")
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-green-600">Админ панель</h1>
        <Button onClick={handleLogout} variant="outline">
          Выйти
        </Button>
      </div>

      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses">Управление курсами</TabsTrigger>
          <TabsTrigger value="news">Управление новостями</TabsTrigger>
          <TabsTrigger value="students">Управление студентами</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <CourseManager />
        </TabsContent>

        <TabsContent value="news">
          <NewsManager />
        </TabsContent>

        <TabsContent value="students">
          <StudentManager />
        </TabsContent>
      </Tabs>
    </div>
  )
}
