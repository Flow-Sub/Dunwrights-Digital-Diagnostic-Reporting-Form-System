"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, MapPin, Battery, Wrench, Bug, FileText } from "lucide-react"

interface FormData {
  propertyAddress: string
  jobNumber: string
  batteryTesting: string
  solarTesting: string
  lubricatingComponents: boolean
  antsNoted: boolean
  antDeterrent: boolean
  reprofiling: boolean
  checkingForceMargins: boolean
  damageRepairs: string
}

export function GateMotorServiceForm() {
  const [formData, setFormData] = useState<FormData>({
    propertyAddress: "",
    jobNumber: "",
    batteryTesting: "",
    solarTesting: "",
    lubricatingComponents: false,
    antsNoted: false,
    antDeterrent: false,
    reprofiling: false,
    checkingForceMargins: false,
    damageRepairs: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.propertyAddress.trim()) {
      newErrors.propertyAddress = "Property address is required"
    }

    if (!formData.jobNumber.trim()) {
      newErrors.jobNumber = "Job number is required"
    }

    if (!formData.batteryTesting) {
      newErrors.batteryTesting = "Battery testing result is required"
    }

    if (formData.solarTesting && formData.solarTesting.trim()) {
      const voltage = Number.parseFloat(formData.solarTesting)
      if (isNaN(voltage) || voltage < 0) {
        newErrors.solarTesting = "Please enter a valid voltage value"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Form submitted:", formData)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData({
      propertyAddress: "",
      jobNumber: "",
      batteryTesting: "",
      solarTesting: "",
      lubricatingComponents: false,
      antsNoted: false,
      antDeterrent: false,
      reprofiling: false,
      checkingForceMargins: false,
      damageRepairs: "",
    })
    setErrors({})
    setIsSubmitted(false)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 flex items-center justify-center">
        <Card className="max-w-2xl mx-auto shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-8 pb-8">
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-green-100 rounded-full blur-xl opacity-50"></div>
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto relative z-10" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Form Submitted Successfully
                </h2>
                <p className="text-gray-600 text-lg">Your gate motor service form has been submitted and saved.</p>
              </div>
              <div className="flex gap-4 justify-center pt-4">
                <Button
                  onClick={handleReset}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Submit Another Form
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.history.back()}
                  className="px-8 py-3 border-2 border-gray-200 hover:border-gray-300 rounded-xl font-medium transition-all duration-200"
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <Card className="max-w-2xl mx-auto shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-8 pt-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
              <Wrench className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Gate Motor Service Form
            </CardTitle>
          </div>
          <CardDescription className="text-lg text-gray-600">
            Complete all required fields to document the gate motor service performed
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">Basic Information</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="propertyAddress" className="text-sm font-medium text-gray-700">
                    Property Address *
                  </Label>
                  <Input
                    id="propertyAddress"
                    value={formData.propertyAddress}
                    onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                    placeholder="Enter property address"
                    className={`h-12 rounded-xl border-2 transition-all duration-200 ${errors.propertyAddress ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"}`}
                  />
                  {errors.propertyAddress && (
                    <p className="text-sm text-red-500 flex items-center gap-1 mt-1">{errors.propertyAddress}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobNumber" className="text-sm font-medium text-gray-700">
                    Job Number *
                  </Label>
                  <Input
                    id="jobNumber"
                    value={formData.jobNumber}
                    onChange={(e) => setFormData({ ...formData, jobNumber: e.target.value })}
                    placeholder="Enter job number"
                    className={`h-12 rounded-xl border-2 transition-all duration-200 ${errors.jobNumber ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"}`}
                  />
                  {errors.jobNumber && (
                    <p className="text-sm text-red-500 flex items-center gap-1 mt-1">{errors.jobNumber}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Testing Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Battery className="h-5 w-5 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">System Testing</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="batteryTesting" className="text-sm font-medium text-gray-700">
                    Testing of Batteries *
                  </Label>
                  <Select
                    value={formData.batteryTesting}
                    onValueChange={(value) => setFormData({ ...formData, batteryTesting: value })}
                  >
                    <SelectTrigger
                      className={`h-12 rounded-xl border-2 transition-all duration-200 ${errors.batteryTesting ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"}`}
                    >
                      <SelectValue placeholder="Select battery condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                      <SelectItem value="na">N/A</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.batteryTesting && (
                    <p className="text-sm text-red-500 flex items-center gap-1 mt-1">{errors.batteryTesting}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="solarTesting" className="text-sm font-medium text-gray-700">
                    Testing of Solar (Voltage)
                  </Label>
                  <Input
                    id="solarTesting"
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.solarTesting}
                    onChange={(e) => setFormData({ ...formData, solarTesting: e.target.value })}
                    placeholder="Enter voltage reading (optional)"
                    className={`h-12 rounded-xl border-2 transition-all duration-200 ${errors.solarTesting ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"}`}
                  />
                  {errors.solarTesting && (
                    <p className="text-sm text-red-500 flex items-center gap-1 mt-1">{errors.solarTesting}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Service Tasks */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Wrench className="h-5 w-5 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">Service Tasks Performed</h3>
              </div>

              <div className="grid gap-4 p-6 bg-gray-50/50 rounded-xl border border-gray-100">
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                  <Checkbox
                    id="lubricatingComponents"
                    checked={formData.lubricatingComponents}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, lubricatingComponents: checked as boolean })
                    }
                    className="h-5 w-5"
                  />
                  <Label htmlFor="lubricatingComponents" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Lubricating any components as needed
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                  <Checkbox
                    id="reprofiling"
                    checked={formData.reprofiling}
                    onCheckedChange={(checked) => setFormData({ ...formData, reprofiling: checked as boolean })}
                    className="h-5 w-5"
                  />
                  <Label htmlFor="reprofiling" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Reprofiling of motor
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                  <Checkbox
                    id="checkingForceMargins"
                    checked={formData.checkingForceMargins}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, checkingForceMargins: checked as boolean })
                    }
                    className="h-5 w-5"
                  />
                  <Label htmlFor="checkingForceMargins" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Checking force margins and testing
                  </Label>
                </div>
              </div>
            </div>

            {/* Pest Control Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Bug className="h-5 w-5 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">Pest Control Assessment</h3>
              </div>

              <div className="grid gap-4 p-6 bg-gray-50/50 rounded-xl border border-gray-100">
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                  <Checkbox
                    id="antsNoted"
                    checked={formData.antsNoted}
                    onCheckedChange={(checked) => setFormData({ ...formData, antsNoted: checked as boolean })}
                    className="h-5 w-5"
                  />
                  <Label htmlFor="antsNoted" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Ants noted in motor
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                  <Checkbox
                    id="antDeterrent"
                    checked={formData.antDeterrent}
                    onCheckedChange={(checked) => setFormData({ ...formData, antDeterrent: checked as boolean })}
                    className="h-5 w-5"
                  />
                  <Label htmlFor="antDeterrent" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Leaving ant deterrent within the motor
                  </Label>
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">Additional Notes</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="damageRepairs" className="text-sm font-medium text-gray-700">
                  Any Noted Damage or Repairs Required
                </Label>
                <Textarea
                  id="damageRepairs"
                  value={formData.damageRepairs}
                  onChange={(e) => setFormData({ ...formData, damageRepairs: e.target.value })}
                  placeholder="Describe any damage found or repairs needed..."
                  rows={4}
                  className="rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-all duration-200 resize-none"
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isSubmitting ? "Submitting..." : "Submit Form"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="h-12 px-8 border-2 border-gray-200 hover:border-gray-300 rounded-xl font-medium transition-all duration-200 bg-transparent"
              >
                Reset Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
