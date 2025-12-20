// ============================================================================
// CONSULADO GENERAL DE ESPAÑA EN ORÁN - FOOTER COMPONENT
// ============================================================================

'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ExternalLink,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  AlertTriangle
} from 'lucide-react';
import { CONSULATE_INFO } from '@/config/consulate';

const quickLinks = [
  { name: 'Cita Previa', href: '/citas' },
  { name: 'Pasaportes', href: '/servicios/pasaportes' },
  { name: 'Visados', href: '/servicios/visados' },
  { name: 'Registro Civil', href: '/servicios/registro-civil' },
  { name: 'Nacionalidad', href: '/servicios/nacionalidad' },
  { name: 'Legalizaciones', href: '/servicios/legalizaciones' },
];

const legalLinks = [
  { name: 'Aviso Legal', href: '/legal/aviso-legal' },
  { name: 'Política de Privacidad', href: '/legal/privacidad' },
  { name: 'Política de Cookies', href: '/legal/cookies' },
  { name: 'Accesibilidad', href: '/legal/accesibilidad' },
];

const officialLinks = [
  { name: 'Ministerio de Asuntos Exteriores', href: 'https://www.exteriores.gob.es', external: true },
  { name: 'Sede Electrónica', href: 'https://sede.maec.gob.es', external: true },
  { name: 'Portal de Inmigración', href: 'https://www.inclusion.gob.es/web/migraciones', external: true },
  { name: 'BOE', href: 'https://www.boe.es', external: true },
];

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Emergency Banner */}
      <div className="bg-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center gap-3 text-sm">
            <AlertTriangle size={18} className="text-yellow-300 flex-shrink-0" />
            <span>
              <strong>Emergencias consulares 24h:</strong>{' '}
              <a href={`tel:${CONSULATE_INFO.emergencyPhone}`} className="text-yellow-300 hover:underline font-semibold">
                {CONSULATE_INFO.emergencyPhone}
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Contacto */}
          <div>
            <h3 className="text-lg font-bold text-yellow-400 mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href={CONSULATE_INFO.googleMapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-gray-300 hover:text-white transition-colors group"
                >
                  <MapPin size={18} className="flex-shrink-0 mt-0.5 text-red-400" />
                  <span className="group-hover:underline">
                    {CONSULATE_INFO.fullAddress}
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href={`tel:${CONSULATE_INFO.phone}`}
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                >
                  <Phone size={18} className="flex-shrink-0 text-red-400" />
                  <span>{CONSULATE_INFO.phone}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${CONSULATE_INFO.email}`}
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                >
                  <Mail size={18} className="flex-shrink-0 text-red-400" />
                  <span>{CONSULATE_INFO.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <Clock size={18} className="flex-shrink-0 mt-0.5 text-red-400" />
                <div>
                  <p>Lunes a Jueves</p>
                  <p className="text-white font-medium">08:30 - 14:30</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="text-lg font-bold text-yellow-400 mb-4">Servicios</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white hover:pl-2 transition-all"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Enlaces Oficiales */}
          <div>
            <h3 className="text-lg font-bold text-yellow-400 mb-4">Enlaces Oficiales</h3>
            <ul className="space-y-2">
              {officialLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                    <ExternalLink size={14} className="opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes Sociales y Logo */}
          <div>
            <h3 className="text-lg font-bold text-yellow-400 mb-4">Síguenos</h3>
            <div className="flex gap-3 mb-6">
              <a 
                href={CONSULATE_INFO.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href={CONSULATE_INFO.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href={CONSULATE_INFO.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href={CONSULATE_INFO.socialMedia.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>

            {/* Ministerio Logo */}
            <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
              <p className="text-xs text-gray-400 mb-2">Perteneciente a</p>
              <p className="text-sm font-medium text-white">
                Ministerio de Asuntos Exteriores, Unión Europea y Cooperación
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Gobierno de España
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
              {legalLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <p className="text-sm text-gray-400 text-center md:text-right">
              © {new Date().getFullYear()} Consulado General de España en Orán. 
              Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
