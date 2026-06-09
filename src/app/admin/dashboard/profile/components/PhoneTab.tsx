"use client";

import { motion } from "framer-motion";
import { FormProvider } from "react-hook-form";
import { Input } from "@/components/shared/ui"; // Replace with your actual Input component
import { Button } from "@/components/shared/ui"; // Replace with your actual Button component
import { useProfileSettings } from "../hooks/useProfileSettings";

export default function PhoneTab() {
  const { phoneForm, onSubmitPhone, loading } = useProfileSettings();

  return (
    <motion.div
      key="phone"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      <FormProvider {...phoneForm}>
        <form onSubmit={phoneForm.handleSubmit(onSubmitPhone)} className="space-y-4">
          {/* New Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nouveau numéro de téléphone
            </label>
            <Input
              {...phoneForm.register("newPhoneNumber")}
              placeholder="0612345678"
              type="text"
            />
            {phoneForm.formState.errors.newPhoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {phoneForm.formState.errors.newPhoneNumber.message}
              </p>
            )}
          </div>

          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe actuel
            </label>
            <Input
              {...phoneForm.register("currentPassword")}
              type="password"
              placeholder="Votre mot de passe"
            />
            {phoneForm.formState.errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">
                {phoneForm.formState.errors.currentPassword.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Mise à jour..." : "Mettre à jour le numéro"}
          </Button>
        </form>
      </FormProvider>
    </motion.div>
  );
}