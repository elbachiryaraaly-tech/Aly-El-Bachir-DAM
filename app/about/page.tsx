import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FiAward, FiHeart, FiGlobe, FiUsers } from 'react-icons/fi';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            Nuestra Historia
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Desde el corazón del desierto de Tindouf, llevamos la esencia de la tradición
            árabe a cada rincón del mundo.
          </p>
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
          <div>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
              La Tradición del{' '}
              <span className="text-turquoise-600">Desierto</span>
            </h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                Omar Arabic Perfume nació de la pasión por preservar y compartir las
                tradiciones perfumísticas del mundo árabe. Desde nuestra ubicación en
                Tindouf, en el corazón del Sáhara argelino, seleccionamos cuidadosamente
                cada ingrediente para crear fragancias únicas.
              </p>
              <p>
                Nuestros perfumes están inspirados en recetas ancestrales que han pasado
                de generación en generación, combinando lo mejor de la tradición con
                técnicas modernas de producción.
              </p>
              <p>
                Cada botella contiene no solo un perfume, sino una historia, una conexión
                con el desierto y sus secretos más preciados.
              </p>
            </div>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1612817159949-195b6eb9e1af?w=800"
              alt="Desierto"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-4xl font-serif font-bold text-gray-900 text-center mb-12">
            Nuestros Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 gradient-turquoise rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAward className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Calidad Premium</h3>
              <p className="text-gray-600">
                Solo utilizamos los mejores ingredientes naturales y auténticos
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 gradient-turquoise rounded-full flex items-center justify-center mx-auto mb-4">
                <FiHeart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pasión</h3>
              <p className="text-gray-600">
                Cada perfume es creado con amor y dedicación artesanal
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 gradient-turquoise rounded-full flex items-center justify-center mx-auto mb-4">
                <FiGlobe className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Autenticidad</h3>
              <p className="text-gray-600">
                Perfumes genuinos directamente desde su origen en Tindouf
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 gradient-turquoise rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tradición</h3>
              <p className="text-gray-600">
                Respetamos y preservamos las técnicas tradicionales árabes
              </p>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-gradient-to-br from-turquoise-50 to-turquoise-100 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
            Nuestra Misión
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Llevar la esencia del desierto a cada hogar del mundo, compartiendo la
            riqueza y la belleza de la cultura perfumística árabe. Queremos que cada
            persona pueda experimentar la magia y el misterio que solo los perfumes
            árabes pueden ofrecer.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
