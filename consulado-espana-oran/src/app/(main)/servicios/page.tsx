// ============================================================================
// CONSULADO GENERAL DE ESPAÑA EN ORÁN - PÁGINA DE SERVICIOS
// ============================================================================

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Globe,
  Stamp,
  FileText,
  Flag,
  PenTool,
  FileCheck,
  Vote,
  Shield,
  MoreHorizontal,
  Clock,
  CreditCard,
  ArrowRight,
  Search,
  ChevronRight,
  Info,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils/cn';
import { SERVICE_CATEGORIES } from '@/config/consulate';

const categoryIcons = {
  PASAPORTES: Globe,
  VISADOS: Stamp,
  REGISTRO_CIVIL: FileText,
  NACIONALIDAD: Flag,
  NOTARIA: PenTool,
  LEGALIZACIONES: FileCheck,
  CENSO_ELECTORAL: Vote,
  PROTECCION_CONSULAR: Shield,
  OTROS: MoreHorizontal,
};

const services = [
  // PASAPORTES
  {
    id: 'pasaporte-nuevo',
    category: 'PASAPORTES',
    name: 'Expedición de Pasaporte',
    description: 'Solicitud de nuevo pasaporte español para ciudadanos españoles residentes en la demarcación consular.',
    duration: 30,
    price: 30,
    requirements: [
      'DNI o pasaporte anterior (original y copia)',
      'Fotografía reciente tamaño carnet (32x26mm)',
      'Justificante de pago de tasas consulares',
      'Certificado de empadronamiento consular',
    ],
  },
  {
    id: 'pasaporte-renovacion',
    category: 'PASAPORTES',
    name: 'Renovación de Pasaporte',
    description: 'Renovación de pasaporte español caducado o próximo a caducar (menos de 6 meses de validez).',
    duration: 30,
    price: 30,
    requirements: [
      'Pasaporte anterior (original)',
      'Fotografía reciente tamaño carnet',
      'Justificante de pago de tasas',
    ],
  },
  // VISADOS
  {
    id: 'visado-schengen',
    category: 'VISADOS',
    name: 'Visado Schengen',
    description: 'Visado de corta duración (máximo 90 días) para turismo, negocios o visita familiar en el espacio Schengen.',
    duration: 20,
    price: 80,
    requirements: [
      'Pasaporte válido (mínimo 6 meses)',
      'Formulario de solicitud cumplimentado',
      '2 fotografías recientes',
      'Seguro médico de viaje (mínimo 30.000€)',
      'Prueba de alojamiento',
      'Prueba de medios económicos',
      'Reserva de vuelo',
    ],
  },
  {
    id: 'visado-nacional',
    category: 'VISADOS',
    name: 'Visado Nacional (Tipo D)',
    description: 'Visado de larga duración para residencia, estudios, trabajo o reagrupación familiar en España.',
    duration: 30,
    price: 60,
    requirements: [
      'Pasaporte válido',
      'Formulario de solicitud',
      'Fotografías',
      'Certificado de antecedentes penales',
      'Certificado médico',
      'Documentación específica según tipo',
    ],
  },
  {
    id: 'visado-reagrupacion',
    category: 'VISADOS',
    name: 'Visado Reagrupación Familiar',
    description: 'Visado para familiares de residentes españoles o ciudadanos de la UE.',
    duration: 30,
    price: 60,
    requirements: [
      'Resolución favorable de reagrupación',
      'Pasaporte válido',
      'Certificados de parentesco legalizados',
      'Certificado de antecedentes penales',
      'Certificado médico',
    ],
  },
  // REGISTRO CIVIL
  {
    id: 'inscripcion-nacimiento',
    category: 'REGISTRO_CIVIL',
    name: 'Inscripción de Nacimiento',
    description: 'Inscripción en el Registro Civil español de hijos de españoles nacidos en el extranjero.',
    duration: 30,
    price: 0,
    requirements: [
      'Certificado de nacimiento local legalizado y traducido',
      'DNI/Pasaporte de los padres',
      'Libro de familia (si existe)',
      'Certificado de matrimonio (si aplica)',
    ],
  },
  {
    id: 'inscripcion-matrimonio',
    category: 'REGISTRO_CIVIL',
    name: 'Inscripción de Matrimonio',
    description: 'Inscripción de matrimonio celebrado en el extranjero cuando uno de los cónyuges es español.',
    duration: 45,
    price: 0,
    requirements: [
      'Certificado de matrimonio legalizado y traducido',
      'DNI/Pasaporte de ambos cónyuges',
      'Certificados de nacimiento de ambos',
      'Certificado de soltería (si aplica)',
    ],
  },
  {
    id: 'inscripcion-defuncion',
    category: 'REGISTRO_CIVIL',
    name: 'Inscripción de Defunción',
    description: 'Inscripción del fallecimiento de ciudadanos españoles ocurrido en el extranjero.',
    duration: 30,
    price: 0,
    requirements: [
      'Certificado de defunción local',
      'DNI/Pasaporte del fallecido',
      'Libro de familia',
    ],
  },
  // NACIONALIDAD
  {
    id: 'nacionalidad-origen',
    category: 'NACIONALIDAD',
    name: 'Nacionalidad por Origen',
    description: 'Solicitud de nacionalidad española para hijos y nietos de españoles (Ley de Memoria Democrática).',
    duration: 45,
    price: 0,
    requirements: [
      'Certificado de nacimiento propio',
      'Certificado de nacimiento del progenitor/abuelo español',
      'DNI/Pasaporte del progenitor/abuelo',
      'Certificado de matrimonio de padres/abuelos',
    ],
  },
  // NOTARÍA
  {
    id: 'poderes-notariales',
    category: 'NOTARIA',
    name: 'Poderes Notariales',
    description: 'Otorgamiento de poderes generales o especiales ante el Cónsul como notario.',
    duration: 30,
    price: 45,
    requirements: [
      'DNI/Pasaporte en vigor',
      'Datos completos del apoderado',
      'Borrador del poder (recomendado)',
    ],
  },
  {
    id: 'fe-de-vida',
    category: 'NOTARIA',
    name: 'Fe de Vida',
    description: 'Certificación de que el interesado está vivo, necesaria para pensiones, seguros, etc.',
    duration: 15,
    price: 0,
    requirements: [
      'DNI/Pasaporte en vigor',
      'Documento que solicita la fe de vida (si aplica)',
    ],
  },
  // LEGALIZACIONES
  {
    id: 'legalizacion',
    category: 'LEGALIZACIONES',
    name: 'Legalización de Documentos',
    description: 'Legalización de documentos públicos argelinos para su uso en España.',
    duration: 15,
    price: 8,
    requirements: [
      'Documento original a legalizar',
      'Documento previamente legalizado por Ministerio argelino',
    ],
  },
  {
    id: 'compulsa',
    category: 'LEGALIZACIONES',
    name: 'Compulsa de Documentos',
    description: 'Certificación de copia conforme con el original.',
    duration: 10,
    price: 5,
    requirements: [
      'Documento original',
      'Copia a compulsar',
    ],
  },
  // CENSO ELECTORAL
  {
    id: 'empadronamiento',
    category: 'CENSO_ELECTORAL',
    name: 'Empadronamiento Consular',
    description: 'Alta o actualización en el Registro de Matrícula Consular (RMC).',
    duration: 20,
    price: 0,
    requirements: [
      'DNI/Pasaporte',
      'Justificante de domicilio en Argelia',
      'Fotografía reciente',
    ],
  },
  {
    id: 'cera',
    category: 'CENSO_ELECTORAL',
    name: 'Alta en Censo Electoral (CERA)',
    description: 'Inscripción en el Censo Electoral de Residentes Ausentes para votar desde el extranjero.',
    duration: 20,
    price: 0,
    requirements: [
      'DNI/Pasaporte',
      'Estar empadronado en el consulado',
      'Formulario de solicitud',
    ],
  },
  // PROTECCIÓN CONSULAR
  {
    id: 'emergencia',
    category: 'PROTECCION_CONSULAR',
    name: 'Emergencia Consular',
    description: 'Asistencia en situaciones de emergencia: pérdida de documentos, accidentes, repatriación.',
    duration: 45,
    price: 0,
    requirements: [
      'Identificación disponible',
      'Denuncia policial (si aplica)',
    ],
  },
  // OTROS
  {
    id: 'antecedentes',
    category: 'OTROS',
    name: 'Antecedentes Penales',
    description: 'Solicitud de certificado de antecedentes penales españoles.',
    duration: 15,
    price: 0,
    requirements: [
      'DNI/Pasaporte',
      'Formulario de solicitud',
      'Toma de huellas dactilares',
    ],
  },
];

