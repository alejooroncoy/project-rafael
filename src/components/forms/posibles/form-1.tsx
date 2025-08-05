"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { User, GraduationCap, Heart, Upload, CheckCircle, Share, CalendarIcon } from "lucide-react"
import { useFormSubmit } from "@/components/forms/form-submit"
import { useUploadThing } from "@/lib/public/uploadthing-provider"
import { toast } from "sonner"

function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }

  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function formatDateForInput(date: Date | undefined) {
  if (!date) {
    return ""
  }

  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear().toString()

  return `${day}/${month}/${year}`
}

function parseDateFromInput(input: string): Date | undefined {
  // Formato esperado: DD/MM/YYYY
  const match = input.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (!match) return undefined

  const [, day, month, year] = match
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
  
  // Validar que la fecha sea válida
  if (date.getDate() !== parseInt(day) || 
      date.getMonth() !== parseInt(month) - 1 || 
      date.getFullYear() !== parseInt(year)) {
    return undefined
  }

  return date
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false
  }
  return !isNaN(date.getTime())
}

interface FormData {
  // Información personal
  nombre: string
  cumpleanos: Date | undefined
  celular: string
  email: string

  // Información académica
  ciclo: string
  universidad: string

  // Preguntas motivacionales
  motivacion: string
  iniciativas: string
  metas: string
  habilidades: string

  // Archivos temporales
  foto: File | null
  cv: File | null
}

const universidades: string[] = [
  "Universidad Tecnológica del Perú (UTP)",
  "Universidad San Ignacio de Loyola (USIL)",
  "Universidad Ricardo Palma",
  "Universidad Peruana de Ciencias Aplicadas (UPC)",
  "Universidad Femenina del Sagrado Corazón (UNIFÉ)",
  "Universidad ESAN (ESAN)",
  "Pontificia Universidad Católica del Perú (PUCP)",
  "Universidad de San Martín de Porres",
  "Universidad de Ingeniería y Tecnología (UTEC)",
  "Universidad Antonio Ruiz de Montoya (MONTOYA)",
  "Universidad Científica del Sur (UCSUR)",
  "Universidad de Lima",
  "Universidad del Pacífico",
  "Universidad de Ciencias y Artes de América Latina (UCAL)",
  "Universidad de Piura (UDP)"
];


