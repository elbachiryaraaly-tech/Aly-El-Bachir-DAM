// ============================================================================
// CONSULADO GENERAL DE ESPAÑA EN ORÁN - PÁGINA DE LOGIN
// Sistema de autenticación con seguridad gubernamental
// ============================================================================

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  AlertCircle,
  ArrowRight,
  Loader2,
  Smartphone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'credentials' | '2fa'>('credentials');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    twoFactorCode: '',
    rememberMe: false,
  });

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simular verificación de credenciales
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Si el usuario tiene 2FA activado, ir al paso 2FA
      // Por ahora simulamos que sí tiene 2FA
      setStep('2fa');
    } catch (err) {
      setError('Credenciales incorrectas. Por favor, inténtelo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simular verificación 2FA
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirigir al dashboard
      router.push('/mi-cuenta');
    } catch (err) {
      setError('Código de verificación incorrecto.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-12 h-14 bg-gradient-to-b from-red-600 to-red-700 rounded-t-full flex items-center justify-center">
                <span className="text-yellow-400 font-bold text-lg">ES</span>
              </div>
              <div className="text-left">
                <span className="block text-xl font-bold text-gray-900">Consulado de España</span>
                <span className="block text-sm text-red-600">Orán, Argelia</span>
              </div>
            </Link>
          </div>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {step === 'credentials' ? 'Iniciar Sesión' : 'Verificación en Dos Pasos'}
              </CardTitle>
              <CardDescription>
                {step === 'credentials'
                  ? 'Acceda a su cuenta del consulado'
                  : 'Introduzca el código de su aplicación de autenticación'}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
                >
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-red-800 font-medium">Error de autenticación</p>
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                </motion.div>
              )}

              {step === 'credentials' ? (
                <form onSubmit={handleCredentialsSubmit} className="space-y-6">
                  <Input
                    label="Correo electrónico"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    leftIcon={<Mail size={18} />}
                    required
                    autoComplete="email"
                  />

                  <Input
                    label="Contraseña"
                    type="password"
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    leftIcon={<Lock size={18} />}
                    required
                    autoComplete="current-password"
                  />

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={(e) =>
                          setFormData({ ...formData, rememberMe: e.target.checked })
                        }
                        className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-sm text-gray-600">Recordarme</span>
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-red-600 hover:underline"
                    >
                      ¿Olvidó su contraseña?
                    </Link>
                  </div>

                  <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                    {!isLoading && <ArrowRight className="mr-2 h-4 w-4" />}
                    Continuar
                  </Button>
                </form>
              ) : (
                <form onSubmit={handle2FASubmit} className="space-y-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Smartphone className="h-8 w-8 text-red-600" />
                    </div>
                    <p className="text-sm text-gray-600">
                      Abra su aplicación de autenticación (Google Authenticator, Authy, etc.) 
                      e introduzca el código de 6 dígitos.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Código de verificación
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={6}
                      placeholder="000000"
                      value={formData.twoFactorCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          twoFactorCode: e.target.value.replace(/\D/g, ''),
                        })
                      }
                      className="w-full h-14 text-center text-2xl font-mono tracking-[0.5em] rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    isLoading={isLoading}
                    disabled={formData.twoFactorCode.length !== 6}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Verificar
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setStep('credentials')}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      ← Volver al inicio de sesión
                    </button>
                  </div>

                  <div className="text-center pt-4 border-t">
                    <p className="text-sm text-gray-600 mb-2">
                      ¿No tiene acceso a su aplicación?
                    </p>
                    <Link
                      href="/verify-2fa?backup=true"
                      className="text-sm text-red-600 hover:underline"
                    >
                      Usar código de respaldo
                    </Link>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          {step === 'credentials' && (
            <p className="text-center mt-6 text-gray-600">
              ¿No tiene cuenta?{' '}
              <Link href="/register" className="text-red-600 font-medium hover:underline">
                Regístrese aquí
              </Link>
            </p>
          )}

          {/* Security Notice */}
          <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Conexión segura</p>
                <p className="text-xs text-gray-500 mt-1">
                  Sus datos están protegidos con encriptación de nivel gubernamental. 
                  Nunca compartiremos su información con terceros.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Image/Info */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-red-700 to-red-900 items-center justify-center p-12">
        <div className="max-w-lg text-white">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Bienvenido al Portal del Consulado
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Acceda a su cuenta para gestionar sus citas, consultar el estado de sus 
              trámites y acceder a todos los servicios consulares.
            </p>

            <div className="space-y-4">
              {[
                'Gestione sus citas previas',
                'Consulte el estado de sus trámites',
                'Actualice sus datos personales',
                'Descargue documentos y certificados',
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-red-700" />
                  </div>
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-sm text-white/60">
                Sitio oficial del Gobierno de España
              </p>
              <p className="text-sm text-white/60 mt-1">
                Ministerio de Asuntos Exteriores, Unión Europea y Cooperación
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
