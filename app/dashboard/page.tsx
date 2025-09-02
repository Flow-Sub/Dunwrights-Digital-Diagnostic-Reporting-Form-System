"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Settings, Wrench, LogOut, User, Clock, ChevronRight } from "lucide-react"

export default function DashboardPage() {
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

  const handleLogout = () => {
    localStorage.removeItem("dunwrights_auth")
    router.push("/")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <header className="border-b border-border/40 bg-card/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                <Settings className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  Dunwrights
                </h1>
                <p className="text-sm text-muted-foreground">Digital Diagnostic System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>Technician Portal</span>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="rounded-xl hover:bg-destructive hover:text-destructive-foreground transition-colors bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Service Forms Dashboard</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Select a diagnostic form to complete your service report. All forms are optimized for mobile and desktop
            use.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <Card
            className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/20 bg-gradient-to-br from-card to-card/50 hover:scale-[1.02] transform"
            onClick={() => router.push("/forms/roller-door")}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Settings className="h-6 w-6 text-white" />
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">Roller Door Service</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Complete diagnostic and maintenance form for roller door systems with comprehensive testing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg">
                Start Form
              </Button>
            </CardContent>
          </Card>

          <Card
            className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/20 bg-gradient-to-br from-card to-card/50 hover:scale-[1.02] transform"
            onClick={() => router.push("/forms/gate-motor-diagnostic")}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">
                Gate Motor Diagnostic
              </CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Advanced diagnostic service form with digital signature capability for comprehensive reporting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg">
                Start Form
              </Button>
            </CardContent>
          </Card>

          <Card
            className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/20 bg-gradient-to-br from-card to-card/50 hover:scale-[1.02] transform md:col-span-2 lg:col-span-1"
            onClick={() => router.push("/forms/gate-motor-service")}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Wrench className="h-6 w-6 text-white" />
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">Gate Motor Service</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Standard service and maintenance form for gate motor systems with testing protocols
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg">
                Start Form
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-2xl bg-card/50 border border-border/40">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Quick & Efficient</h3>
            <p className="text-sm text-muted-foreground">Streamlined forms designed for fast completion in the field</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-card/50 border border-border/40">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Digital Signatures</h3>
            <p className="text-sm text-muted-foreground">Capture client signatures directly on your device</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-card/50 border border-border/40">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Settings className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Comprehensive</h3>
            <p className="text-sm text-muted-foreground">Complete diagnostic and service documentation</p>
          </div>
        </div>
      </main>
    </div>
  )
}
