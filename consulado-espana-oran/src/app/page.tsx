// ============================================================================
// CONSULADO GENERAL DE ESPAÑA EN ORÁN - PÁGINA PRINCIPAL
// ============================================================================

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calendar,
  FileText,
  Globe,
  Users,
  Shield,
  Clock,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle,
  Star,
  Stamp,
  Flag,
  PenTool,
  FileCheck,
  Vote,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CONSULATE_INFO, SERVICE_CATEGORIES } from '@/config/consulate';

// Servicios destacados
const featuredServices = [
  {
    icon: Globe,
    title: 'Pasaportes',
    description: 'Expedición y renovación de pasaportes españoles',
    href: '/servicios/pasaportes',
    color: 'bg-red-500',
  },
  {
    icon: Stamp,
    title: 'Visados',
    description: 'Visados Schengen, nacionales y reagrupación familiar',
    href: '/servicios/visados',
    color: 'bg-yellow-500',
  },
  {
    icon: FileText,
    title: 'Registro Civil',
    description: 'Nacimientos, matrimonios y defunciones',
    href: '/servicios/registro-civil',
    color: 'bg-blue-500',
  },
  {
    icon: Flag,
    title: 'Nacionalidad',
    description: 'Nacionalidad española por origen o residencia',
    href: '/servicios/nacionalidad',
    color: 'bg-green-500',
  },
  {
    icon: PenTool,
    title: 'Notaría',
    description: 'Poderes, fe de vida y actas notariales',
    href: '/servicios/notaria',
    color: 'bg-purple-500',
  },
  {
    icon: FileCheck,
    title: 'Legalizaciones',
    description: 'Legalización y compulsa de documentos',
    href: '/servicios/legalizaciones',
    color: 'bg-orange-500',
  },
];

// Estadísticas del consulado
const stats = [
  { value: '12', label: 'Wilayas de jurisdicción' },
  { value: '20+', label: 'Servicios disponibles' },
  { value: '50+', label: 'Citas diarias' },
  { value: '24/7', label: 'Emergencias' },
];

// Proceso de cita
const bookingSteps = [
  { step: 1, title: 'Regístrese', description: 'Cree su cuenta con sus datos personales' },
  { step: 2, title: 'Elija servicio', description: 'Seleccione el trámite que necesita realizar' },
  { step: 3, title: 'Reserve fecha', description: 'Escoja día y hora disponible' },
  { step: 4, title: 'Confirme', description: 'Reciba confirmación por email' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-red-500/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-2 mb-6">
                <Shield className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 text-sm font-medium">Sitio Oficial del Gobierno de España</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Consulado General de{' '}
                <span className="text-yellow-400">España</span>{' '}
                en Orán
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Su portal oficial para trámites consulares, citas previas y servicios 
                para ciudadanos españoles y solicitantes de visados en el oeste de Argelia.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/citas">
                  <Button size="xl" className="w-full sm:w-auto group">
                    <Calendar className="mr-2 h-5 w-5" />
                    Solicitar Cita Previa
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/servicios">
                  <Button size="xl" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10">
                    Ver Servicios
                  </Button>
                </Link>
              </div>
              
              {/* Quick Info */}
              <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <Clock className="h-5 w-5 text-yellow-400" />
                  <span>Lun-Jue: 08:30-14:30</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="h-5 w-5 text-yellow-400" />
                  <span>{CONSULATE_INFO.phone}</span>
                </div>
              </div>
            </motion.div>
            
            {/* Hero Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <Card variant="glass" className="p-8 bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl text-white">Acceso Rápido</CardTitle>
                  <CardDescription className="text-gray-300">
                    Gestione sus trámites de forma segura
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <Link href="/citas" className="block">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-red-400" />
                        </div>
                        <span className="text-white font-medium">Nueva Cita</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                  
                  <Link href="/mi-cuenta/citas" className="block">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-400" />
                        </div>
                        <span className="text-white font-medium">Mis Citas</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                  
                  <Link href="/servicios/visados" className="block">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                          <Stamp className="h-5 w-5 text-yellow-400" />
                        </div>
                        <span className="text-white font-medium">Visados</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                  
                  <Link href="/contacto" className="block">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                          <Phone className="h-5 w-5 text-green-400" />
                        </div>
                        <span className="text-white font-medium">Contacto</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-gradient-to-r from-red-700 to-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ofrecemos una amplia gama de servicios consulares para ciudadanos 
              españoles y extranjeros en nuestra demarcación
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={service.href}>
                  <Card className="h-full card-hover cursor-pointer group">
                    <CardContent className="p-6">
                      <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <service.icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-700 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600">
                        {service.description}
                      </p>
                      <div className="mt-4 flex items-center text-red-600 font-medium">
                        Más información
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/servicios">
              <Button variant="outline" size="lg">
                Ver todos los servicios
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How to Book Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Cómo solicitar una cita?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Siga estos sencillos pasos para reservar su cita previa de forma segura
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bookingSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Connector Line */}
                {index < bookingSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-red-200" />
                )}
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/citas">
              <Button size="xl">
                <Calendar className="mr-2 h-5 w-5" />
                Comenzar ahora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Encuéntrenos
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Dirección</h3>
                    <p className="text-gray-300">{CONSULATE_INFO.fullAddress}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Horario de Atención</h3>
                    <p className="text-gray-300">{CONSULATE_INFO.openingHours.general.weekdays}</p>
                    <p className="text-gray-400 text-sm">{CONSULATE_INFO.openingHours.general.closed}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Contacto</h3>
                    <p className="text-gray-300">Tel: {CONSULATE_INFO.phone}</p>
                    <p className="text-gray-300">Email: {CONSULATE_INFO.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Emergencias 24h</h3>
                    <p className="text-yellow-400 font-semibold text-xl">{CONSULATE_INFO.emergencyPhone}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <a 
                  href={CONSULATE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" size="lg">
                    <MapPin className="mr-2 h-5 w-5" />
                    Ver en Google Maps
                  </Button>
                </a>
              </div>
            </motion.div>
            
            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden bg-gray-800"
            >
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3253.8!2d${CONSULATE_INFO.coordinates.longitude}!3d${CONSULATE_INFO.coordinates.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQxJzUxLjQiTiAwwrAzOCcwMS4zIlc!5e0!3m2!1ses!2s!4v1234567890`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Necesita realizar un trámite?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Reserve su cita previa ahora y evite esperas innecesarias
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/citas">
                <Button size="xl" variant="secondary" className="w-full sm:w-auto">
                  <Calendar className="mr-2 h-5 w-5" />
                  Solicitar Cita Previa
                </Button>
              </Link>
              <Link href="/contacto">
                <Button size="xl" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10">
                  <Phone className="mr-2 h-5 w-5" />
                  Contactar
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
