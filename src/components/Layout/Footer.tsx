'use client'
import React from 'react';
import { motion } from 'framer-motion';
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  MessageCircle,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import Link from 'next/link';


interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
  color: string;
}

export default function Footer({data}) {
  // يمكن جلب هذه البيانات من الإعدادات أو API
  const socialLinks: SocialLink[] = [
    {
      icon: Facebook,
      href: data?.socialmedia?.facebook,
      label: "Facebook",
      color: "hover:text-blue-400"
    },
    {
      icon: Instagram,
      href: data?.socialmedia?.instagram,
      label: "Instagram", 
      color: "hover:text-pink-400"
    },
    {
      icon: MessageCircle,
      href: data?.socialmedia?.whatsapp,
      label: "WhatsApp",
      color: "hover:text-green-400"
    },
    {
      icon: SiTiktok,
      href: data?.socialmedia?.tiktok,
      label: "TikTok",
      color: "hover:text-darkGreen-400"
    }
  ];

  const contactInfo = [
    {
      icon: Phone,
      text: data?.settings?.contactPhone,
      href: data?.settings?.contactPhone
    },
    {
      icon: Mail,
      text: data?.settings?.contactMail,
      href: `mailto:${data?.settings?.contactPhone}`
    },
    {
      icon: MapPin,
      text: "Algérie, Skikda",
      href: "#"
    }
  ];

  return (
    <footer className="w-full bg-brand-greenBlack-500 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Company Info - Column 1 */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-brand-sage-500 font-primary mb-3">
                ByNes
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Boutique en ligne spécialisée dans la vente de vêtements féminins haut de gamme, proposant les dernières tendances de la mode avec élégance et raffinement pour la femme moderne en Algérie
              </p>
            </div>

            {/* Social Media dans نفس العمود */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">
                Suivez-nous
              </h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-gray-300 transition-all duration-300 ${social.color} hover:bg-gray-600 hover:scale-110`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.label}
                    aria-label={`Suivez-nous sur ${social.label}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Info - Column 2 */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-3">
              Contactez-nous
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((contact, index) => (
                <li key={index}>
                  <motion.a
                    href={contact.href}
                    className="flex items-center gap-3 text-sm text-gray-300 hover:text-brand-sage-500 transition-colors duration-200"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <contact.icon className="w-4 h-4 flex-shrink-0" />
                    <span>{contact.text}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup - Column 3 */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-3">
              Newsletter
            </h4>
            <div>
              <p className="text-sm text-gray-300 mb-4">
                Abonnez-vous à notre newsletter pour recevoir nos dernières offres et nouveautés
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-sage-500 focus:border-transparent"
                />
                <motion.button
                  className="w-full px-4 py-3 bg-brand-sage-500 text-white rounded-lg text-sm font-medium hover:bg-brand-sage-600 transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  S'abonner
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-6">
          {/* Bottom Footer */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-sm font-bold">
                Tous droits réservés à{" "}
                <span className="text-brand-sage-500 font-bold font-primary">
                  ByNes 2025
                </span>
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              <motion.div
                
                className="text-sm text-gray-300 hover:text-brand-sage-500 transition-colors duration-200"
                whileHover={{ y: -1 }}
              >
                <Link href="/privacy">Politique de confidentialité</Link>
              </motion.div>
              <motion.div
                
                className="text-sm text-gray-300 hover:text-brand-sage-500 transition-colors duration-200"
                whileHover={{ y: -1 }}
              >
                <Link href="/terms">Conditions d'utilisation</Link>
                
              </motion.div>
            </div>
          </div>

          {/* Developer Credit */}
          <div className="mt-6 pt-4 border-t border-gray-800">
            <p className="text-center text-xs text-gray-400">
              En cas d'erreur, veuillez contacter le développeur{" "}
              <motion.a
                href="tel:+213794547080"
                className="text-brand-sage-500 hover:text-brand-sage-400 font-medium transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
              >
                Ouadah Cherif au +213 794 547 080
              </motion.a>
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        className="fixed bottom-6 right-6 w-12 h-12 bg-brand-sage-500 text-white rounded-full shadow-lg hover:bg-brand-sage-600 transition-colors duration-200 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="Retour en haut"
        aria-label="Retour en haut de la page"
      >
        <svg
          className="w-6 h-6 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </footer>
  );
}