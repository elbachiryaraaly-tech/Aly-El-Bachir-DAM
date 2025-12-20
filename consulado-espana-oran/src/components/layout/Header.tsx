// ============================================================================
// CONSULADO GENERAL DE ESPAÑA EN ORÁN - HEADER COMPONENT
// ============================================================================

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  Clock, 
  ChevronDown,
  User,
  Calendar,
  LogOut,
  Settings,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { CONSULATE_INFO } from '@/config/consulate';

const navigation = [
  { name: 'Inicio', href: '/' },
  { 
    name: 'Servicios', 
    href: '/servicios',
    children: [
      { name: 'Pasaportes', href: '/servicios/pasaportes' },
      { name: 'Visados', href: '/servicios/visados' },
      { name: 'Registro Civil', href: '/servicios/registro-civil' },
      { name: 'Nacionalidad', href: '/servicios/nacionalidad' },
      { name: 'Notaría', href: '/servicios/notaria' },
      { name: 'Legalizaciones', href: '/servicios/legalizaciones' },
    ]
  },
  { name: 'Cita Previa', href: '/citas' },
  { name: 'Contacto', href: '/contacto' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  
  // Simular estado de autenticación
  const isAuthenticated = false;

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-red-800 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-xs sm:text-sm">
            <div className="flex items-center gap-4 sm:gap-6">
              <a href={`tel:${CONSULATE_INFO.phone}`} className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors">
                <Phone size={14} />
                <span className="hidden sm:inline">{CONSULATE_INFO.phone}</span>
              </a>
              <a href={`mailto:${CONSULATE_INFO.email}`} className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors">
                <Mail size={14} />
                <span className="hidden md:inline">{CONSULATE_INFO.email}</span>
              </a>
            </div>
            <div className="flex items-center gap-1.5 text-yellow-300">
              <Clock size={14} />
              <span>Lun-Jue: 08:30-14:30</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-lg border-b-4 border-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              {/* Escudo de España simplificado */}
              <div className="relative w-12 h-14 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-b from-red-600 to-red-700 rounded-t-full">
                  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-red-700 text-xs font-bold">ES</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold text-gray-900 leading-tight group-hover:text-red-700 transition-colors">
                  Consulado de España
                </span>
                <span className="text-sm text-red-600 font-medium">
                  Orán, Argelia
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.children ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(item.name)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <button
                        className={cn(
                          'flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                          pathname.startsWith(item.href)
                            ? 'text-red-700 bg-red-50'
                            : 'text-gray-700 hover:text-red-700 hover:bg-red-50'
                        )}
                      >
                        {item.name}
                        <ChevronDown size={16} className={cn(
                          'transition-transform',
                          openDropdown === item.name && 'rotate-180'
                        )} />
                      </button>
                      
                      {openDropdown === item.name && (
                        <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                        pathname === item.href
                          ? 'text-red-700 bg-red-50'
                          : 'text-gray-700 hover:text-red-700 hover:bg-red-50'
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                    <User size={18} />
                    <span className="text-sm font-medium">Mi Cuenta</span>
                    <ChevronDown size={16} />
                  </button>
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link href="/mi-cuenta" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <User size={16} /> Mi Perfil
                    </Link>
                    <Link href="/mi-cuenta/citas" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <Calendar size={16} /> Mis Citas
                    </Link>
                    <Link href="/mi-cuenta/seguridad" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <Shield size={16} /> Seguridad
                    </Link>
                    <hr className="my-2" />
                    <button className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full">
                      <LogOut size={16} /> Cerrar Sesión
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" size="sm">
                      Iniciar Sesión
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm">
                      Registrarse
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                        className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        <span className="font-medium">{item.name}</span>
                        <ChevronDown size={18} className={cn(
                          'transition-transform',
                          openDropdown === item.name && 'rotate-180'
                        )} />
                      </button>
                      {openDropdown === item.name && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2.5 text-sm text-gray-600 hover:text-red-700 rounded-lg hover:bg-red-50"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'block px-4 py-3 rounded-lg font-medium',
                        pathname === item.href
                          ? 'text-red-700 bg-red-50'
                          : 'text-gray-700 hover:bg-gray-50'
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              <hr className="my-4" />
              
              <div className="space-y-2">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">
                    Registrarse
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
