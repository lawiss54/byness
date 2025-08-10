"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, Lock } from "lucide-react";
import { Card } from "@/components/shared/ui";
import PhoneTab from "./PhoneTab";
import PasswordTab from "./PasswordTab";
import { useProfileSettings } from "../hooks/useProfileSettings";

export default function ProfileSettings() {
  const { activeTab, setActiveTab } = useProfileSettings();

  const tabs = [
    { id: "phone", label: "Changer le téléphone", icon: Phone },
    { id: "password", label: "Changer le mot de passe", icon: Lock },
  ];

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

      {/* Tabs */}
      <Card className="p-1">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all flex-1 justify-center ${
                activeTab === tab.id
                  ? "bg-brand-camel-500 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </Card>

      <AnimatePresence mode="wait">
        {activeTab === "phone" ? <PhoneTab /> : <PasswordTab />}
      </AnimatePresence>
    </div>
  );
}