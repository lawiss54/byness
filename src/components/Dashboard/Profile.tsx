"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Phone, Lock, Shield, Eye, EyeOff, Save, AlertCircle, CheckCircle } from "lucide-react"
import { Button, Input, Card } from "@/components/shared/ui"
import { toast } from "react-toastify"
import { z } from "zod"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

// Zod Schemas
const phoneSchema = z.string().regex(/^0[5-7][0-9]{8}$/, "Format de numéro invalide (ex: 0612345678)")

const passwordSchema = z
  .string()
  .min(8, "Le mot de passe doit contenir au moins 8 caractères")
  .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
  .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")

// Schema pour changer le téléphone
const changePhoneSchema = z.object({
  newPhoneNumber: phoneSchema,
  currentPassword: z.string().min(1, "Le mot de passe actuel est requis"),
})

// Schema pour changer le mot de passe
const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Le mot de passe actuel est requis"),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, "La confirmation du mot de passe est requise"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  })

// Types
type ChangePhoneForm = z.infer<typeof changePhoneSchema>
type ChangePasswordForm = z.infer<typeof changePasswordSchema>

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState("phone")
  const [loading, setLoading] = useState(false)
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  // React Hook Form pour changer le téléphone
  const phoneForm = useForm<ChangePhoneForm>({
    resolver: zodResolver(changePhoneSchema),
    defaultValues: {
      newPhoneNumber: "",
      currentPassword: "",
    },
    mode: "onChange",
  })

  // React Hook Form pour changer le mot de passe
  const passwordForm = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  })

  // Watch pour surveiller les champs de mot de passe
  const newPassword = passwordForm.watch("newPassword")
  const confirmPassword = passwordForm.watch("confirmPassword")

  // Vérifier si les mots de passe correspondent en temps réel
  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword
  const passwordsDontMatch = confirmPassword && newPassword !== confirmPassword

  // Submit handlers
  const onSubmitPhone = async (data: ChangePhoneForm) => {
    try {
      setLoading(true)

      console.log("Sending phone data:", {
        type: "changePhone",
        data,
      })

      // API request
      
      const res = await fetch('/api/profile/change-phone', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
           Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        toast.error("Échec API request");
        return;
      }

      toast.success("Numéro de téléphone mis à jour avec succès")
      phoneForm.reset()
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la sauvegarde")
      console.error("Save error:", error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmitPassword = async (data: ChangePasswordForm) => {
    try {
      setLoading(true)

      console.log("Sending password data:", {
        type: "changePassword",
        data,
      })

      // API request
      const res = await fetch('/api/profile/change-password', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
           Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        toast.error("Échec API request");
        return;
      }

      toast.success("Mot de passe mis à jour avec succès")
      passwordForm.reset()
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la sauvegarde")
      console.error("Save error:", error)
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: "phone", label: "Changer le téléphone", icon: Phone },
    { id: "password", label: "Changer le mot de passe", icon: Lock },
  ]

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  // Reset forms when switching tabs
  useEffect(() => {
    phoneForm.reset()
    passwordForm.reset()
  }, [activeTab, phoneForm, passwordForm])

  // Real-time validation for password strength
  const getPasswordStrength = (password: string) => {
    const checks = [
      { test: password.length >= 8, label: "Au moins 8 caractères" },
      { test: /[A-Z]/.test(password), label: "Au moins une lettre majuscule" },
      { test: /[0-9]/.test(password), label: "Au moins un chiffre" },
      { test: /[!@#$%^&*(),.?":{}|<>]/.test(password), label: "Au moins un caractère spécial" },
    ]
    return checks
  }

  return (
    <div className="space-y-6 min-h-screen p-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-brand-camel-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-brand-camel-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Paramètres du profil</h1>
        <p className="text-gray-600 mt-2">
          Mettez à jour les informations de votre compte et les paramètres de sécurité
        </p>
      </div>

      {/* Tabs Navigation */}
      <Card className="p-1">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all flex-1 justify-center ${activeTab === tab.id
                  ? "bg-brand-camel-500 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
            >
              {React.createElement(tab.icon, { className: "w-4 h-4" })}
              {tab.label}
            </button>
          ))}
        </div>
      </Card>

      <AnimatePresence mode="wait">
        {/* Phone Number Tab */}
        {activeTab === "phone" && (
          <motion.div
            key="phone"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-brand-camel-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-brand-camel-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Changer le numéro de téléphone</h2>
                  <p className="text-gray-600">Mettez à jour le numéro de téléphone associé à votre compte</p>
                </div>
              </div>

              <form onSubmit={phoneForm.handleSubmit(onSubmitPhone)} className="space-y-6">
                {/* Phone Number Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau numéro de téléphone *</label>
                  <Controller
                    name="newPhoneNumber"
                    control={phoneForm.control}
                    render={({ field, fieldState }) => (
                      <>
                        <Input
                          {...field}
                          type="tel"
                          placeholder="0612345678"
                          className={fieldState.error ? "border-red-500" : ""}
                          dir="ltr"
                        />
                        {fieldState.error && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {fieldState.error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                {/* Current Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe actuel *</label>
                  <Controller
                    name="currentPassword"
                    control={phoneForm.control}
                    render={({ field, fieldState }) => (
                      <>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPasswords.current ? "text" : "password"}
                            placeholder="Entrez votre mot de passe actuel"
                            className={fieldState.error ? "border-red-500 pr-10" : "pr-10"}
                          />
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility("current")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {fieldState.error && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {fieldState.error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={loading || !phoneForm.formState.isValid}
                    className="bg-brand-camel-500 hover:bg-brand-camel-600"
                    icon={<Save className="w-4 h-4" />}
                  >
                    {loading ? "Sauvegarde..." : "Sauvegarder les modifications"}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}

        {/* Password Tab */}
        {activeTab === "password" && (
          <motion.div
            key="password"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Changer le mot de passe</h2>
                  <p className="text-gray-600">Mettez à jour le mot de passe de votre compte</p>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-yellow-800">Conseils de sécurité</h3>
                    <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                      <li>• Utilisez un mot de passe fort contenant lettres, chiffres et symboles</li>
                      <li>• Assurez-vous que le mot de passe contient au moins 8 caractères</li>
                      <li>• Ne partagez jamais votre mot de passe avec qui que ce soit</li>
                    </ul>
                  </div>
                </div>
              </div>

              <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="space-y-6">
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe actuel *</label>
                  <Controller
                    name="currentPassword"
                    control={passwordForm.control}
                    render={({ field, fieldState }) => (
                      <>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPasswords.current ? "text" : "password"}
                            placeholder="Entrez votre mot de passe actuel"
                            className={fieldState.error ? "border-red-500 pr-10" : "pr-10"}
                          />
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility("current")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {fieldState.error && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {fieldState.error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau mot de passe *</label>
                  <Controller
                    name="newPassword"
                    control={passwordForm.control}
                    render={({ field, fieldState }) => (
                      <>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPasswords.new ? "text" : "password"}
                            placeholder="Entrez le nouveau mot de passe"
                            className={fieldState.error ? "border-red-500 pr-10" : "pr-10"}
                          />
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility("new")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {fieldState.error && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {fieldState.error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmer le nouveau mot de passe *
                  </label>
                  <Controller
                    name="confirmPassword"
                    control={passwordForm.control}
                    render={({ field, fieldState }) => (
                      <>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPasswords.confirm ? "text" : "password"}
                            placeholder="Confirmez le nouveau mot de passe"
                            className={`${fieldState.error ? "border-red-500" : ""} ${passwordsMatch ? "border-green-500" : ""
                              } ${passwordsDontMatch ? "border-red-500" : ""} pr-10`}
                          />
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility("confirm")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>

                        {/* Real-time password match feedback */}
                        {confirmPassword && (
                          <div className="mt-1">
                            {passwordsMatch ? (
                              <p className="text-green-600 text-sm flex items-center gap-1">
                                <CheckCircle className="w-4 h-4" />
                                Les mots de passe correspondent
                              </p>
                            ) : passwordsDontMatch ? (
                              <p className="text-red-500 text-sm flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                Les mots de passe ne correspondent pas
                              </p>
                            ) : null}
                          </div>
                        )}

                        {/* Form validation error */}
                        {fieldState.error && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {fieldState.error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                {/* Password Strength Indicator */}
                {newPassword && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Force du mot de passe</label>
                    <div className="space-y-2">
                      {getPasswordStrength(newPassword).map((check, index) => (
                        <div key={index} className="flex items-center gap-2">
                          {check.test ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          )}
                          <span className={`text-sm ${check.test ? "text-green-600" : "text-red-600"}`}>
                            {check.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={loading || !passwordForm.formState.isValid}
                    className="bg-brand-camel-500 hover:bg-brand-camel-600"
                    icon={<Save className="w-4 h-4" />}
                  >
                    {loading ? "Sauvegarde..." : "Sauvegarder le nouveau mot de passe"}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