export default function ServiciosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const filteredServices = services.filter((service) => {
    const matchesSearch = 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedServices = filteredServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof services>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-700 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Servicios Consulares
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Conozca todos los trámites y servicios que ofrecemos en el Consulado General 
              de España en Orán para ciudadanos españoles y extranjeros.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar servicios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-4 focus:ring-white/30 focus:outline-none"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                selectedCategory === null
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              Todos los servicios
            </button>
            {Object.entries(SERVICE_CATEGORIES).map(([key, cat]) => {
              const Icon = categoryIcons[key as keyof typeof categoryIcons];
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                    selectedCategory === key
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  )}
                >
                  <Icon size={16} />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.entries(groupedServices).map(([category, categoryServices]) => {
            const categoryInfo = SERVICE_CATEGORIES[category as keyof typeof SERVICE_CATEGORIES];
            const Icon = categoryIcons[category as keyof typeof categoryIcons];
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${categoryInfo.color}20` }}
                  >
                    <Icon size={24} style={{ color: categoryInfo.color }} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{categoryInfo.name}</h2>
                    <p className="text-gray-600">{categoryInfo.description}</p>
                  </div>
                </div>

                <div className="grid gap-4">
                  {categoryServices.map((service) => (
                    <Card
                      key={service.id}
                      className={cn(
                        'cursor-pointer transition-all',
                        expandedService === service.id ? 'ring-2 ring-red-500' : 'hover:shadow-lg'
                      )}
                      onClick={() =>
                        setExpandedService(
                          expandedService === service.id ? null : service.id
                        )
                      }
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {service.name}
                            </h3>
                            <p className="text-gray-600 mb-4">{service.description}</p>
                            
                            <div className="flex flex-wrap items-center gap-4 text-sm">
                              <span className="flex items-center gap-1.5 text-gray-500">
                                <Clock size={16} />
                                {service.duration} min
                              </span>
                              <span className="flex items-center gap-1.5 text-gray-500">
                                <CreditCard size={16} />
                                {service.price > 0 ? `${service.price}€` : 'Gratuito'}
                              </span>
                            </div>
                          </div>
                          
                          <ChevronRight
                            size={24}
                            className={cn(
                              'text-gray-400 transition-transform flex-shrink-0 ml-4',
                              expandedService === service.id && 'rotate-90'
                            )}
                          />
                        </div>

                        {expandedService === service.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-6 pt-6 border-t"
                          >
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <Info size={18} className="text-red-600" />
                              Documentación requerida
                            </h4>
                            <ul className="space-y-2 mb-6">
                              {service.requirements.map((req, index) => (
                                <li key={index} className="flex items-start gap-2 text-gray-600">
                                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                                  {req}
                                </li>
                              ))}
                            </ul>
                            
                            <Link href={`/citas?service=${service.id}`}>
                              <Button className="w-full sm:w-auto">
                                <Calendar className="mr-2 h-4 w-4" />
                                Solicitar Cita
                              </Button>
                            </Link>
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No se encontraron servicios
              </h3>
              <p className="text-gray-600">
                Intente con otros términos de búsqueda o seleccione otra categoría.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Necesita realizar un trámite?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Reserve su cita previa ahora y evite esperas innecesarias
          </p>
          <Link href="/citas">
            <Button size="xl" variant="secondary">
              <Calendar className="mr-2 h-5 w-5" />
              Solicitar Cita Previa
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
