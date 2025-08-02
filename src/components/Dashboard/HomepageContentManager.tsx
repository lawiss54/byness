"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Edit,
  Trash2,
  Save,
  Upload,
  Eye,
  EyeOff,
  ImageIcon,
  Type,
  Link,
  Tag,
  FileText,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Home,
  Layout,
  X,
} from "lucide-react"

// Mock components for demonstration
const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  onClick,
  disabled,
  className = "",
  type = "button",
  title = "",
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`
      inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors whitespace-nowrap
      ${size === "sm"
        ? "px-2 py-1.5 text-sm min-h-[32px]"
        : size === "xs"
          ? "px-1.5 py-1 text-xs min-h-[28px]"
          : "px-4 py-2 min-h-[40px]"
      }
      ${variant === "outline"
        ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        : variant === "ghost"
          ? "text-gray-600 hover:bg-gray-100"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      ${className}
    `}
  >
    {icon}
    <span className={size === "xs" ? "hidden sm:inline" : ""}>{children}</span>
  </button>
)

const Input = ({ value, onChange, placeholder, required, icon, className = "" }) => (
  <div className="relative">
    {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>}
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${icon ? "pl-10" : ""} ${className}`}
    />
  </div>
)

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>{children}</div>
)

const Badge = ({ children, variant = "default", size = "md", className = "" }) => (
  <span
    className={`
    inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
    ${variant === "success"
        ? "bg-green-100 text-green-800"
        : variant === "info"
          ? "bg-blue-100 text-blue-800"
          : "bg-gray-100 text-gray-800"
      }
    ${size === "sm" ? "px-1.5 py-0.5 text-xs" : "px-2 py-1 text-xs"}
    ${className}
  `}
  >
    {children}
  </span>
)

// Mock toast
const toast = {
  success: (message) => console.log("Success:", message),
  error: (message) => console.log("Error:", message),
}

interface ContentSection {
  id: string
  title: string
  badge: string
  mainTitle: string
  description: string
  buttonText: string
  buttonLink: string
  image: string
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

interface ContentFormData {
  title: string
  badge: string
  mainTitle: string
  description: string
  buttonText: string
  buttonLink: string
  image: string
  isActive: boolean
}

// Helper function to convert snake_case to camelCase
const convertToCamelCase = (data: any): ContentSection => {
  return {
    id: data.id?.toString() || "",
    title: data.title || "",
    badge: data.badge || "",
    mainTitle: data.main_title || "",
    description: data.description || "",
    buttonText: data.button_text || "",
    buttonLink: data.button_link || "",
    image: data.image || "",
    isActive: Boolean(data.is_active), // تأكد من تحويل القيمة إلى boolean
    order: data.order || 0,
    createdAt: data.created_at || "",
    updatedAt: data.updated_at || "",
  }
}

export default function HomepageContentManager() {
  // State Management
  const [sections, setSections] = useState<ContentSection[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingSection, setEditingSection] = useState<ContentSection | null>(null)
  const [loading, setLoading] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [bottunLoading, setBottunLoading] = useState(false)
  const [status, setStatus] = useState()
  const [statusButton, setStatusButton] = useState(false)

  // Form State
  const [formData, setFormData] = useState<ContentFormData>({
    title: "",
    badge: "",
    mainTitle: "",
    description: "",
    buttonText: "",
    buttonLink: "",
    image: "",
    isActive: true,
  })

  const loadSections = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/contant", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })

      // إصلاح الشرط - يجب أن يكون !res.ok للتحقق من الخطأ
      if (!res.ok) {
        toast.error("Réponse serveur invalide")
        return
      }

      const response = await res.json()

      // التحقق من وجود البيانات
      if (response.data && Array.isArray(response.data)) {
        // تحويل البيانات من snake_case إلى camelCase
        const convertedSections: ContentSection[] = response.data.map(convertToCamelCase)
        setSections(convertedSections)
        toast.success(response.message || "تم تحميل البيانات بنجاح")

        // طباعة البيانات للتحقق
        console.log("البيانات الأصلية:", response.data)
        console.log("البيانات المحولة:", convertedSections)
      } else {
        toast.error("تنسيق البيانات غير صحيح")
        setSections([])
      }
    } catch (error) {
      console.error("خطأ في تحميل البيانات:", error)
      toast.error("Erreur lors du chargement du contenu")
      setSections([])
    } finally {
      setLoading(false)
    }
  }

  // Load sections on component mount
  useEffect(() => {
    if (typeof window === "undefined") return
    loadSections()
  }, [])

  const saveSections = async (updatedSections: ContentSection[]) => {
    try {
      setLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setSections(updatedSections)
      toast.success("Contenu sauvegardé avec succès")
    } catch (error) {
      toast.error("Erreur lors de la sauvegarde du contenu")
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setFormData((prev) => ({
        ...prev,
        image: e.target?.result as string,
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // التحقق من الحقول المطلوبة
    if (!formData.mainTitle.trim()) {
      toast.error("الرجاء إدخال العنوان الرئيسي")
      return
    }
    if (!formData.description.trim()) {
      toast.error("الرجاء إدخال الوصف")
      return
    }

    try {
      setBottunLoading(true)
      // إنشاء كائن البيانات بتنسيق snake_case للإرسال للخادم
      const sectionData = {
        title: formData.title.trim(),
        badge: formData.badge.trim(),
        main_title: formData.mainTitle.trim(), // تحويل إلى snake_case
        description: formData.description.trim(),
        button_text: formData.buttonText.trim(), // تحويل إلى snake_case
        button_link: formData.buttonLink.trim(), // تحويل إلى snake_case
        image: formData.image,
        is_active: formData.isActive, // تحويل إلى snake_case
      }

      let response
      let newSection: ContentSection

      if (editingSection) {
        // تحديث القسم الموجود
        response = await fetch(`/api/contant/${editingSection.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(sectionData),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || "خطأ في تحديث القسم")
        }

        const result = await response.json()

        // إنشاء القسم المحدث
        newSection = {
          ...editingSection,
          title: formData.title,
          badge: formData.badge,
          mainTitle: formData.mainTitle,
          description: formData.description,
          buttonText: formData.buttonText,
          buttonLink: formData.buttonLink,
          image: formData.image,
          isActive: formData.isActive,
          updatedAt: new Date().toISOString(),
        }

        // تحديث القائمة المحلية
        const updatedSections = sections.map((section) => (section.id === editingSection.id ? newSection : section))
        setSections(updatedSections)
        toast.success(result.message || "تم تحديث القسم بنجاح")
      } else {
        // إنشاء قسم جديد
        const response = await fetch("/api/contant", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(sectionData),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || "خطأ في إنشاء القسم")
        }

        const result = await response.json()

        // إنشاء القسم الجديد
        newSection = {
          id: result.data?.id?.toString() || Date.now().toString(),
          title: formData.title,
          badge: formData.badge,
          mainTitle: formData.mainTitle,
          description: formData.description,
          buttonText: formData.buttonText,
          buttonLink: formData.buttonLink,
          image: formData.image,
          isActive: formData.isActive,
          order: sections.length + 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        // إضافة القسم الجديد للقائمة
        setSections((prevSections) => [...prevSections, newSection])
        toast.success(result.message || "تم إنشاء القسم بنجاح")
      }

      // إعادة تعيين النموذج
      resetForm()
    } catch (error) {
      console.error("خطأ في handleSubmit:", error)
      // معالجة أنواع مختلفة من الأخطاء
      if (error instanceof TypeError && error.message.includes("fetch")) {
        toast.error("خطأ في الاتصال بالخادم. الرجاء المحاولة مرة أخرى.")
      } else if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("حدث خطأ غير متوقع")
      }
    } finally {
      setBottunLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      badge: "",
      mainTitle: "",
      description: "",
      buttonText: "",
      buttonLink: "",
      image: "",
      isActive: true,
    })
    setEditingSection(null)
    setShowForm(false)
  }

  const handleEdit = (section: ContentSection) => {
    setFormData({
      title: section.title,
      badge: section.badge,
      mainTitle: section.mainTitle,
      description: section.description,
      buttonText: section.buttonText,
      buttonLink: section.buttonLink,
      image: section.image,
      isActive: section.isActive,
    })
    setEditingSection(section)
    setShowForm(true)
  }

  const handleDelete = async (sectionId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce contenu ?")) {
      setBottunLoading(true)
      try {
        const res = await fetch(`/api/contant/${sectionId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })

        if (!res.ok) {
          toast.error("Une erreur s'est produite lors de la connexion au serveur")
          return
        }

        const response = await res.json()
        toast.success(response.message)

        const updatedSections = sections.filter((section) => section.id !== sectionId)
        await saveSections(updatedSections)
      } catch (error) {
        toast.error("Une erreur s'est produite lors de la suppression")
      } finally {
        setBottunLoading(false)
      }
    }
  }

  const handleToggleActive = async (sectionId: string) => {
    try {
      setStatusButton(true)

      // العثور على القسم الحالي
      const currentSection = sections.find((section) => section.id === sectionId)
      if (!currentSection) {
        toast.error("القسم غير موجود")
        return
      }

      const newActiveStatus = !currentSection.isActive

      // إرسال الطلب للخادم
      const res = await fetch(`/api/contant/status/${sectionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ status: newActiveStatus }),
      })

      if (!res.ok) {
        toast.error("Une erreur s'est produite lors de la connexion au serveur")
        return
      }

      const response = await res.json()
      toast.success(response.message)

      // تحديث الحالة المحلية
      const updatedSections = sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            isActive: newActiveStatus,
            updatedAt: new Date().toISOString(),
          }
        }
        return section
      })

      setSections(updatedSections)
    } catch (error) {
      console.error("خطأ في تغيير الحالة:", error)
      toast.error("Une erreur s'est produite lors de la connexion au serveur")
    } finally {
      setStatusButton(false)
    }
  }

  const handleReorder = async (sectionId: string, direction: "up" | "down") => {
    const sectionIndex = sections.findIndex((s) => s.id === sectionId)
    if ((direction === "up" && sectionIndex === 0) || (direction === "down" && sectionIndex === sections.length - 1)) {
      return
    }

    const newSections = [...sections]
    const targetIndex = direction === "up" ? sectionIndex - 1 : sectionIndex + 1
      ;[newSections[sectionIndex], newSections[targetIndex]] = [newSections[targetIndex], newSections[sectionIndex]]

    // Update order numbers
    newSections.forEach((section, index) => {
      section.order = index + 1
      section.updatedAt = new Date().toISOString()
    })

    try {
      const res = await fetch("/api/contant/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ sections: newSections }),
      })

      if (!res.ok) {
        toast.error("Une erreur s'est produite lors de la connexion au serveur")
        return
      }

      const response = await res.json()
      toast.success(response.message)

      await saveSections(newSections)
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la réorganisation")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen space-y-4 sm:space-y-6 p-3 sm:p-6 bg-gray-50">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
            Gestion du contenu de la page d'accueil
          </h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
            Ajouter et modifier les sections de contenu de la page d'accueil
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <Button
            onClick={() => setPreviewMode(!previewMode)}
            icon={<Eye className="w-4 h-4" />}
            variant={previewMode ? "primary" : "outline"}
            className="w-full sm:w-auto"
            size="sm"
          >
            <span className="hidden sm:inline">{previewMode ? "Masquer aperçu" : "Aperçu"}</span>
            <span className="sm:hidden">Aperçu</span>
          </Button>
          <Button
            onClick={() => setShowForm(true)}
            icon={<Plus className="w-4 h-4" />}
            className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
            size="sm"
          >
            <span className="hidden sm:inline">Ajouter nouveau contenu</span>
            <span className="sm:hidden">Ajouter</span>
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-600 truncate">Total sections</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{sections?.length}</p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Layout className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-600 truncate">Sections actives</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600">
                {sections?.filter((s) => s.isActive).length}
              </p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-600 truncate">Sections masquées</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-600">
                {sections?.filter((s) => !s?.isActive)?.length}
              </p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-600 truncate">Dernière mise à jour</p>
              <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                {sections?.length > 0
                  ? new Date(Math.max(...sections?.map((s) => new Date(s.updatedAt)?.getTime()))).toLocaleDateString(
                    "fr-FR",
                  )
                  : "Aucune"}
              </p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Home className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Content Sections List */}
      <Card className="overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Sections de contenu</h2>
        </div>
        {sections?.length === 0 ? (
          <div className="p-6 sm:p-12 text-center">
            <Layout className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Aucune section de contenu</h3>
            <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">
              Commencez par ajouter une nouvelle section de contenu à la page d'accueil
            </p>
            <Button
              onClick={() => setShowForm(true)}
              icon={<Plus className="w-4 h-4" />}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Ajouter première section
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {sections
              ?.sort((a, b) => a.order - b.order)
              ?.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 sm:p-6"
                >
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                    {/* Section Image */}
                    <div className="flex-shrink-0 self-start">
                      {section.image ? (
                        <img
                          src={section.image || "/placeholder.svg"}
                          alt={section.mainTitle}
                          className="w-full lg:w-20 xl:w-24 h-20 xl:h-24 object-cover rounded-lg border border-gray-200"
                        />
                      ) : (
                        <div className="w-full lg:w-20 xl:w-24 h-20 xl:h-24 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                          <ImageIcon className="w-6 h-6 xl:w-8 xl:h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    {/* Section Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                            {section.title || section.mainTitle}
                          </h3>
                          {section.badge && (
                            <Badge variant="info" size="sm">
                              {section.badge}
                            </Badge>
                          )}
                          <Badge variant={section.isActive ? "success" : "default"} size="sm">
                            {section.isActive ? "Actif" : "Masqué"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                          <span>Ordre: {section.order}</span>
                        </div>
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {section.mainTitle}
                      </h4>
                      <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-2 text-sm sm:text-base">
                        {section.description}
                      </p>
                      {section.buttonText && (
                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                          <Button size="sm" variant="outline" className="pointer-events-none bg-transparent">
                            {section.buttonText}
                          </Button>
                          {section.buttonLink && (
                            <a
                              href={section.buttonLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      )}
                      <div className="text-xs sm:text-sm text-gray-500">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <span>Créé le: {new Date(section.createdAt).toLocaleDateString("fr-FR")}</span>
                          <span className="hidden sm:inline">|</span>
                          <span>Mis à jour: {new Date(section.updatedAt).toLocaleDateString("fr-FR")}</span>
                        </div>
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex lg:flex-col gap-2 lg:gap-1 flex-wrap lg:flex-nowrap">
                      {/* Reorder buttons */}
                      <div className="flex lg:flex-col gap-1 order-1 lg:order-1">
                        <Button
                          size="xs"
                          variant="ghost"
                          icon={<ArrowUp className="w-3 h-3 sm:w-4 sm:h-4" />}
                          onClick={() => handleReorder(section.id, "up")}
                          disabled={index === 0}
                          title="Déplacer vers le haut"
                          className="min-w-[28px] sm:min-w-[32px]"
                        >
                          <span className="sr-only">Haut</span>
                        </Button>
                        <Button
                          size="xs"
                          variant="ghost"
                          icon={<ArrowDown className="w-3 h-3 sm:w-4 sm:h-4" />}
                          onClick={() => handleReorder(section.id, "down")}
                          disabled={index === sections.length - 1}
                          title="Déplacer vers le bas"
                          className="min-w-[28px] sm:min-w-[32px]"
                        >
                          <span className="sr-only">Bas</span>
                        </Button>
                      </div>
                      {/* Edit and visibility buttons */}
                      <div className="flex lg:flex-col gap-1 order-2 lg:order-2">
                        <Button
                          size="xs"
                          variant="ghost"
                          icon={<Edit className="w-3 h-3 sm:w-4 sm:h-4" />}
                          onClick={() => handleEdit(section)}
                          title="Modifier"
                          className="min-w-[28px] sm:min-w-[32px]"
                        >
                          <span className="sr-only">Modifier</span>
                        </Button>
                        <Button
                          size="xs"
                          variant="ghost"
                          icon={
                            statusButton ? (
                              <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                            ) : section.isActive ? (
                              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                            ) : (
                              <EyeOff className="w-3 h-3 sm:w-4 sm:h-4" />
                            )
                          }
                          onClick={() => handleToggleActive(section.id)}
                          title={section.isActive ? "Masquer" : "Afficher"}
                          disabled={statusButton}
                          className="min-w-[28px] sm:min-w-[32px]"
                        >
                          <span className="sr-only">{section.isActive ? "Masquer" : "Afficher"}</span>
                        </Button>
                      </div>
                      {/* Delete button */}
                      <div className="flex lg:flex-col gap-1 order-3 lg:order-3">
                        <Button
                          size="xs"
                          variant="ghost"
                          icon={
                            bottunLoading ? (
                              <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                            )
                          }
                          onClick={() => handleDelete(section.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 min-w-[28px] sm:min-w-[32px]"
                          title="Supprimer"
                          disabled={bottunLoading}
                        >
                          <span className="sr-only">Supprimer</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        )}
      </Card>

      {/* Preview Mode */}
      {previewMode && (
        <Card className="p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Aperçu de la page d'accueil</h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Comment les sections apparaîtront sur la page d'accueil
              </p>
            </div>
          </div>
          <div className="space-y-6 sm:space-y-8">
            {sections
              .filter((section) => section.isActive)
              .sort((a, b) => a.order - b.order)
              .map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4 sm:p-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 items-center">
                    <div className="space-y-4 sm:space-y-6">
                      {section.badge && (
                        <Badge variant="info" className="w-fit">
                          {section.badge}
                        </Badge>
                      )}
                      <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 leading-tight">
                        {section.mainTitle}
                      </h2>
                      <p className="text-base sm:text-lg text-gray-600 leading-relaxed">{section.description}</p>
                      {section.buttonText && (
                        <Button className="bg-blue-600 hover:bg-blue-700" icon={<ExternalLink className="w-4 h-4" />}>
                          {section.buttonText}
                        </Button>
                      )}
                    </div>
                    {section.image && (
                      <div className="order-first lg:order-last">
                        <img
                          src={section.image || "/placeholder.svg"}
                          alt={section.mainTitle}
                          className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-xl shadow-lg"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
          </div>
        </Card>
      )}

      {/* Add/Edit Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50"
            onClick={(e) => e.target === e.currentTarget && resetForm()}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[95vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between rounded-t-xl">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {editingSection ? "Modifier le contenu" : "Ajouter nouveau contenu"}
                </h2>
                <Button
                  size="sm"
                  variant="ghost"
                  icon={<X className="w-4 h-4" />}
                  onClick={resetForm}
                  className="flex-shrink-0"
                />
              </div>
              <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre de la section (optionnel)
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Exemple: Section Hero"
                    icon={<Type className="w-4 h-4" />}
                  />
                </div>
                {/* Badge */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Badge (optionnel)</label>
                  <Input
                    value={formData.badge}
                    onChange={(e) => setFormData((prev) => ({ ...prev, badge: e.target.value }))}
                    placeholder="Exemple: Nouveau, Recommandé, Offre spéciale"
                    icon={<Tag className="w-4 h-4" />}
                  />
                </div>
                {/* Main Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titre principal *</label>
                  <Input
                    value={formData.mainTitle}
                    onChange={(e) => setFormData((prev) => ({ ...prev, mainTitle: e.target.value }))}
                    placeholder="Le titre qui apparaîtra sur la page"
                    required
                    icon={<Type className="w-4 h-4" />}
                  />
                </div>
                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Description détaillée du contenu"
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                {/* Button Text and Link - Side by side on larger screens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Texte du bouton (optionnel)</label>
                    <Input
                      value={formData.buttonText}
                      onChange={(e) => setFormData((prev) => ({ ...prev, buttonText: e.target.value }))}
                      placeholder="Exemple: En savoir plus"
                      icon={<FileText className="w-4 h-4" />}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lien du bouton (optionnel)</label>
                    <Input
                      value={formData.buttonLink}
                      onChange={(e) => setFormData((prev) => ({ ...prev, buttonLink: e.target.value }))}
                      placeholder="Exemple: /services ou https://exemple.com"
                      icon={<Link className="w-4 h-4" />}
                    />
                  </div>
                </div>
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image (optionnel)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-blue-400 transition-colors">
                    {formData.image ? (
                      <div className="space-y-4">
                        <img
                          src={formData.image || "/placeholder.svg"}
                          alt="Aperçu"
                          className="max-h-32 sm:max-h-40 mx-auto rounded-lg"
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
                        >
                          Supprimer l'image
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-gray-400" />
                        <div>
                          <label className="cursor-pointer">
                            <span className="text-blue-600 hover:text-blue-700 text-sm sm:text-base">
                              Choisir un fichier
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleImageUpload(file)
                              }}
                            />
                          </label>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG jusqu'à 5MB</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* Active Toggle */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                    Afficher ce contenu sur la page d'accueil
                  </label>
                </div>
                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-4 sm:pt-6 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    className="w-full sm:w-auto order-2 sm:order-1 bg-transparent"
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    disabled={bottunLoading}
                    icon={
                      bottunLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )
                    }
                    className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto order-1 sm:order-2"
                  >
                    {bottunLoading ? "Enregistrement en cours..." : editingSection ? "Mettre à jour" : "Enregistrer"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
