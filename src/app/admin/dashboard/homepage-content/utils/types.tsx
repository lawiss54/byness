// أنواع البيانات المستخدمة في التطبيق

export interface ContentSection {
  id: string
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

export interface ContentFormData {
  badge: string
  mainTitle: string
  description: string
  buttonText: string
  buttonLink: string
  image: string
  isActive: boolean
}

export interface ButtonProps {
  children: React.ReactNode
  variant?: "primary" | "outline" | "ghost"
  size?: "sm" | "md" | "xs"
  icon?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: "button" | "submit"
  title?: string
}

export interface InputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  icon?: React.ReactNode
  className?: string
  error?: string
}

export interface CardProps {
  children: React.ReactNode
  className?: string
}

export interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "success" | "info"
  size?: "sm" | "md"
  className?: string
}
