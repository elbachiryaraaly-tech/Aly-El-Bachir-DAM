'use client';

import { useState, useMemo, Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useSearchParams } from 'next/navigation';
import { FiFilter, FiX } from 'react-icons/fi';

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParam
  );
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['Todos', 'Oud', 'Amber', 'Musk', 'Floral', 'Woody', 'Luxury'];

  const filteredProducts = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'Todos') {
      return products;
    }
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Nuestros Productos
          </h1>
          <p className="text-xl text-gray-600">
            Descubre nuestra colección completa de perfumes árabes de élite
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center space-x-2 px-4 py-2 bg-turquoise-500 text-white rounded-full mb-4"
          >
            <FiFilter className="w-5 h-5" />
            <span>Filtros</span>
          </button>

          <div
            className={`${
              showFilters ? 'block' : 'hidden'
            } md:block bg-white rounded-2xl p-6 shadow-lg mb-6`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Categorías</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="md:hidden"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category === 'Todos' ? null : category);
                    setShowFilters(false);
                  }}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    (selectedCategory === category) ||
                    (!selectedCategory && category === 'Todos')
                      ? 'bg-turquoise-500 text-white shadow-turquoise'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Mostrando {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 mb-4">
              No se encontraron productos en esta categoría
            </p>
            <button
              onClick={() => setSelectedCategory(null)}
              className="px-6 py-3 bg-turquoise-500 text-white rounded-full hover:bg-turquoise-600 transition-all"
            >
              Ver Todos los Productos
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">Cargando productos...</p>
          </div>
        </div>
        <Footer />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
