'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  Scale, 
  Users,
  Lock,
  Eye,
  ArrowLeft
} from 'lucide-react';
import { Button, Card } from '@/components/shared/ui';

export default function Terms() {
  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptation des conditions',
      icon: CheckCircle,
      content: [
        'En accédant et en utilisant le site web de ByNes, vous acceptez d\'être lié par ces conditions d\'utilisation.',
        'Si vous n\'acceptez pas ces conditions, veuillez ne pas utiliser notre site.',
        'Nous nous réservons le droit de modifier ces conditions à tout moment sans préavis.'
      ]
    },
    {
      id: 'services',
      title: 'Description des services',
      icon: FileText,
      content: [
        'ByNes fournit des solutions digitales incluant le développement web, l\'e-commerce et le marketing digital.',
        'Nos services sont destinés aux entreprises et aux particuliers souhaitant développer leur présence en ligne.',
        'La disponibilité des services peut varier selon les régions et les circonstances techniques.'
      ]
    },
    {
      id: 'user-obligations',
      title: 'Obligations de l\'utilisateur',
      icon: Users,
      content: [
        'Vous vous engagez à utiliser nos services de manière légale et éthique.',
        'Il est interdit d\'utiliser nos services pour des activités illégales ou nuisibles.',
        'Vous êtes responsable de maintenir la confidentialité de vos informations de compte.',
        'Toute utilisation abusive peut entraîner la suspension de votre accès.'
      ]
    },
    {
      id: 'intellectual-property',
      title: 'Propriété intellectuelle',
      icon: Shield,
      content: [
        'Tout le contenu présent sur ce site est protégé par les droits d\'auteur.',
        'Les marques, logos et designs sont la propriété exclusive de ByNes.',
        'Toute reproduction non autorisée est strictement interdite.',
        'Les clients conservent les droits sur leur contenu fourni.'
      ]
    },
    {
      id: 'liability',
      title: 'Limitation de responsabilité',
      icon: Scale,
      content: [
        'ByNes ne peut être tenu responsable des dommages indirects ou consécutifs.',
        'Notre responsabilité est limitée au montant payé pour nos services.',
        'Nous ne garantissons pas l\'absence d\'interruptions ou d\'erreurs.',
        'Les utilisateurs utilisent nos services à leurs propres risques.'
      ]
    },
    {
      id: 'termination',
      title: 'Résiliation',
      icon: AlertCircle,
      content: [
        'Ces conditions restent en vigueur jusqu\'à leur résiliation.',
        'Nous pouvons résilier votre accès en cas de violation des conditions.',
        'Vous pouvez cesser d\'utiliser nos services à tout moment.',
        'Certaines clauses survivront à la résiliation du contrat.'
      ]
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
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Conditions d'utilisation</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Veuillez lire attentivement ces conditions avant d'utiliser nos services
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
              {sections.map((section) => (
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
                Questions sur nos conditions ?
              </h3>
              <p className="text-gray-600 mb-6">
                Si vous avez des questions concernant ces conditions d'utilisation, 
                n'hésitez pas à nous contacter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="primary"
                  onClick={() => window.open('mailto:contact@bynes.dz')}
                >
                  Nous contacter par email
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open('tel:+213794547080')}
                >
                  Appeler maintenant
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}