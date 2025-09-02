"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { RollerDoorServiceForm } from "@/components/roller-door-service-form"

export default function RollerDoorServicePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("dunwrights_auth")
    if (!auth) {
      router.push("/")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dunwrights</h1>
            <p className="text-sm text-muted-foreground">Roller Door Service Form</p>
          </div>
          <button onClick={() => router.push("/dashboard")} className="text-primary hover:text-primary/80 font-medium">
            ← Back to Dashboard
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <RollerDoorServiceForm />
      </main>
    </div>
  )
}
