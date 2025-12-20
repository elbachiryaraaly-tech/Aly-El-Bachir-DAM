// ============================================================================
// CONSULADO GENERAL DE ESPAÑA EN ORÁN - PÁGINA DE CITAS
// Sistema de reservas completo
// ============================================================================

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  FileText,
  User,
  Mail,
  Phone,
  Globe,
  CreditCard,
  Shield,
  ArrowRight,
  Info,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils/cn';
import { SERVICE_CATEGORIES } from '@/config/consulate';

// Servicios disponibles para cita
const services = [
  {
    id: 'pasaporte-nuevo',
    category: 'PASAPORTES',
    name: 'Expedición de Pasaporte',
    description: 'Solicitud de nuevo pasaporte español',
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
    description: 'Renovación de pasaporte caducado o próximo a caducar',
    duration: 30,
    price: 30,
    requirements: [
      'Pasaporte anterior (original)',
      'Fotografía reciente tamaño carnet',
      'Justificante de pago de tasas',
    ],
  },
  {
    id: 'visado-schengen',
    category: 'VISADOS',
    name: 'Visado Schengen',
    description: 'Visado de corta duración para espacio Schengen',
    duration: 20,
    price: 80,
    requirements: [
      'Pasaporte válido (mínimo 6 meses)',
      'Formulario de solicitud cumplimentado',
      'Fotografías recientes',
      'Seguro médico de viaje',
      'Prueba de alojamiento',
      'Prueba de medios económicos',
      'Reserva de vuelo',
    ],
  },
  {
    id: 'visado-nacional',
    category: 'VISADOS',
    name: 'Visado Nacional',
    description: 'Visado de larga duración para residencia en España',
    duration: 30,
    price: 60,
    requirements: [
      'Pasaporte válido',
      'Formulario de solicitud',
      'Fotografías',
      'Certificado de antecedentes penales',
      'Certificado médico',
      'Prueba de medios económicos',
    ],
  },
  {
    id: 'inscripcion-nacimiento',
    category: 'REGISTRO_CIVIL',
    name: 'Inscripción de Nacimiento',
    description: 'Inscripción de hijos de españoles nacidos en el extranjero',
    duration: 30,
    price: 0,
    requirements: [
      'Certificado de nacimiento local legalizado',
      'DNI/Pasaporte de los padres',
      'Libro de familia',
    ],
  },
  {
    id: 'inscripcion-matrimonio',
    category: 'REGISTRO_CIVIL',
    name: 'Inscripción de Matrimonio',
    description: 'Inscripción de matrimonio celebrado en el extranjero',
    duration: 45,
    price: 0,
    requirements: [
      'Certificado de matrimonio legalizado',
      'DNI/Pasaporte de ambos cónyuges',
      'Certificados de nacimiento',
    ],
  },
  {
    id: 'nacionalidad-origen',
    category: 'NACIONALIDAD',
    name: 'Nacionalidad por Origen',
    description: 'Solicitud de nacionalidad para hijos y nietos de españoles',
    duration: 45,
    price: 0,
    requirements: [
      'Certificado de nacimiento',
      'Certificado de nacimiento del progenitor español',
      'DNI/Pasaporte del progenitor',
    ],
  },
  {
    id: 'poderes-notariales',
    category: 'NOTARIA',
    name: 'Poderes Notariales',
    description: 'Otorgamiento de poderes ante el Cónsul',
    duration: 30,
    price: 45,
    requirements: [
      'DNI/Pasaporte en vigor',
      'Datos del apoderado',
      'Borrador del poder (si dispone)',
    ],
  },
  {
    id: 'fe-de-vida',
    category: 'NOTARIA',
    name: 'Fe de Vida',
    description: 'Certificación de que el interesado está vivo',
    duration: 15,
    price: 0,
    requirements: [
      'DNI/Pasaporte en vigor',
    ],
  },
  {
    id: 'legalizacion',
    category: 'LEGALIZACIONES',
    name: 'Legalización de Documentos',
    description: 'Legalización de documentos públicos argelinos',
    duration: 15,
    price: 8,
    requirements: [
      'Documento original a legalizar',
      'Documento previamente legalizado por autoridad argelina',
    ],
  },
  {
    id: 'empadronamiento',
    category: 'CENSO_ELECTORAL',
    name: 'Empadronamiento Consular',
    description: 'Alta en el Registro de Matrícula Consular',
    duration: 20,
    price: 0,
    requirements: [
      'DNI/Pasaporte',
      'Justificante de domicilio en Argelia',
      'Fotografía reciente',
    ],
  },
  {
    id: 'antecedentes-penales',
    category: 'OTROS',
    name: 'Antecedentes Penales',
    description: 'Solicitud de certificado de antecedentes penales',
    duration: 15,
    price: 0,
    requirements: [
      'DNI/Pasaporte',
      'Formulario de solicitud',
      'Huellas dactilares',
    ],
  },
];

