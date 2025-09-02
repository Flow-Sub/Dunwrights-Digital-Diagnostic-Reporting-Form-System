"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, User, MapPin, Settings, FileText, PenTool } from "lucide-react"
import { SignaturePad } from "@/components/signature-pad"

interface FormData {
  technicianName: string
  date: string
  clientName: string
  clientAddress: string
  clientContact: string
  motorType: string
  faultDescription: string
  diagnosticSteps: string
  partsReplaced: string
  serviceOutcome: string
  signature: string
}

export function GateMotorDiagnosticForm() {
  const [formData, setFormData] = useState<FormData>({
    technicianName: "",
    date: new Date().toISOString().split("T")[0],
    clientName: "",
    clientAddress: "",
    clientContact: "",
    motorType: "",
    faultDescription: "",
    diagnosticSteps: "",
    partsReplaced: "",
    serviceOutcome: "",
    signature: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.technicianName.trim()) {
      newErrors.technicianName = "Technician name is required"
    }

    if (!formData.date) {
      newErrors.date = "Date is required"
    }

    if (!formData.clientName.trim()) {
      newErrors.clientName = "Client name is required"
    }

    if (!formData.clientAddress.trim()) {
      newErrors.clientAddress = "Client address is required"
    }

    if (formData.clientContact && !/^[\d\s\-+$$$$]+$/.test(formData.clientContact)) {
      newErrors.clientContact = "Please enter a valid phone number"
    }

    if (!formData.faultDescription.trim()) {
      newErrors.faultDescription = "Fault description is required"
    }

    if (!formData.signature) {
      newErrors.signature = "Technician signature is required"
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
      technicianName: "",
      date: new Date().toISOString().split("T")[0],
      clientName: "",
      clientAddress: "",
      clientContact: "",
      motorType: "",
      faultDescription: "",
      diagnosticSteps: "",
      partsReplaced: "",
      serviceOutcome: "",
      signature: "",
    })
    setErrors({})
    setIsSubmitted(false)
  }

  const handleSignatureChange = (signature: string) => {
    setFormData({ ...formData, signature })
    if (errors.signature) {
      setErrors({ ...errors, signature: "" })
    }
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
                <p className="text-gray-600 text-lg">Your gate motor diagnostic form has been submitted and saved.</p>
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
              <Settings className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Gate Motor Diagnostic Service Form
            </CardTitle>
          </div>
          <CardDescription className="text-lg text-gray-600">
            Complete diagnostic information and provide digital signature
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Technician Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">Technician Information</h3>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="technicianName" className="text-sm font-medium text-gray-700">
                    Technician Name *
                  </Label>
                  <Select
                    value={formData.technicianName}
                    onValueChange={(value) => setFormData({ ...formData, technicianName: value })}
                  >
                    <SelectTrigger
                      className={`h-12 rounded-xl border-2 transition-all duration-200 ${errors.technicianName ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"}`}
                    >
                      <SelectValue placeholder="Select technician" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="John Smith">John Smith</SelectItem>
                      <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                      <SelectItem value="Mike Wilson">Mike Wilson</SelectItem>
                      <SelectItem value="Lisa Brown">Lisa Brown</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.technicianName && (
                    <p className="text-sm text-red-500 flex items-center gap-1 mt-1">{errors.technicianName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                    Date *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className={`h-12 rounded-xl border-2 transition-all duration-200 ${errors.date ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"}`}
                  />
                  {errors.date && <p className="text-sm text-red-500 flex items-center gap-1 mt-1">{errors.date}</p>}
                </div>
              </div>
            </div>

            {/* Client Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">Client Information</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="clientName" className="text-sm font-medium text-gray-700">
                    Client Name *
                  </Label>
                  <Input
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="Enter client name"
                    className={`h-12 rounded-xl border-2 transition-all duration-200 ${errors.clientName ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"}`}
                  />
                  {errors.clientName && (
                    <p className="text-sm text-red-500 flex items-center gap-1 mt-1">{errors.clientName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientAddress" className="text-sm font-medium text-gray-700">
                    Client Address *
                  </Label>
                  <Input
                    id="clientAddress"
                    value={formData.clientAddress}
                    onChange={(e) => setFormData({ ...formData, clientAddress: e.target.value })}
                    placeholder="Enter client address"
                    className={`h-12 rounded-xl border-2 transition-all duration-200 ${errors.clientAddress ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"}`}
                  />
                  {errors.clientAddress && (
                    <p className="text-sm text-red-500 flex items-center gap-1 mt-1">{errors.clientAddress}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientContact" className="text-sm font-medium text-gray-700">
                    Client Contact Number
                  </Label>
                  <Input
                    id="clientContact"
                    type="tel"
                    value={formData.clientContact}
                    onChange={(e) => setFormData({ ...formData, clientContact: e.target.value })}
                    placeholder="Enter phone number (optional)"
                    className={`h-12 rounded-xl border-2 transition-all duration-200 ${errors.clientContact ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"}`}
                  />
                  {errors.clientContact && (
                    <p className="text-sm text-red-500 flex items-center gap-1 mt-1">{errors.clientContact}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motorType" className="text-sm font-medium text-gray-700">
                    Motor Type
                  </Label>
                  <Input
                    id="motorType"
                    value={formData.motorType}
                    onChange={(e) => setFormData({ ...formData, motorType: e.target.value })}
                    placeholder="Enter motor type (optional)"
                    className="h-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">Service Details</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="faultDescription" className="text-sm font-medium text-gray-700">
                    Fault Description *
                  </Label>
                  <Textarea
                    id="faultDescription"
                    value={formData.faultDescription}
                    onChange={(e) => setFormData({ ...formData, faultDescription: e.target.value })}
                    placeholder="Describe the fault or issue reported..."
                    rows={3}
                    className={`rounded-xl border-2 transition-all duration-200 resize-none ${errors.faultDescription ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"}`}
                  />
                  {errors.faultDescription && (
                    <p className="text-sm text-red-500 flex items-center gap-1 mt-1">{errors.faultDescription}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="diagnosticSteps" className="text-sm font-medium text-gray-700">
                    Diagnostic Steps Taken
                  </Label>
                  <Textarea
                    id="diagnosticSteps"
                    value={formData.diagnosticSteps}
                    onChange={(e) => setFormData({ ...formData, diagnosticSteps: e.target.value })}
                    placeholder="Describe the diagnostic procedures performed..."
                    rows={3}
                    className="rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-all duration-200 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="partsReplaced" className="text-sm font-medium text-gray-700">
                    Parts Replaced
                  </Label>
                  <Textarea
                    id="partsReplaced"
                    value={formData.partsReplaced}
                    onChange={(e) => setFormData({ ...formData, partsReplaced: e.target.value })}
                    placeholder="List any parts that were replaced..."
                    rows={3}
                    className="rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-all duration-200 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serviceOutcome" className="text-sm font-medium text-gray-700">
                    Service Outcome
                  </Label>
                  <Textarea
                    id="serviceOutcome"
                    value={formData.serviceOutcome}
                    onChange={(e) => setFormData({ ...formData, serviceOutcome: e.target.value })}
                    placeholder="Describe the final outcome and any recommendations..."
                    rows={3}
                    className="rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-all duration-200 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Digital Signature */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <PenTool className="h-5 w-5 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">Technician Signature</h3>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Digital Signature *</Label>
                <SignaturePad onSignatureChange={handleSignatureChange} error={errors.signature} />
                {errors.signature && (
                  <p className="text-sm text-red-500 flex items-center gap-1 mt-1">{errors.signature}</p>
                )}
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
