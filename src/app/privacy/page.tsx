'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  Users, 
  Globe,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  Mail,
  Phone
} from 'lucide-react';
import { Button, Card } from '@/components/shared/ui';

export default function Privacy() {
  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: Shield,
      content: [
        'Chez ByNes, nous respectons votre vie privée et nous nous engageons à protéger vos données personnelles.',
        'Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations.',
        'En utilisant nos services, vous acceptez les pratiques décrites dans cette politique.'
      ]
    },
    {
      id: 'data-collection',
      title: 'Collecte des données',
      icon: Database,
      content: [
        'Nous collectons les informations que vous nous fournissez directement (nom, email, téléphone).',
        'Nous recueillons automatiquement certaines données techniques (adresse IP, type de navigateur).',
        'Les cookies et technologies similaires nous aident à améliorer votre expérience.',
        'Nous ne collectons que les données nécessaires à la fourniture de nos services.'
      ]
    },
    {
      id: 'data-usage',
      title: 'Utilisation des données',
      icon: Eye,
      content: [
        'Vos données sont utilisées pour fournir et améliorer nos services.',
        'Nous pouvons vous contacter concernant votre compte ou nos services.',
        'Les données analytiques nous aident à comprendre l\'utilisation de notre site.',
        'Nous ne vendons jamais vos données personnelles à des tiers.'
      ]
    },
    {
      id: 'data-sharing',
      title: 'Partage des données',
      icon: Users,
      content: [
        'Nous ne partageons vos données qu\'avec votre consentement explicite.',
        'Certains prestataires de services peuvent accéder à vos données pour nous aider.',
        'Nous pouvons divulguer des informations si requis par la loi.',
        'En cas de fusion ou acquisition, vos données peuvent être transférées.'
      ]
    },
    {
      id: 'data-security',
      title: 'Sécurité des données',
      icon: Lock,
      content: [
        'Nous utilisons des mesures de sécurité techniques et organisationnelles appropriées.',
        'Vos données sont stockées sur des serveurs sécurisés avec chiffrement.',
        'L\'accès aux données est limité aux employés autorisés uniquement.',
        'Nous effectuons régulièrement des audits de sécurité.'
      ]
    },
    {
      id: 'your-rights',
      title: 'Vos droits',
      icon: CheckCircle,
      content: [
        'Vous avez le droit d\'accéder à vos données personnelles.',
        'Vous pouvez demander la correction ou la suppression de vos données.',
        'Vous pouvez vous opposer au traitement de vos données à tout moment.',
        'Vous avez le droit à la portabilité de vos données.'
      ]
    },
    {
      id: 'cookies',
      title: 'Cookies et technologies similaires',
      icon: Globe,
      content: [
        'Nous utilisons des cookies pour améliorer votre expérience de navigation.',
        'Les cookies analytiques nous aident à comprendre l\'utilisation du site.',
        'Vous pouvez gérer vos préférences de cookies dans votre navigateur.',
        'Certains cookies sont essentiels au fonctionnement du site.'
      ]
    },
    {
      id: 'updates',
      title: 'Mises à jour de la politique',
      icon: AlertTriangle,
      content: [
        'Nous pouvons mettre à jour cette politique de temps en temps.',
        'Les modifications importantes vous seront notifiées par email.',
        'La date de dernière mise à jour est indiquée en haut de cette page.',
        'Nous vous encourageons à consulter régulièrement cette politique.'
      ]
    }
  ];

  const dataTypes = [
    {
      category: 'Informations personnelles',
      items: ['Nom et prénom', 'Adresse email', 'Numéro de téléphone', 'Adresse postale']
    },
    {
      category: 'Données techniques',
      items: ['Adresse IP', 'Type de navigateur', 'Système d\'exploitation', 'Pages visitées']
    },
    {
      category: 'Données d\'utilisation',
      items: ['Temps passé sur le site', 'Clics et interactions', 'Préférences utilisateur', 'Historique de navigation']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-brand-greenBlack-500 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-brand-sage-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Politique de confidentialité</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Votre vie privée est importante pour nous. Découvrez comment nous protégeons vos données.
            </p>
            <div className="mt-6 text-sm text-gray-400">
              Dernière mise à jour : 1er janvier 2025
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Button
              variant="ghost"
              icon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => window.history.back()}
            >
              Retour
            </Button>
            <nav className="hidden md:flex space-x-6">
              {sections.slice(0, 4).map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-sm text-gray-600 hover:text-brand-sage-600 transition-colors"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Data Types Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Types de données collectées</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dataTypes.map((type, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="font-semibold text-brand-sage-700">{type.category}</h3>
                  <ul className="space-y-2">
                    {type.items.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-brand-sage-500 rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-brand-sage-100 rounded-lg flex items-center justify-center">
                    {React.createElement(section.icon, { 
                      className: 'w-6 h-6 text-brand-sage-600' 
                    })}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>
                <div className="space-y-4">
                  {section.content.map((paragraph, idx) => (
                    <p key={idx} className="text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <Card className="p-8 bg-brand-sage-50 border-brand-sage-200">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Exercer vos droits ou poser une question
              </h3>
              <p className="text-gray-600 mb-6">
                Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, 
                contactez notre délégué à la protection des données.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                <Button
                  variant="primary"
                  icon={<Mail className="w-4 h-4" />}
                  onClick={() => window.open('mailto:privacy@bynes.dz')}
                  className="w-full"
                >
                  Email
                </Button>
                <Button
                  variant="outline"
                  icon={<Phone className="w-4 h-4" />}
                  onClick={() => window.open('tel:+213794547080')}
                  className="w-full"
                >
                  Téléphone
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Rights Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8"
        >
          <Card className="p-8 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Résumé de vos droits
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      Droit d'accès à vos données
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      Droit de rectification
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      Droit à l'effacement
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      Droit à la portabilité
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      Droit d'opposition
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      Droit de limitation
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}