// Generar slots de tiempo disponibles
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 8; hour < 14; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 8 && minute === 0) continue; // Empieza a las 8:30
      if (hour === 13 && minute === 30) continue; // Último slot a las 14:00
      slots.push({
        time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
        available: Math.random() > 0.3, // Simular disponibilidad
      });
    }
  }
  return slots;
};

// Generar calendario del mes
const generateCalendarDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();
  
  const days: Array<{ date: number; available: boolean; isToday: boolean; isPast: boolean }> = [];
  const today = new Date();
  
  // Días vacíos al inicio
  for (let i = 0; i < (startingDay === 0 ? 6 : startingDay - 1); i++) {
    days.push({ date: 0, available: false, isToday: false, isPast: true });
  }
  
  // Días del mes
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(year, month, day);
    const dayOfWeek = currentDate.getDay();
    const isPast = currentDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const isToday = currentDate.toDateString() === today.toDateString();
    // Viernes (5), Sábado (6), Domingo (0) no disponibles
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6;
    
    days.push({
      date: day,
      available: !isPast && !isWeekend && Math.random() > 0.2,
      isToday,
      isPast,
    });
  }
  
  return days;
};

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const WEEKDAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

export default function CitasPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  
  const [calendarDate, setCalendarDate] = useState(new Date());
  const calendarDays = generateCalendarDays(calendarDate.getFullYear(), calendarDate.getMonth());
  const timeSlots = generateTimeSlots();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    documentType: 'DNI',
    documentNumber: '',
    notes: '',
  });

  const filteredServices = selectedCategory 
    ? services.filter(s => s.category === selectedCategory)
    : services;

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setBookingComplete(true);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedService !== null;
      case 2:
        return selectedDate !== null && selectedTime !== null;
      case 3:
        return formData.firstName && formData.lastName && formData.email && formData.documentNumber;
      default:
        return true;
    }
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Card className="p-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                ¡Cita Reservada con Éxito!
              </h1>
              <p className="text-gray-600 mb-8">
                Hemos enviado un correo de confirmación a{' '}
                <strong>{formData.email}</strong> con todos los detalles.
              </p>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
                <h2 className="font-semibold text-lg mb-4">Detalles de su cita</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Referencia:</span>
                    <span className="font-mono font-bold text-red-600">CGE-ABC123XY</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Servicio:</span>
                    <span className="font-medium">{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fecha:</span>
                    <span className="font-medium">
                      {selectedDate?.toLocaleDateString('es-ES', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hora:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="font-medium text-yellow-800">Documentos requeridos</p>
                    <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                      {selectedService?.requirements.map((req, i) => (
                        <li key={i}>• {req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  Descargar Confirmación
                </Button>
                <Button size="lg" variant="outline" onClick={() => window.location.href = '/'}>
                  Volver al inicio
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-700 to-red-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Solicitar Cita Previa
          </h1>
          <p className="text-xl text-white/80">
            Reserve su cita para cualquier trámite consular de forma segura
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Servicio' },
              { num: 2, label: 'Fecha y Hora' },
              { num: 3, label: 'Datos Personales' },
              { num: 4, label: 'Confirmación' },
            ].map((step, index) => (
              <React.Fragment key={step.num}>
                <div className="flex items-center">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all',
                      currentStep >= step.num
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    )}
                  >
                    {currentStep > step.num ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      step.num
                    )}
                  </div>
                  <span
                    className={cn(
                      'ml-2 font-medium hidden sm:block',
                      currentStep >= step.num ? 'text-gray-900' : 'text-gray-400'
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {index < 3 && (
                  <div
                    className={cn(
                      'flex-1 h-1 mx-2 sm:mx-4 rounded',
                      currentStep > step.num ? 'bg-red-600' : 'bg-gray-200'
                    )}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Service Selection */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Seleccione el servicio que necesita
              </h2>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all',
                    selectedCategory === null
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  )}
                >
                  Todos
                </button>
                {Object.entries(SERVICE_CATEGORIES).map(([key, cat]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={cn(
                      'px-4 py-2 rounded-full text-sm font-medium transition-all',
                      selectedCategory === key
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Services Grid */}
              <div className="grid gap-4">
                {filteredServices.map((service) => (
                  <Card
                    key={service.id}
                    className={cn(
                      'cursor-pointer transition-all',
                      selectedService?.id === service.id
                        ? 'ring-2 ring-red-600 bg-red-50'
                        : 'hover:shadow-lg'
                    )}
                    onClick={() => setSelectedService(service)}
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="text-xs font-medium px-2 py-1 rounded-full"
                              style={{
                                backgroundColor: `${SERVICE_CATEGORIES[service.category as keyof typeof SERVICE_CATEGORIES]?.color}20`,
                                color: SERVICE_CATEGORIES[service.category as keyof typeof SERVICE_CATEGORIES]?.color,
                              }}
                            >
                              {SERVICE_CATEGORIES[service.category as keyof typeof SERVICE_CATEGORIES]?.name}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {service.name}
                          </h3>
                          <p className="text-gray-600 mt-1">{service.description}</p>
                          <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {service.duration} min
                            </span>
                            <span className="flex items-center gap-1">
                              <CreditCard className="h-4 w-4" />
                              {service.price > 0 ? `${service.price}€` : 'Gratuito'}
                            </span>
                          </div>
                        </div>
                        <div
                          className={cn(
                            'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-4',
                            selectedService?.id === service.id
                              ? 'border-red-600 bg-red-600'
                              : 'border-gray-300'
                          )}
                        >
                          {selectedService?.id === service.id && (
                            <CheckCircle className="h-4 w-4 text-white" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Date and Time */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Seleccione fecha y hora
              </h2>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Calendar */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>
                        {MONTHS[calendarDate.getMonth()]} {calendarDate.getFullYear()}
                      </CardTitle>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            setCalendarDate(
                              new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1)
                            )
                          }
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() =>
                            setCalendarDate(
                              new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1)
                            )
                          }
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {WEEKDAYS.map((day) => (
                        <div
                          key={day}
                          className="text-center text-sm font-medium text-gray-500 py-2"
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {calendarDays.map((day, index) => (
                        <button
                          key={index}
                          disabled={!day.available || day.date === 0}
                          onClick={() =>
                            day.available &&
                            setSelectedDate(
                              new Date(
                                calendarDate.getFullYear(),
                                calendarDate.getMonth(),
                                day.date
                              )
                            )
                          }
                          className={cn(
                            'aspect-square rounded-lg text-sm font-medium transition-all',
                            day.date === 0 && 'invisible',
                            day.isPast && 'text-gray-300 cursor-not-allowed',
                            !day.available && !day.isPast && 'text-gray-400 cursor-not-allowed',
                            day.available && 'hover:bg-red-50 hover:text-red-600',
                            day.isToday && 'ring-2 ring-red-600',
                            selectedDate?.getDate() === day.date &&
                              selectedDate?.getMonth() === calendarDate.getMonth() &&
                              'bg-red-600 text-white hover:bg-red-700 hover:text-white'
                          )}
                        >
                          {day.date > 0 ? day.date : ''}
                        </button>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-red-600 rounded"></span>
                        Seleccionado
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 border-2 border-red-600 rounded"></span>
                        Hoy
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-gray-200 rounded"></span>
                        No disponible
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Time Slots */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Horarios disponibles
                      {selectedDate && (
                        <span className="text-base font-normal text-gray-500 ml-2">
                          {selectedDate.toLocaleDateString('es-ES', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                          })}
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedDate ? (
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.time}
                            disabled={!slot.available}
                            onClick={() => slot.available && setSelectedTime(slot.time)}
                            className={cn(
                              'py-3 px-4 rounded-lg text-sm font-medium transition-all',
                              !slot.available &&
                                'bg-gray-100 text-gray-400 cursor-not-allowed',
                              slot.available &&
                                'border border-gray-200 hover:border-red-600 hover:text-red-600',
                              selectedTime === slot.time &&
                                'bg-red-600 text-white border-red-600 hover:bg-red-700 hover:text-white'
                            )}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Seleccione una fecha para ver los horarios disponibles</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Step 3: Personal Data */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Datos personales
              </h2>

              <Card>
                <CardContent className="p-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      label="Nombre"
                      placeholder="Su nombre"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      leftIcon={<User size={18} />}
                      required
                    />
                    <Input
                      label="Apellidos"
                      placeholder="Sus apellidos"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      required
                    />
                    <Input
                      label="Correo electrónico"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      leftIcon={<Mail size={18} />}
                      required
                    />
                    <Input
                      label="Teléfono"
                      type="tel"
                      placeholder="+213 XXX XXX XXX"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      leftIcon={<Phone size={18} />}
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Tipo de documento <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.documentType}
                        onChange={(e) =>
                          setFormData({ ...formData, documentType: e.target.value })
                        }
                        className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="DNI">DNI</option>
                        <option value="PASAPORTE">Pasaporte</option>
                        <option value="NIE">NIE</option>
                      </select>
                    </div>
                    <Input
                      label="Número de documento"
                      placeholder="12345678A"
                      value={formData.documentNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, documentNumber: e.target.value })
                      }
                      leftIcon={<CreditCard size={18} />}
                      required
                    />
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Notas adicionales
                      </label>
                      <textarea
                        placeholder="Información adicional relevante para su cita..."
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        rows={3}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Confirme su cita
              </h2>

              <div className="space-y-6">
                {/* Resumen de la cita */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-red-600" />
                      Resumen de la cita
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Servicio</p>
                        <p className="font-medium">{selectedService?.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Categoría</p>
                        <p className="font-medium">
                          {SERVICE_CATEGORIES[selectedService?.category as keyof typeof SERVICE_CATEGORIES]?.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Fecha</p>
                        <p className="font-medium">
                          {selectedDate?.toLocaleDateString('es-ES', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Hora</p>
                        <p className="font-medium">{selectedTime}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Duración estimada</p>
                        <p className="font-medium">{selectedService?.duration} minutos</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Tasa</p>
                        <p className="font-medium">
                          {selectedService?.price ? `${selectedService.price}€` : 'Gratuito'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Datos personales */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-red-600" />
                      Datos personales
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Nombre completo</p>
                        <p className="font-medium">
                          {formData.firstName} {formData.lastName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Correo electrónico</p>
                        <p className="font-medium">{formData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Teléfono</p>
                        <p className="font-medium">{formData.phone || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Documento</p>
                        <p className="font-medium">
                          {formData.documentType}: {formData.documentNumber}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Documentos requeridos */}
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-yellow-800">
                      <AlertCircle className="h-5 w-5" />
                      Documentos requeridos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedService?.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-yellow-800">
                          <CheckCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Términos y condiciones */}
                <Card>
                  <CardContent className="p-6">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-1 w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-sm text-gray-600">
                        He leído y acepto la{' '}
                        <a href="/legal/privacidad" className="text-red-600 hover:underline">
                          política de privacidad
                        </a>{' '}
                        y los{' '}
                        <a href="/legal/terminos" className="text-red-600 hover:underline">
                          términos y condiciones
                        </a>{' '}
                        del servicio de cita previa del Consulado General de España en Orán.
                      </span>
                    </label>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <Button
            variant="outline"
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className={cn(currentStep === 1 && 'invisible')}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Anterior
          </Button>

          {currentStep < 4 ? (
            <Button onClick={handleNextStep} disabled={!canProceed()}>
              Siguiente
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Confirmar Cita
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
