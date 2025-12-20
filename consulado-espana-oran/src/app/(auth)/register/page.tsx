// ============================================================================
// CONSULADO GENERAL DE ESPAÑA EN ORÁN - PÁGINA DE REGISTRO
// Registro seguro con validación completa
// ============================================================================

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Mail,
  Lock,
  User,
  Phone,
  Calendar,
  CreditCard,
  Globe,
  Shield,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils/cn';

const passwordRequirements = [
  { id: 'length', label: 'Mínimo 12 caracteres', check: (p: string) => p.length >= 12 },
  { id: 'uppercase', label: 'Una letra mayúscula', check: (p: string) => /[A-Z]/.test(p) },
  { id: 'lowercase', label: 'Una letra minúscula', check: (p: string) => /[a-z]/.test(p) },
  { id: 'number', label: 'Un número', check: (p: string) => /\d/.test(p) },
  { id: 'special', label: 'Un carácter especial', check: (p: string) => /[!@#$%^&*]/.test(p) },
];

const documentTypes = [
  { value: 'DNI', label: 'DNI (Documento Nacional de Identidad)' },
  { value: 'PASSPORT', label: 'Pasaporte' },
  { value: 'NIE', label: 'NIE (Número de Identidad de Extranjero)' },
];

const nationalities = [
  'Española',
  'Argelina',
  'Marroquí',
  'Francesa',
  'Tunecina',
  'Otra',
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    // Paso 1: Datos personales
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    nationality: '',
    documentType: 'DNI',
    documentNumber: '',
    
    // Paso 2: Contacto
    email: '',
    confirmEmail: '',
    phone: '',
    address: '',
    city: '',
    
    // Paso 3: Seguridad
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptPrivacy: false,
  });

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (stepNum: number) => {
    switch (stepNum) {
      case 1:
        return formData.firstName && formData.lastName && formData.dateOfBirth && 
               formData.nationality && formData.documentNumber;
      case 2:
        return formData.email && formData.email === formData.confirmEmail && formData.phone;
      case 3:
        return formData.password && formData.password === formData.confirmPassword &&
               passwordRequirements.every(r => r.check(formData.password)) &&
               formData.acceptTerms && formData.acceptPrivacy;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      setError('');
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) {
      setError('Por favor, complete todos los campos correctamente.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simular registro
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirigir a página de verificación de email
      router.push('/verify-email?email=' + encodeURIComponent(formData.email));
    } catch (err) {
      setError('Error al crear la cuenta. Por favor, inténtelo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const passed = passwordRequirements.filter(r => r.check(formData.password)).length;
    if (passed === 0) return { label: '', color: '' };
    if (passed <= 2) return { label: 'Débil', color: 'bg-red-500' };
    if (passed <= 4) return { label: 'Media', color: 'bg-yellow-500' };
    return { label: 'Fuerte', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-14 bg-gradient-to-b from-red-600 to-red-700 rounded-t-full flex items-center justify-center">
              <span className="text-yellow-400 font-bold text-lg">ES</span>
            </div>
            <div className="text-left">
              <span className="block text-xl font-bold text-gray-900">Consulado de España</span>
              <span className="block text-sm text-red-600">Orán, Argelia</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crear Cuenta</h1>
          <p className="text-gray-600">
            Complete el formulario para registrarse en el sistema de citas del consulado
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((s, index) => (
            <React.Fragment key={s}>
              <div className="flex items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all',
                    step >= s ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-500'
                  )}
                >
                  {step > s ? <CheckCircle className="h-5 w-5" /> : s}
                </div>
                <span
                  className={cn(
                    'ml-2 text-sm font-medium',
                    step >= s ? 'text-gray-900' : 'text-gray-400'
                  )}
                >
                  {s === 1 ? 'Datos Personales' : s === 2 ? 'Contacto' : 'Seguridad'}
                </span>
              </div>
              {index < 2 && (
                <div
                  className={cn(
                    'w-16 h-1 mx-4 rounded',
                    step > s ? 'bg-red-600' : 'bg-gray-200'
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <Card>
          <CardContent className="p-8">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
              >
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Data */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      label="Nombre"
                      placeholder="Su nombre"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      leftIcon={<User size={18} />}
                      required
                    />
                    <Input
                      label="Apellidos"
                      placeholder="Sus apellidos"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      required
                    />
                  </div>

                  <Input
                    label="Fecha de nacimiento"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                    leftIcon={<Calendar size={18} />}
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Nacionalidad <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.nationality}
                      onChange={(e) => updateFormData('nationality', e.target.value)}
                      className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    >
                      <option value="">Seleccione nacionalidad</option>
                      {nationalities.map((nat) => (
                        <option key={nat} value={nat}>{nat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Tipo de documento <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.documentType}
                        onChange={(e) => updateFormData('documentType', e.target.value)}
                        className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required
                      >
                        {documentTypes.map((doc) => (
                          <option key={doc.value} value={doc.value}>{doc.label}</option>
                        ))}
                      </select>
                    </div>
                    <Input
                      label="Número de documento"
                      placeholder="12345678A"
                      value={formData.documentNumber}
                      onChange={(e) => updateFormData('documentNumber', e.target.value)}
                      leftIcon={<CreditCard size={18} />}
                      required
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Contact */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <Input
                    label="Correo electrónico"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    leftIcon={<Mail size={18} />}
                    required
                  />
                  <Input
                    label="Confirmar correo electrónico"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={formData.confirmEmail}
                    onChange={(e) => updateFormData('confirmEmail', e.target.value)}
                    leftIcon={<Mail size={18} />}
                    error={
                      formData.confirmEmail && formData.email !== formData.confirmEmail
                        ? 'Los correos no coinciden'
                        : undefined
                    }
                    success={
                      formData.confirmEmail && formData.email === formData.confirmEmail
                    }
                    required
                  />
                  <Input
                    label="Teléfono"
                    type="tel"
                    placeholder="+213 XXX XXX XXX"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    leftIcon={<Phone size={18} />}
                    required
                  />
                  <Input
                    label="Dirección (opcional)"
                    placeholder="Calle, número, piso..."
                    value={formData.address}
                    onChange={(e) => updateFormData('address', e.target.value)}
                  />
                  <Input
                    label="Ciudad (opcional)"
                    placeholder="Orán"
                    value={formData.city}
                    onChange={(e) => updateFormData('city', e.target.value)}
                  />
                </motion.div>
              )}

              {/* Step 3: Security */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <Input
                      label="Contraseña"
                      type="password"
                      placeholder="••••••••••••"
                      value={formData.password}
                      onChange={(e) => updateFormData('password', e.target.value)}
                      leftIcon={<Lock size={18} />}
                      required
                    />
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={cn('h-full transition-all', passwordStrength.color)}
                              style={{
                                width: `${(passwordRequirements.filter(r => r.check(formData.password)).length / 5) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-600">
                            {passwordStrength.label}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {passwordRequirements.map((req) => (
                            <div
                              key={req.id}
                              className={cn(
                                'flex items-center gap-2 text-sm',
                                req.check(formData.password) ? 'text-green-600' : 'text-gray-400'
                              )}
                            >
                              <CheckCircle className="h-4 w-4" />
                              {req.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <Input
                    label="Confirmar contraseña"
                    type="password"
                    placeholder="••••••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                    leftIcon={<Lock size={18} />}
                    error={
                      formData.confirmPassword && formData.password !== formData.confirmPassword
                        ? 'Las contraseñas no coinciden'
                        : undefined
                    }
                    success={
                      formData.confirmPassword && formData.password === formData.confirmPassword
                    }
                    required
                  />

                  <div className="space-y-4 pt-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={(e) => updateFormData('acceptTerms', e.target.checked)}
                        className="mt-1 w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
                        required
                      />
                      <span className="text-sm text-gray-600">
                        He leído y acepto los{' '}
                        <Link href="/legal/terminos" className="text-red-600 hover:underline">
                          términos y condiciones
                        </Link>{' '}
                        del servicio <span className="text-red-500">*</span>
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.acceptPrivacy}
                        onChange={(e) => updateFormData('acceptPrivacy', e.target.checked)}
                        className="mt-1 w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
                        required
                      />
                      <span className="text-sm text-gray-600">
                        He leído y acepto la{' '}
                        <Link href="/legal/privacidad" className="text-red-600 hover:underline">
                          política de privacidad
                        </Link>{' '}
                        <span className="text-red-500">*</span>
                      </span>
                    </label>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={handleBack}>
                    Anterior
                  </Button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!validateStep(step)}
                  >
                    Siguiente
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    isLoading={isLoading}
                    disabled={!validateStep(3)}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Crear Cuenta
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center mt-6 text-gray-600">
          ¿Ya tiene cuenta?{' '}
          <Link href="/login" className="text-red-600 font-medium hover:underline">
            Inicie sesión
          </Link>
        </p>

        {/* Security Notice */}
        <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Sus datos están protegidos</p>
              <p className="text-xs text-gray-500 mt-1">
                Utilizamos encriptación de nivel gubernamental (AES-256) para proteger 
                toda su información personal. Cumplimos con el RGPD y la normativa española 
                de protección de datos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
