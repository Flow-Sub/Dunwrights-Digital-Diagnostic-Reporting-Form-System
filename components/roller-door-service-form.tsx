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
import { CheckCircle, MapPin, Wrench, Clipboard, Settings, FileText } from "lucide-react"

interface FormData {
  propertyAddress: string
  jobNumber: string
  cleaningGuides: boolean
  lubricating: boolean
  checkingClips: boolean
  clipsRequired: string
  numberOfClips: string
  testingTension: boolean
  reprofiling: string
  checkingForceMargins: boolean
  testing: boolean
  damageRepairs: string
}

export function RollerDoorServiceForm() {
  const [formData, setFormData] = useState<FormData>({
    propertyAddress: "",
    jobNumber: "",
    cleaningGuides: false,
    lubricating: false,
    checkingClips: false,
    clipsRequired: "",
    numberOfClips: "",
    testingTension: false,
    reprofiling: "",
    checkingForceMargins: false,
    testing: false,
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

    if (!formData.clipsRequired) {
      newErrors.clipsRequired = "Please specify if clips are required"
    }

    if (formData.clipsRequired === "yes" && !formData.numberOfClips.trim()) {
      newErrors.numberOfClips = "Number of clips is required when clips are needed"
    }

    if (formData.clipsRequired === "yes" && formData.numberOfClips) {
      const num = Number.parseInt(formData.numberOfClips)
      if (isNaN(num) || num <= 0) {
        newErrors.numberOfClips = "Please enter a valid positive number"
      }
    }

    if (!formData.reprofiling) {
      newErrors.reprofiling = "Please specify if reprofiling is required"
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
      cleaningGuides: false,
      lubricating: false,
      checkingClips: false,
      clipsRequired: "",
      numberOfClips: "",
      testingTension: false,
      reprofiling: "",
      checkingForceMargins: false,
      testing: false,
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
                <p className="text-gray-600 text-lg">Your roller door service form has been submitted and saved.</p>
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
              Roller Door Service Form
            </CardTitle>
          </div>
          <CardDescription className="text-lg text-gray-600">
            Complete all required fields to document the roller door service performed
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

            {/* Service Tasks */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Clipboard className="h-5 w-5 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">Service Tasks Performed</h3>
              </div>

              <div className="grid gap-4 p-6 bg-gray-50/50 rounded-xl border border-gray-100">
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                  <Checkbox
                    id="cleaningGuides"
                    checked={formData.cleaningGuides}
                    onCheckedChange={(checked) => setFormData({ ...formData, cleaningGuides: checked as boolean })}
                    className="h-5 w-5"
                  />
                  <Label htmlFor="cleaningGuides" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Cleaning guides
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                  <Checkbox
                    id="lubricating"
                    checked={formData.lubricating}
                    onCheckedChange={(checked) => setFormData({ ...formData, lubricating: checked as boolean })}
                    className="h-5 w-5"
                  />
                  <Label htmlFor="lubricating" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Lubricating
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                  <Checkbox
                    id="checkingClips"
                    checked={formData.checkingClips}
                    onCheckedChange={(checked) => setFormData({ ...formData, checkingClips: checked as boolean })}
                    className="h-5 w-5"
                  />
                  <Label htmlFor="checkingClips" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Checking clips
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                  <Checkbox
                    id="testingTension"
                    checked={formData.testingTension}
                    onCheckedChange={(checked) => setFormData({ ...formData, testingTension: checked as boolean })}
                    className="h-5 w-5"
                  />
                  <Label htmlFor="testingTension" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Testing tension and adjusting
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
                    Checking force margins and adjusting
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                  <Checkbox
                    id="testing"
                    checked={formData.testing}
                    onCheckedChange={(checked) => setFormData({ ...formData, testing: checked as boolean })}
                    className="h-5 w-5"
                  />
                  <Label htmlFor="testing" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Testing
                  </Label>
                </div>
              </div>
            </div>

            {/* Clips Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="h-5 w-5 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">Clips Assessment</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clipsRequired" className="text-sm font-medium text-gray-700">
                  Clips Required *
                </Label>
                <Select
                  value={formData.clipsRequired}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      clipsRequired: value,
                      numberOfClips: value === "no" ? "" : formData.numberOfClips,
                    })
                  }
                >
                  <SelectTrigger
                    className={`h-12 rounded-xl border-2 transition-all duration-200 ${errors.clipsRequired ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"}`}
                  >
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
                {errors.clipsRequired && (
                  <p className="text-sm text-red-500 flex items-center gap-1 mt-1">{errors.clipsRequired}</p>
                )}
              </div>

              {formData.clipsRequired === "yes" && (
                <div className="space-y-2 animate-in slide-in-from-top-2 duration-200">
                  <Label htmlFor="numberOfClips" className="text-sm font-medium text-gray-700">
                    Number of Required Clips *
                  </Label>
                  <Input
                    id="numberOfClips"
                    type="number"
                    min="1"
                    value={formData.numberOfClips}
                    onChange={(e) => setFormData({ ...formData, numberOfClips: e.target.value })}
                    placeholder="Enter number of clips"
                    className={`h-12 rounded-xl border-2 transition-all duration-200 ${errors.numberOfClips ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"}`}
                  />
                  {errors.numberOfClips && (
                    <p className="text-sm text-red-500 flex items-center gap-1 mt-1">{errors.numberOfClips}</p>
                  )}
                </div>
              )}
            </div>

            {/* Motor Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="h-5 w-5 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">Motor Assessment</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reprofiling" className="text-sm font-medium text-gray-700">
                  Reprofiling of Motor if Required *
                </Label>
                <Select
                  value={formData.reprofiling}
                  onValueChange={(value) => setFormData({ ...formData, reprofiling: value })}
                >
                  <SelectTrigger
                    className={`h-12 rounded-xl border-2 transition-all duration-200 ${errors.reprofiling ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"}`}
                  >
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
                {errors.reprofiling && (
                  <p className="text-sm text-red-500 flex items-center gap-1 mt-1">{errors.reprofiling}</p>
                )}
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
