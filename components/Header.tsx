'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiShoppingCart, FiMenu, FiX, FiSearch, FiUser } from 'react-icons/fi';
import { useCartStore } from '@/store/cartStore';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-turquoise-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 gradient-turquoise rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">O</span>
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-gray-900">
                Omar Arabic Perfume
              </h1>
              <p className="text-xs text-turquoise-600">Tindouf</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-turquoise-600 font-medium transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-turquoise-600 font-medium transition-colors"
            >
              Productos
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-turquoise-600 font-medium transition-colors"
            >
              Sobre Nosotros
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-turquoise-600 font-medium transition-colors"
            >
              Contacto
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:block p-2 text-gray-700 hover:text-turquoise-600 transition-colors">
              <FiSearch className="w-5 h-5" />
            </button>
            <button className="hidden md:block p-2 text-gray-700 hover:text-turquoise-600 transition-colors">
              <FiUser className="w-5 h-5" />
            </button>
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-turquoise-600 transition-colors"
            >
              <FiShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-turquoise-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-turquoise-200">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-turquoise-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/products"
                className="text-gray-700 hover:text-turquoise-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Productos
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-turquoise-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre Nosotros
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-turquoise-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
