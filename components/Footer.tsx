import Link from 'next/link';
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 gradient-turquoise rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">O</span>
              </div>
              <h3 className="text-xl font-serif font-bold">Omar Arabic Perfume</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Perfumes árabes de élite desde Tindouf. La esencia del desierto en cada gota.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-turquoise-500 transition-colors"
              >
                <FiFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-turquoise-500 transition-colors"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-turquoise-500 transition-colors"
              >
                <FiTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-turquoise-400 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-turquoise-400 transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-turquoise-400 transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-turquoise-400 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categorías</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=Oud" className="text-gray-400 hover:text-turquoise-400 transition-colors">
                  Oud
                </Link>
              </li>
              <li>
                <Link href="/products?category=Amber" className="text-gray-400 hover:text-turquoise-400 transition-colors">
                  Ámbar
                </Link>
              </li>
              <li>
                <Link href="/products?category=Musk" className="text-gray-400 hover:text-turquoise-400 transition-colors">
                  Musk
                </Link>
              </li>
              <li>
                <Link href="/products?category=Floral" className="text-gray-400 hover:text-turquoise-400 transition-colors">
                  Floral
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FiMapPin className="w-5 h-5 text-turquoise-400 mt-1" />
                <span className="text-gray-400 text-sm">Tindouf, Argelia</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail className="w-5 h-5 text-turquoise-400" />
                <a href="mailto:info@omararabicperfume.com" className="text-gray-400 hover:text-turquoise-400 transition-colors text-sm">
                  info@omararabicperfume.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FiPhone className="w-5 h-5 text-turquoise-400" />
                <a href="tel:+213" className="text-gray-400 hover:text-turquoise-400 transition-colors text-sm">
                  +213 XXX XXX XXX
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Omar Arabic Perfume. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-turquoise-400 text-sm transition-colors">
              Privacidad
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-turquoise-400 text-sm transition-colors">
              Términos
            </Link>
            <Link href="/shipping" className="text-gray-400 hover:text-turquoise-400 text-sm transition-colors">
              Envíos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
