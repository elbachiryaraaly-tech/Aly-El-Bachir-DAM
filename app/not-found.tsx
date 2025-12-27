import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-6xl font-serif font-bold text-gray-900 mb-4">
          404
        </h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">
          Página no encontrada
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Lo sentimos, la página que buscas no existe.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-turquoise-500 text-white rounded-full font-semibold text-lg hover:bg-turquoise-600 transition-all hover:shadow-turquoise"
        >
          Volver al Inicio
        </Link>
      </div>
      <Footer />
    </div>
  );
}
