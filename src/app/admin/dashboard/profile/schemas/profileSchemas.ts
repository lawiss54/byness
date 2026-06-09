import { z } from "zod";

// Phone number validation
export const phoneSchema = z.string().regex(
  /^0[5-7][0-9]{8}$/,
  "Format de numéro invalide (ex: 0612345678)"
);

// Password rules
export const passwordSchema = z
  .string()
  .min(8, "Le mot de passe doit contenir au moins 8 caractères")
  .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
  .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre");

// Schema for changing phone
export const changePhoneSchema = z.object({
  newPhoneNumber: phoneSchema,
  currentPassword: z.string().min(1, "Le mot de passe actuel est requis"),
});

// Schema for changing password
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Le mot de passe actuel est requis"),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, "La confirmation du mot de passe est requise"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type ChangePhoneForm = z.infer<typeof changePhoneSchema>;
export type ChangePasswordForm = z.infer<typeof changePasswordSchema>;