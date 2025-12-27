import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import Link from 'next/link';
import { FiAward, FiTruck, FiShield, FiGlobe } from 'react-icons/fi';

export default function Home() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 6);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 gradient-turquoise rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAward className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Calidad Premium</h3>
              <p className="text-gray-600 text-sm">
                Solo utilizamos los mejores ingredientes naturales
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 gradient-turquoise rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTruck className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Envío Mundial</h3>
              <p className="text-gray-600 text-sm">
                Enviamos a todos los países del mundo
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 gradient-turquoise rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Garantía</h3>
              <p className="text-gray-600 text-sm">
                100% garantizado o devolución de dinero
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 gradient-turquoise rounded-full flex items-center justify-center mx-auto mb-4">
                <FiGlobe className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Auténtico</h3>
              <p className="text-gray-600 text-sm">
                Perfumes auténticos directamente desde Tindouf
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Productos Destacados
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra selección de perfumes más exclusivos
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/products"
              className="inline-block px-8 py-4 bg-turquoise-500 text-white rounded-full font-semibold text-lg hover:bg-turquoise-600 transition-all hover:shadow-turquoise"
            >
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                La Tradición del{' '}
                <span className="text-turquoise-600">Desierto</span>
              </h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                En Omar Arabic Perfume, llevamos la esencia del desierto a tu hogar.
                Nuestros perfumes están creados con las más finas materias primas,
                siguiendo recetas tradicionales que han pasado de generación en generación.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Desde Tindouf, en el corazón del Sáhara, seleccionamos cuidadosamente
                cada ingrediente para crear fragancias únicas que capturan la magia y
                el misterio del desierto.
              </p>
              <Link
                href="/about"
                className="inline-block px-8 py-4 bg-turquoise-500 text-white rounded-full font-semibold hover:bg-turquoise-600 transition-all hover:shadow-turquoise"
              >
                Conoce Nuestra Historia
              </Link>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=800"
                alt="Perfumes árabes"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Explora por Categoría
            </h2>
            <p className="text-xl text-gray-600">
              Encuentra tu fragancia perfecta
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Oud', 'Amber', 'Musk', 'Floral'].map((category) => (
              <Link
                key={category}
                href={`/products?category=${category}`}
                className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover-lift"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-turquoise-500 to-turquoise-700 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-3xl font-serif font-bold text-white">
                    {category}
                  </h3>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver productos →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
