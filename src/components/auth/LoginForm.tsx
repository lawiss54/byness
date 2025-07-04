'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  LogIn, 
  Loader, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Shield,
  Sparkles,
  ArrowRight,
  Phone
} from 'lucide-react';

const loginSchema = z.object({
  phone: z
    .string()
    .min(10, 'Le numéro est requis')
    .regex(/^0(5|6|7)[0-9]{8}$/, 'Numéro de téléphone algérien invalide'),
  password: z
    .string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
    .max(50, 'Le mot de passe ne peut pas dépasser 50 caractères'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Login data:', data);
    setIsLoading(false);
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      className="w-full max-w-md"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Form Container */}
      <motion.div
        className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20"
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Form Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-brand-camel-100 px-4 py-2 rounded-full mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Shield className="w-4 h-4 text-brand-camel-600" />
            </motion.div>
            <span className="text-brand-camel-600 font-semibold text-sm">
              Connexion sécurisée
            </span>
          </motion.div>
          
          <h2 className="text-3xl font-playfair font-bold text-brand-darkGreen-500 mb-2">
            Se connecter
          </h2>
          <p className="text-brand-darkGreen-400">
            Accédez à votre espace administrateur
          </p>
        </motion.div>

        {/* Login Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-brand-camel-500" />
                      Numéro de téléphone
                    </FormLabel>
                    <FormControl>
                      <motion.div
                        className="relative"
                        whileFocus={{ scale: 1.02 }}
                      >
                        <Input
                          placeholder="0540******"
                          type="tel"
                          {...field}
                          className="pl-12"
                        />
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-brand-sage-400" />
                      </motion.div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-brand-camel-500" />
                      Mot de passe
                    </FormLabel>
                    <FormControl>
                      <motion.div
                        className="relative"
                        whileFocus={{ scale: 1.02 }}
                      >
                        <Input
                          placeholder="••••••••"
                          type={showPassword ? "text" : "password"}
                          {...field}
                          className="pl-12 pr-12"
                        />
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-brand-sage-400" />
                        <motion.button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-brand-sage-400 hover:text-brand-camel-500 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </motion.button>
                      </motion.div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Remember Me & Forgot Password */}
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.label
                className="flex items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-brand-camel-500 rounded focus:ring-brand-camel-500 border-brand-sage-300"
                />
                <span className="text-sm text-brand-darkGreen-500">
                  Se souvenir de moi
                </span>
              </motion.label>

              
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-brand-camel-500 hover:bg-brand-camel-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      <span>Connexion en cours...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>Se connecter</span>
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </>
                  )}
                </motion.div>
              </Button>
            </motion.div>
          </form>
        </Form>

        {/* Divider */}
        <motion.div
          className="relative my-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
         
        </motion.div>
      </motion.div>

      {/* Security Notice */}
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center justify-center gap-2 text-brand-sage-400 text-sm">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
          <span>Connexion sécurisée SSL 256-bit</span>
        </div>
      </motion.div>
    </motion.div>
  );
}