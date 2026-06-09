"use client";

import { motion } from "framer-motion";
import { FormProvider } from "react-hook-form";
import { Input } from "@/components/shared/ui"; // Replace with your actual Input component
import { Button } from "@/components/shared/ui"; // Replace with your actual Button component
import { Eye, EyeOff } from "lucide-react";
import { useProfileSettings } from "../hooks/useProfileSettings";

export default function PasswordTab() {
  const {
    passwordForm,
    onSubmitPassword,
    loading,
    showPasswords,
    togglePasswordVisibility,
    getPasswordStrength,
  } = useProfileSettings();

  const passwordStrength = getPasswordStrength(passwordForm.watch("newPassword"));

  return (
    <motion.div
      key="password"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      <FormProvider {...passwordForm}>
        <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe actuel
            </label>
            <div className="relative">
              <Input
                {...passwordForm.register("currentPassword")}
                type={showPasswords.current ? "text" : "password"}
                placeholder="Votre mot de passe actuel"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                className="absolute right-2 top-2"
              >
                {showPasswords.current ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {passwordForm.formState.errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">
                {passwordForm.formState.errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nouveau mot de passe
            </label>
            <div className="relative">
              <Input
                {...passwordForm.register("newPassword")}
                type={showPasswords.new ? "text" : "password"}
                placeholder="Votre nouveau mot de passe"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-2 top-2"
              >
                {showPasswords.new ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {passwordForm.formState.errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {passwordForm.formState.errors.newPassword.message}
              </p>
            )}

            {/* Password strength */}
            <ul className="mt-2 text-sm">
              {passwordStrength.map((rule, idx) => (
                <li
                  key={idx}
                  className={rule.test ? "text-green-600" : "text-gray-500"}
                >
                  {rule.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirmer le mot de passe
            </label>
            <div className="relative">
              <Input
                {...passwordForm.register("confirmPassword")}
                type={showPasswords.confirm ? "text" : "password"}
                placeholder="Confirmez le mot de passe"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-2 top-2"
              >
                {showPasswords.confirm ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {passwordForm.formState.errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {passwordForm.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Mise à jour..." : "Mettre à jour le mot de passe"}
          </Button>
        </form>
      </FormProvider>
    </motion.div>
  );
}