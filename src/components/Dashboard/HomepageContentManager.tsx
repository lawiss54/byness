'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  Upload,
  Eye,
  EyeOff,
  Image,
  Type,
  Link,
  Tag,
  FileText,
  ArrowUp,
  ArrowDown,
  Copy,
  ExternalLink,
  Home,
  Layout
} from 'lucide-react';

// Mock components for demonstration
const Button = ({ children, variant = 'primary', size = 'md', icon, onClick, disabled, className = '', type = 'button', title = '' }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`
      inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
      ${size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2'}
      ${variant === 'outline' ? 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50' :
        variant === 'ghost' ? 'text-gray-600 hover:bg-gray-100' :
          'bg-blue-600 text-white hover:bg-blue-700'}
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      ${className}
    `}
  >
    {icon}
    {children}
  </button>
);

const Input = ({ value, onChange, placeholder, required, icon, className = '' }) => (
  <div className="relative">
    {icon && (
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        {icon}
      </div>
    )}
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${icon ? 'pl-10' : ''} ${className}`}
    />
  </div>
);

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, variant = 'default', size = 'md', className = '' }) => (
  <span className={`
    inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
    ${variant === 'success' ? 'bg-green-100 text-green-800' :
      variant === 'info' ? 'bg-blue-100 text-blue-800' :
        'bg-gray-100 text-gray-800'}
    ${size === 'sm' ? 'px-1.5 py-0.5 text-xs' : 'px-2 py-1 text-xs'}
    ${className}
  `}>
    {children}
  </span>
);

// Mock toast
const toast = {
  success: (message) => console.log('Success:', message),
  error: (message) => console.log('Error:', message)
};

interface ContentSection {
  id: string;
  title: string;
  badge: string;
  mainTitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface ContentFormData {
  title: string;
  badge: string;
  mainTitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  isActive: boolean;
}

export default function HomepageContentManager() {
  // State Management
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSection, setEditingSection] = useState<ContentSection | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [bottunLoading, setBottunLoading] = useState(false);
  const [status, setStatus] = useState();
  const [statusButton, setStatusButton] = useState(false);

  // Form State
  const [formData, setFormData] = useState<ContentFormData>({
    title: '',
    badge: '',
    mainTitle: '',
    description: '',
    buttonText: '',
    buttonLink: '',
    image: '',
    isActive: true
  });

  // Load sections on component mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    loadSections();
  }, []);

  const loadSections = async () => {
    try {
      setLoading(true);
      // Simulate API call
      const res = await fetch('/api/contant', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (res.ok) {
        toast.error("Réponse serveur invalide")
      }

      const response = await res.json();
      toast.success(response.message);


      const defaultSections: ContentSection[] = response.data
      setSections(defaultSections);
    } catch (error) {
      toast.error('Erreur lors du chargement du contenu');
    } finally {
      setLoading(false);
    }
  };

  const saveSections = async (updatedSections: ContentSection[]) => {
    try {
      setLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log(updatedSections)

      setSections(updatedSections);
      toast.success('Contenu sauvegardé avec succès');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde du contenu');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData(prev => ({
        ...prev,
        image: e.target?.result as string
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // التحقق من الحقول المطلوبة
    if (!formData.mainTitle.trim()) {
      toast.error('الرجاء إدخال العنوان الرئيسي');
      return;
    }

    if (!formData.description.trim()) {
      toast.error('الرجاء إدخال الوصف');
      return;
    }

    try {
      setBottunLoading(true);

      // إنشاء كائن البيانات
      const sectionData = {
        title: formData.title.trim(),
        badge: formData.badge.trim(),
        mainTitle: formData.mainTitle.trim(),
        description: formData.description.trim(),
        buttonText: formData.buttonText.trim(),
        buttonLink: formData.buttonLink.trim(),
        image: formData.image,
        isActive: formData.isActive
      };

      let response;
      let newSection: ContentSection;

      if (editingSection) {
        // تحديث القسم الموجود
        response = await fetch(`/api/contant/${editingSection.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(sectionData)
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "خطأ في تحديث القسم");
        }

        const result = await response.json();

        // إنشاء القسم المحدث
        newSection = {
          ...editingSection,
          ...sectionData,
          updatedAt: new Date().toISOString()
        };

        // تحديث القائمة المحلية
        const updatedSections = sections.map(section =>
          section.id === editingSection.id ? newSection : section
        );

        setSections(updatedSections);
        toast.success(result.message || 'تم تحديث القسم بنجاح');

      } else {
        // إنشاء قسم جديد
        const response = await fetch('/api/contant', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(sectionData)
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "خطأ في إنشاء القسم");
        }

        const result = await response.json();

        // إنشاء القسم الجديد
        newSection = {
          id: result.data?.id || Date.now().toString(),
          ...sectionData,
          order: sections.length + 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        // إضافة القسم الجديد للقائمة
        setSections(prevSections => [...prevSections, newSection]);
        toast.success(result.message || 'تم إنشاء القسم بنجاح');
      }

      // إعادة تعيين النموذج
      resetForm();

    } catch (error) {
      console.error('خطأ في handleSubmit:', error);

      // معالجة أنواع مختلفة من الأخطاء
      if (error instanceof TypeError && error.message.includes('fetch')) {
        toast.error('خطأ في الاتصال بالخادم. الرجاء المحاولة مرة أخرى.');
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('حدث خطأ غير متوقع');
      }
    } finally {
      setBottunLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      badge: '',
      mainTitle: '',
      description: '',
      buttonText: '',
      buttonLink: '',
      image: '',
      isActive: true
    });
    setEditingSection(null);
    setShowForm(false);
  };

  const handleEdit = (section: ContentSection) => {
    setFormData({
      title: section.title,
      badge: section.badge,
      mainTitle: section.mainTitle,
      description: section.description,
      buttonText: section.buttonText,
      buttonLink: section.buttonLink,
      image: section.image,
      isActive: section.isActive
    });
    setEditingSection(section);
    setShowForm(true);
  };

  const handleDelete = async (sectionId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce contenu ?')) {
      setBottunLoading(true)
      const res = await fetch(`/api/contant/${sectionId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
      if (!res.ok) {
        toast.error("Une erreur s'est produite lors de la connexion au serveur");
      }
      const response = await res.json();
      toast.success(response.message)
      const updatedSections = sections.filter(section => section.id !== sectionId);
      await saveSections(updatedSections);
      setBottunLoading(false)
    }
  };

  const handleToggleActive = async (sectionId: string) => {
  let newActiveStatus: boolean;
 
  try {
    setStatusButton(true)
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        newActiveStatus = !section.isActive;
        return { ...section, isActive: newActiveStatus, updatedAt: new Date().toISOString() };
      }
      return section;
    });
  

  
    const res = await fetch(`/api/contant/status/${sectionId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ status: newActiveStatus }), // إرسال الحالة الجديدة
    });

    if (!res.ok) {
      setStatusButton(false)
      toast.error("Une erreur s'est produite lors de la connexion au serveur");
      return;
    }

    const response = await res.json();
    toast.success(response.message);
    await saveSections(updatedSections);
    setStatusButton(false)
  } catch (error) {
    setstatusButton(false)
    toast.error("Une erreur s'est produite lors de la connexion au serveur");
  }
};
  const handleReorder = async (sectionId: string, direction: 'up' | 'down') => {
    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    if (
      (direction === 'up' && sectionIndex === 0) ||
      (direction === 'down' && sectionIndex === sections.length - 1)
    ) {
      return;
    }

    const newSections = [...sections];
    const targetIndex = direction === 'up' ? sectionIndex - 1 : sectionIndex + 1;

    [newSections[sectionIndex], newSections[targetIndex]] =
      [newSections[targetIndex], newSections[sectionIndex]];

    // Update order numbers
    newSections.forEach((section, index) => {
      section.order = index + 1;
      section.updatedAt = new Date().toISOString();
    });

    const res = await fetch('/api/contant/order', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({sections: newSections})
    });
    if (!res.ok) {
      toast.error("Une erreur s'est produite lors de la connexion au serveur")
    }
    const response = await res.json();
    toast.success(response.message)

    await saveSections(newSections);
  };



  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-6 p-6 bg-gray-50">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion du contenu de la page d'accueil</h1>
          <p className="text-gray-600 mt-2">Ajouter et modifier les sections de contenu de la page d'accueil</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            icon={previewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? 'Masquer aperçu' : 'Aperçu'}
          </Button>
          <Button
            onClick={() => setShowForm(true)}
            icon={<Plus className="w-4 h-4" />}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Ajouter nouveau contenu
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total sections</p>
              <p className="text-2xl font-bold text-gray-900">{sections?.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Layout className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sections actives</p>
              <p className="text-2xl font-bold text-green-600">{sections?.filter(s => s.isActive).length}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sections masquées</p>
              <p className="text-2xl font-bold text-gray-600">{sections?.filter(s => !s?.isActive)?.length}</p>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <EyeOff className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Dernière mise à jour</p>
              <p className="text-sm font-medium text-gray-900">
                {sections?.length > 0
                  ? new Date(Math.max(...sections?.map(s => new Date(s.updatedAt)?.getTime()))).toLocaleDateString('fr-FR')
                  : 'Aucune'
                }
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Content Sections List */}
      <Card className="overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Sections de contenu</h2>
        </div>

        {sections?.length === 0 ? (
          <div className="p-12 text-center">
            <Layout className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune section de contenu</h3>
            <p className="text-gray-500 mb-6">Commencez par ajouter une nouvelle section de contenu à la page d'accueil</p>
            <Button
              onClick={() => setShowForm(true)}
              icon={<Plus className="w-4 h-4" />}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Ajouter première section
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {sections
              ?.sort((a, b) => a.order - b.order)
              ?.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6"
                >
                  <div className="flex items-start gap-6">
                    {/* Section Image */}
                    <div className="flex-shrink-0">
                      {section.image ? (
                        <img
                          src={section.image}
                          alt={section.mainTitle}
                          className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                          <Image className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Section Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {section.title || section.mainTitle}
                          </h3>
                          {section.badge && (
                            <Badge variant="info" size="sm">{section.badge}</Badge>
                          )}
                          <Badge variant={section.isActive ? 'success' : 'default'} size="sm">
                            {section.isActive ? 'Actif' : 'Masqué'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">Ordre: {section.order}</span>
                        </div>
                      </div>

                      <h4 className="text-xl font-bold text-gray-900 mb-2">{section.mainTitle}</h4>
                      <p className="text-gray-600 mb-4 line-clamp-2">{section.description}</p>

                      {section.buttonText && (
                        <div className="flex items-center gap-2 mb-4">
                          <Button size="sm" variant="outline" className="pointer-events-none">
                            {section.buttonText}
                          </Button>
                          {section.buttonLink && (
                            <a
                              href={section.buttonLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      )}

                      <div className="text-sm text-gray-500">
                        Créé le: {new Date(section.createdAt).toLocaleDateString('fr-FR')} |
                        Dernière mise à jour: {new Date(section.updatedAt).toLocaleDateString('fr-FR')}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          icon={<ArrowUp className="w-4 h-4" />}
                          onClick={() => handleReorder(section.id, 'up')}
                          disabled={index === 0}
                          title="Déplacer vers le haut"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          icon={<ArrowDown className="w-4 h-4" />}
                          onClick={() => handleReorder(section.id, 'down')}
                          disabled={index === sections.length - 1}
                          title="Déplacer vers le bas"
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          icon={<Edit className="w-4 h-4" />}
                          onClick={() => handleEdit(section)}
                          title="Modifier"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          icon={
                            statusButton ? (
                              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              section.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />
                            )
                          }
                          onClick={() => handleToggleActive(section.id)}
                          title={section.isActive ? 'Afficher' : 'Masquer'}
                          disabled={statusButton}
                        />
                      </div>
                      <div className="flex items-center gap-1">

                        <Button
                          size="sm"
                          variant="ghost"
                          icon={
                            bottunLoading ? (
                              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )
                          }
                          onClick={() => handleDelete(section.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          title="Supprimer"
                          disabled={bottunLoading}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        )}
      </Card>

      {/* Preview Mode */}
      {previewMode && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Aperçu de la page d'accueil</h2>
              <p className="text-gray-600">Comment les sections apparaîtront sur la page d'accueil</p>
            </div>
          </div>

          <div className="space-y-8">
            {sections
              .filter(section => section.isActive)
              .sort((a, b) => a.order - b.order)
              .map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                      {section.badge && (
                        <Badge variant="info" className="w-fit">
                          {section.badge}
                        </Badge>
                      )}
                      <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                        {section.mainTitle}
                      </h2>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {section.description}
                      </p>
                      {section.buttonText && (
                        <Button
                          className="bg-blue-600 hover:bg-blue-700"
                          icon={<ExternalLink className="w-4 h-4" />}
                        >
                          {section.buttonText}
                        </Button>
                      )}
                    </div>
                    {section.image && (
                      <div className="order-first lg:order-last">
                        <img
                          src={section.image}
                          alt={section.mainTitle}
                          className="w-full h-64 lg:h-80 object-cover rounded-xl shadow-lg"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
          </div>
        </Card>
      )}

      {/* Add/Edit Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={(e) => e.target === e.currentTarget && resetForm()}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingSection ? 'Modifier le contenu' : 'Ajouter nouveau contenu'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre de la section (optionnel)
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Exemple: Section Hero"
                    icon={<Type className="w-4 h-4" />}
                  />
                </div>

                {/* Badge */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Badge (optionnel)
                  </label>
                  <Input
                    value={formData.badge}
                    onChange={(e) => setFormData(prev => ({ ...prev, badge: e.target.value }))}
                    placeholder="Exemple: Nouveau, Recommandé, Offre spéciale"
                    icon={<Tag className="w-4 h-4" />}
                  />
                </div>

                {/* Main Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre principal *
                  </label>
                  <Input
                    value={formData.mainTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, mainTitle: e.target.value }))}
                    placeholder="Le titre qui apparaîtra sur la page"
                    required
                    icon={<Type className="w-4 h-4" />}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Description détaillée du contenu"
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Button Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Texte du bouton (optionnel)
                  </label>
                  <Input
                    value={formData.buttonText}
                    onChange={(e) => setFormData(prev => ({ ...prev, buttonText: e.target.value }))}
                    placeholder="Exemple: En savoir plus"
                    icon={<FileText className="w-4 h-4" />}
                  />
                </div>

                {/* Button Link */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lien du bouton (optionnel)
                  </label>
                  <Input
                    value={formData.buttonLink}
                    onChange={(e) => setFormData(prev => ({ ...prev, buttonLink: e.target.value }))}
                    placeholder="Exemple: /services ou https://exemple.com"
                    icon={<Link className="w-4 h-4" />}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image (optionnel)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    {formData.image ? (
                      <div className="space-y-4">
                        <img
                          src={formData.image}
                          alt="Aperçu"
                          className="max-h-40 mx-auto rounded-lg"
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                        >
                          Supprimer l'image
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 mx-auto text-gray-400" />
                        <div>
                          <label className="cursor-pointer">
                            <span className="text-blue-600 hover:text-blue-700">
                              Choisir un fichier
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload(file);
                              }}
                            />
                          </label>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG jusqu'à 5MB</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bouton d'activation */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="w-4 h-4 text-brand-camel-600 rounded focus:ring-brand-camel-500"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                    Afficher ce contenu sur la page d'accueil
                  </label>
                </div>

                {/* Actions du formulaire */}
                <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    disabled={bottunLoading}
                    icon={<Save className="w-4 h-4" />}
                    className="bg-brand-camel-500 hover:bg-brand-camel-600"
                  >
                    {bottunLoading ? 'Enregistrement en cours...' : (editingSection ? 'Mettre à jour' : 'Enregistrer')}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}