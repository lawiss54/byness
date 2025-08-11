import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePhoneSchema,
  changePasswordSchema,
  ChangePhoneForm,
  ChangePasswordForm,
} from "../schemas/profileSchemas";
import { changePhone, changePassword } from "../services/profileService";
import { toast } from "react-toastify";

export function useProfileSettings() {
  const [activeTab, setActiveTab] = useState<"phone" | "password">("phone");
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Phone form
  const phoneForm = useForm<ChangePhoneForm>({
    resolver: zodResolver(changePhoneSchema),
    defaultValues: { newPhoneNumber: "", currentPassword: "" },
    mode: "onChange",
  });

  // Password form
  const passwordForm = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
    mode: "onChange",
  });

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  useEffect(() => {
    phoneForm.reset();
    passwordForm.reset();
  }, [activeTab]);

  // Submits
  const onSubmitPhone = async (data: ChangePhoneForm) => {
    try {
      setLoading(true);
      const res = await changePhone(data);
      if (!res.ok) {
        toast.error("Échec API request");
        return;
      }
      toast.success("Numéro de téléphone mis à jour avec succès");
      phoneForm.reset();
    } catch {
      toast.error("Une erreur s'est produite lors de la sauvegarde");
    } finally {
      setLoading(false);
    }
  };

  const onSubmitPassword = async (data: ChangePasswordForm) => {
    try {
      setLoading(true);
      const res = await changePassword(data);
      if (!res.ok) {
        toast.error("Échec API request");
        return;
      }
      toast.success("Mot de passe mis à jour avec succès");
      passwordForm.reset();
    } catch {
      toast.error("Une erreur s'est produite lors de la sauvegarde");
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => [
    { test: password.length >= 8, label: "Au moins 8 caractères" },
    { test: /[A-Z]/.test(password), label: "Au moins une lettre majuscule" },
    { test: /[0-9]/.test(password), label: "Au moins un chiffre" },
    { test: /[!@#$%^&*(),.?\":{}|<>]/.test(password), label: "Au moins un caractère spécial" },
  ];

  return {
    activeTab,
    setActiveTab,
    loading,
    phoneForm,
    passwordForm,
    showPasswords,
    togglePasswordVisibility,
    onSubmitPhone,
    onSubmitPassword,
    getPasswordStrength,
  };
}