export default function AmbassadorForm() {
  const { submitForm, isSubmitting } = useFormSubmit()
  const { startUpload: startImageUpload, isUploading: isImageUploading } = useUploadThing("imageUploader")
  const { startUpload: startDocumentUpload, isUploading: isDocumentUploading } = useUploadThing("documentUploader")
  const email = useRef<string>("chathappyme@gmail.com");
  
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    cumpleanos: undefined,
    celular: "",
    email: "",
    ciclo: "",
    universidad: "",
    motivacion: "",
    iniciativas: "",
    metas: "",
    habilidades: "",
    foto: null,
    cv: null,
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [dateInputValue, setDateInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)  

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  const updateFormData = (field: keyof FormData, value: string | File | null | Date | undefined) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.nombre && formData.cumpleanos && formData.celular && formData.email
      case 2:
        return formData.ciclo && formData.universidad
      case 3:
        return formData.motivacion && formData.iniciativas && formData.metas && formData.habilidades
      case 4:
        return formData.foto && formData.cv
      default:
        return true
    }
  }

  const handleImageUpload = (files: File[]) => {
    if (files.length > 0) {
      updateFormData("foto", files[0])
      toast.success("Foto seleccionada")
    }
  }

  const handleDocumentUpload = (files: File[]) => {
    if (files.length > 0) {
      updateFormData("cv", files[0])
      toast.success("CV seleccionado")
    }
  }

  const handleSubmit = async () => {
    setSubmitError(null)
    setIsLoading(true)

    try {
      // Toast inicial de carga
      const loadingToast = toast.loading("Preparando tu postulación...")

      // Subir archivos primero
      let fotoUrl = null
      let cvUrl = null

      if (formData.foto) {
        toast.loading("Guardando tu foto...", { id: loadingToast })
        const uploadedFoto = await startImageUpload([formData.foto])
        if (uploadedFoto && uploadedFoto[0]) {
          fotoUrl = uploadedFoto[0].url
        }
      }

      if (formData.cv) {
        toast.loading("Guardando tu CV...", { id: loadingToast })
        const uploadedCv = await startDocumentUpload([formData.cv])
        if (uploadedCv && uploadedCv[0]) {
          cvUrl = uploadedCv[0].url
        }
      }

      // Preparar datos para enviar
      const answers = {
        nombre: formData.nombre,
        cumpleanos: formData.cumpleanos ? formData.cumpleanos.toISOString().split('T')[0] : "",
        celular: formData.celular,
        email: formData.email,
        ciclo: formData.ciclo,
        universidad: formData.universidad,
        motivacion: formData.motivacion,
        iniciativas: formData.iniciativas,
        metas: formData.metas,
        habilidades: formData.habilidades,
        foto: fotoUrl,
        cv: cvUrl,
      }

      // Enviar usando el contexto
      toast.loading("Guardando tu postulación...", { id: loadingToast })
      await submitForm(answers)
      
      // Toast final de éxito
      toast.success("¡Muchas gracias por tu postulación!", { id: loadingToast })
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error:", error)
      toast.error("Hubo un error al enviar tu postulación. Por favor, inténtalo de nuevo.")
      setSubmitError("Hubo un error al enviar tu postulación. Por favor, inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      nombre: "",
      cumpleanos: undefined,
      celular: "",
      email: "",
      ciclo: "",
      universidad: "",
      motivacion: "",
      iniciativas: "",
      metas: "",
      habilidades: "",
      foto: null,
      cv: null,
    })
    setDateInputValue("")
    setCurrentStep(1)
    setIsSubmitted(false)
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000) // Reset después de 2 segundos
    } catch (err) {
      console.error("Error al copiar el link:", err)
      // Fallback para navegadores que no soportan clipboard API
      const textArea = document.createElement("textarea")
      textArea.value = window.location.href
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="mx-auto h-12 w-12 mb-4 text-[#3D41C5]" />
              <h2 className="text-2xl font-bold text-[#3D41C5]">Información Personal</h2>
              <p className="text-[#5A5FD3]">Cuéntanos un poco sobre ti</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="nombre" className="text-[#3D41C5]">Nombre completo *</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => updateFormData("nombre", e.target.value)}
                  placeholder="Ingresa tu nombre completo"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="cumpleanos" className="text-[#3D41C5]">Fecha de cumpleaños *</Label>
                <div className="relative flex gap-2 mt-1">
                  <Input
                    id="cumpleanos"
                    value={dateInputValue}
                    placeholder="DD/MM/AAAA"
                    className="bg-background pr-10"
                    type="text"
                    onChange={(e) => {
                      const inputValue = e.target.value
                      setDateInputValue(inputValue)
                      
                      // Solo validar si tiene el formato completo
                      if (inputValue.length === 10) {
                        const date = parseDateFromInput(inputValue)
                        if (date) {
                          updateFormData("cumpleanos", date)
                        }
                      } else if (inputValue === "") {
                        updateFormData("cumpleanos", undefined)
                      }
                    }}
                    onBlur={() => {
                      // Validar cuando el usuario termina de escribir
                      if (dateInputValue && dateInputValue.length === 10) {
                        const date = parseDateFromInput(dateInputValue)
                        if (date) {
                          updateFormData("cumpleanos", date)
                        } else {
                          // Si no es válida, limpiar el input
                          setDateInputValue("")
                          updateFormData("cumpleanos", undefined)
                        }
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault()
                        setOpen(true)
                      }
                    }}
                  />
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        id="date-picker"
                        variant="ghost"
                        className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                      >
                        <CalendarIcon className="size-3.5 text-[#3D41C5]" />
                        <span className="sr-only">Seleccionar fecha</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="end"
                      alignOffset={-8}
                      sideOffset={10}
                    >
                      <Calendar
                        mode="single"
                        className="w-56"
                        selected={formData.cumpleanos}
                        captionLayout="dropdown"
                        month={formData.cumpleanos}
                        onMonthChange={(date) => updateFormData("cumpleanos", date)}
                        onSelect={(date) => {
                          updateFormData("cumpleanos", date)
                          setDateInputValue(date ? formatDateForInput(date) : "")
                          setOpen(false)
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <p className="text-xs mt-1 text-[#7A7A9E]">
                  Ejemplo: 15/03/2000
                </p>
              </div>

              <div>
                <Label htmlFor="celular" className="text-[#3D41C5]">Número de celular *</Label>
                <Input
                  id="celular"
                  value={formData.celular}
                  onChange={(e) => updateFormData("celular", e.target.value)}
                  placeholder="+51 999 999 999"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-[#3D41C5]">Correo electrónico *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="tu@email.com"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <GraduationCap className="mx-auto h-12 w-12 mb-4 text-[#3D41C5]" />
              <h2 className="text-2xl font-bold text-[#3D41C5]">Información Académica</h2>
              <p className="text-[#5A5FD3]">Detalles sobre tu universidad</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="ciclo" className="text-[#3D41C5]">Ciclo actual *</Label>
                <Select value={formData.ciclo} onValueChange={(value) => updateFormData("ciclo", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecciona tu ciclo" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((ciclo) => (
                      <SelectItem key={ciclo} value={ciclo.toString()}>
                        {ciclo}° Ciclo
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="universidad" className="text-[#3D41C5]">Universidad *</Label>
                <Select value={formData.universidad} onValueChange={(value) => updateFormData("universidad", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecciona tu universidad" />
                  </SelectTrigger>
                  <SelectContent>
                    {universidades.map((uni) => (
                      <SelectItem key={uni} value={uni}>
                        {uni}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Heart className="mx-auto h-12 w-12 mb-4 text-[#3D41C5]" />
              <h2 className="text-2xl font-bold text-[#3D41C5]">Cuéntanos más sobre ti</h2>
              <p className="text-[#5A5FD3]">Queremos conocer tus motivaciones y experiencia</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="motivacion" className="text-[#3D41C5]">
                  ¿Por qué te gustaría ser parte del equipo de embajadores de HappyMe? *
                </Label>
                <Textarea
                  id="motivacion"
                  value={formData.motivacion}
                  onChange={(e) => updateFormData("motivacion", e.target.value)}
                  placeholder="Comparte tu motivación para unirte a nuestro equipo..."
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="iniciativas" className="text-[#3D41C5]">
                  ¿Qué iniciativas has liderado anteriormente? *
                </Label>
                <Textarea
                  id="iniciativas"
                  value={formData.iniciativas}
                  onChange={(e) => updateFormData("iniciativas", e.target.value)}
                  placeholder="Describe proyectos, eventos, grupos o actividades que hayas liderado..."
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="metas" className="text-[#3D41C5]">¿Qué metas te gustaría cumplir dentro de HappyMe? *</Label>
                <Textarea
                  id="metas"
                  value={formData.metas}
                  onChange={(e) => updateFormData("metas", e.target.value)}
                  placeholder="Describe los objetivos específicos que te gustaría lograr como embajador de HappyMe..."
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="habilidades" className="text-[#3D41C5]">¿Qué habilidades específicas puedes aportar para hacer crecer la comunidad de HappyMe? *</Label>
                <Textarea
                  id="habilidades"
                  value={formData.habilidades}
                  onChange={(e) => updateFormData("habilidades", e.target.value)}
                  placeholder="Menciona tus fortalezas en comunicación, liderazgo, redes sociales, eventos, etc..."
                  className="mt-1 min-h-[100px]"
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Upload className="mx-auto h-12 w-12 mb-4 text-[#3D41C5]" />
              <h2 className="text-2xl font-bold text-[#3D41C5]">Documentos</h2>
              <p className="text-[#5A5FD3]">Sube tu foto y CV</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="foto" className="block text-sm font-medium mb-2 text-[#3D41C5]">
                  Foto personal *
                </Label>
                <p className="text-xs text-[#7A7A9E] mb-3">
                  Esta foto será utilizada para una publicación oficial en caso de ser seleccionado como embajador de HappyMe.
                </p>
                <div className="border-2 border-dashed border-[#7A90F5] rounded-lg p-6 text-center hover:border-opacity-80 transition-colors">
                  <Input
                    id="foto"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files ? Array.from(e.target.files) : [])}
                    className="hidden"
                  />
                  <label htmlFor="foto" className="cursor-pointer flex flex-col items-center space-y-2">
                    <Upload className="h-8 w-8 text-[#3D41C5]" />
                    <span className="text-sm text-[#3D41C5]">
                      {formData.foto ? formData.foto.name : "Haz clic para seleccionar una foto"}
                    </span>
                    <span className="text-xs text-[#7A7A9E]">PNG, JPG hasta 2MB</span>
                  </label>
                  {formData.foto && (
                    <p className="text-sm mt-2 flex items-center justify-center text-[#3D41C5]">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Archivo seleccionado: {formData.foto.name}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="cv" className="block text-sm font-medium mb-2 text-[#3D41C5]">
                  Curriculum Vitae (CV) *
                </Label>
                <div className="border-2 border-dashed border-[#7A90F5] rounded-lg p-6 text-center hover:border-opacity-80 transition-colors">
                  <Input
                    id="cv"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleDocumentUpload(e.target.files ? Array.from(e.target.files) : [])}
                    className="hidden"
                  />
                  <label htmlFor="cv" className="cursor-pointer flex flex-col items-center space-y-2">
                    <Upload className="h-8 w-8 text-[#3D41C5]" />
                    <span className="text-sm text-[#3D41C5]">
                      {formData.cv ? formData.cv.name : "Haz clic para seleccionar tu CV"}
                    </span>
                    <span className="text-xs text-[#7A7A9E]">PDF, DOC, DOCX hasta 5MB</span>
                  </label>
                  {formData.cv && (
                    <p className="text-sm mt-2 flex items-center justify-center text-[#3D41C5]">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Archivo seleccionado: {formData.cv.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CheckCircle className="mx-auto h-12 w-12 mb-4 text-[#3D41C5]" />
              <h2 className="text-2xl font-bold text-[#3D41C5]">Confirmación</h2>
              <p className="text-[#5A5FD3]">Revisa tu información antes de enviar</p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="p-4 rounded-lg bg-[#F5F6FE]">
                <h3 className="font-semibold mb-2 text-[#3D41C5]">Información Personal</h3>
                <p className="text-[#2A2E82]">
                  <strong>Nombre:</strong> {formData.nombre}
                </p>
                <p className="text-[#2A2E82]">
                  <strong>Cumpleaños:</strong> {formData.cumpleanos ? formatDate(formData.cumpleanos) : "No seleccionada"}
                </p>
                <p className="text-[#2A2E82]">
                  <strong>Celular:</strong> {formData.celular}
                </p>
                <p className="text-[#2A2E82]">
                  <strong>Email:</strong> {formData.email}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#F5F6FE]">
                <h3 className="font-semibold mb-2 text-[#3D41C5]">Información Académica</h3>
                <p className="text-[#2A2E82]">
                  <strong>Ciclo:</strong> {formData.ciclo}° Ciclo
                </p>
                <p className="text-[#2A2E82]">
                  <strong>Universidad:</strong> {formData.universidad}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#F5F6FE]">
                <h3 className="font-semibold mb-2 text-[#3D41C5]">Información Motivacional</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-[#2A2E82]"><strong>Motivación:</strong></p>
                    <p className="text-[#2A2E82] text-xs bg-white p-2 rounded border">{formData.motivacion || "No especificada"}</p>
                  </div>
                  <div>
                    <p className="text-[#2A2E82]"><strong>Iniciativas Lideradas:</strong></p>
                    <p className="text-[#2A2E82] text-xs bg-white p-2 rounded border">{formData.iniciativas || "No especificadas"}</p>
                  </div>
                  <div>
                    <p className="text-[#2A2E82]"><strong>Metas en HappyMe:</strong></p>
                    <p className="text-[#2A2E82] text-xs bg-white p-2 rounded border">{formData.metas || "No especificadas"}</p>
                  </div>
                  <div>
                    <p className="text-[#2A2E82]"><strong>Habilidades:</strong></p>
                    <p className="text-[#2A2E82] text-xs bg-white p-2 rounded border">{formData.habilidades || "No especificadas"}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#F5F6FE]">
                <h3 className="font-semibold mb-2 text-[#3D41C5]">Archivos</h3>
                <p className="text-[#2A2E82]">
                  <strong>Foto:</strong> {formData.foto ? formData.foto.name : "No seleccionada"}
                </p>
                <p className="text-[#2A2E82]">
                  <strong>CV:</strong> {formData.cv ? formData.cv.name : "No seleccionado"}
                </p>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // Pantalla de confirmación
  const renderSuccessScreen = () => (
    <div className="text-center space-y-6">
      <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-[#F5F6FE]">
        <CheckCircle className="h-12 w-12 text-[#3D41C5]" />
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-[#3D41C5]">¡Postulación Enviada!</h2>
        <p className="text-lg max-w-md mx-auto text-[#2A2E82]">
          Tu postulación para ser embajador de HappyMe ha sido recibida exitosamente.
        </p>
        <p className="text-sm max-w-md mx-auto text-[#7A7A9E] mb-4">
          Nos alegra mucho que quieras formar parte de HappyMe y ayudar a difundir nuestro compromiso con la salud mental.
        </p>  
        <div className="border border-[#C4CCF8] rounded-lg p-4 max-w-md mx-auto bg-[#F5F6FE]">
          <p className="text-sm text-[#2A2E82]">
            <strong>¿Qué sigue?</strong>
            <br />
            Nuestro equipo revisará tu postulación y te contactaremos en los próximos 3-5 días hábiles con una respuesta.
          </p>
        </div>
      </div>

      <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button
          onClick={resetForm}
          variant="outline"
          className="px-8 py-3 bg-transparent hover:opacity-80 text-[#3D41C5] border-[#3D41C5]"
        >
          Enviar otra postulación
        </Button>

        <Button
          onClick={copyLink}
          variant="outline"
          className="px-8 py-3 bg-transparent flex items-center gap-2 hover:opacity-80 text-[#3D41C5] border-[#3D41C5]"
        >
          <Share className="h-4 w-4" />
          {linkCopied ? "¡Link copiado!" : "Compartir postulación"}
        </Button>
      </div>

      {linkCopied && (
        <div className="mt-4 p-3 border border-[#C4CCF8] rounded-lg max-w-md mx-auto bg-[#F5F6FE]">
          <p className="text-sm text-center text-[#2A2E82]">
            ✅ Link copiado al portapapeles. ¡Compártelo con tus amigos!
          </p>
        </div>
      )}
    </div>
  )

  // Modificar el return principal para mostrar la pantalla de éxito cuando corresponda:
  if (isSubmitted) {
    return (
      <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-[#C4CCF8] to-[#F5F6FE]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 text-[#3D41C5]">HappyMe</h1>
          </div>

          <Card className="shadow-xl border-0">
            <CardContent className="p-8">{renderSuccessScreen()}</CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-[#C4CCF8] to-[#F5F6FE]">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-[#3D41C5]">HappyMe</h1>
          <p className="text-xl mb-2 text-[#3D41C5]">Formulario de Embajadores</p>
          <p className="text-[#2A2E82]">Únete a nuestro equipo y ayuda a estudiantes universitarios</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2 text-[#2A2E82]">
            <span>
              Paso {currentStep} de {totalSteps}
            </span>
            <span>{Math.round(progress)}% completado</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Card */}
        <Card className="shadow-xl border-0">
          <CardContent className="p-8">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={prevStep} 
                disabled={currentStep === 1} 
                className="px-6 bg-transparent hover:opacity-80 text-[#3D41C5] border-[#3D41C5]"
              >
                Anterior
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="px-6 hover:opacity-90 bg-[#3D41C5] text-white"
                >
                  Siguiente
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="px-6 hover:opacity-90 bg-[#3D41C5] text-white"
                >
                  {isLoading ? "Enviando..." : "Enviar Postulación"}
                </Button>
              )}
            </div>
            {submitError && (
              <div className="mt-4 p-3 border border-[#C4CCF8] rounded-lg bg-[#F5F6FE]">
                <p className="text-sm text-center text-[#2A2E82]">{submitError}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-[#2A2E82]">¿Tienes preguntas? Contáctanos en <a target="_blank" href={`mailto:${email.current}?subject=Preguntas%20sobre%20el%20formulario%20de%20embajadores`} className="hover:opacity-80 text-[#3D41C5]">{email.current}</a></p>
        </div>
      </div>
    </div>
  )
}

