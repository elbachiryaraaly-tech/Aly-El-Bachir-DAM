'use client';

import { use } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { FiShoppingCart, FiStar, FiMinus, FiPlus, FiCheck } from 'react-icons/fi';
import { useState } from 'react';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image */}
          <div className="relative">
            <div className="sticky top-24">
              <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.featured && (
                  <div className="absolute top-6 left-6 bg-turquoise-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Destacado
                  </div>
                )}
                {product.originalPrice && (
                  <div className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <span className="inline-block px-4 py-1 bg-turquoise-100 text-turquoise-700 rounded-full text-sm font-medium mb-4">
                {product.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            {product.nameAr && (
              <p className="text-2xl text-gray-600 mb-6">{product.nameAr}</p>
            )}

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating!)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews} reseñas)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mb-6">
              {product.originalPrice ? (
                <div>
                  <span className="text-4xl font-bold text-turquoise-600">
                    €{product.price.toFixed(2)}
                  </span>
                  <span className="text-xl text-gray-400 line-through ml-3">
                    €{product.originalPrice.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-4xl font-bold text-turquoise-600">
                  €{product.price.toFixed(2)}
                </span>
              )}
              {product.size && (
                <p className="text-gray-600 mt-2">Tamaño: {product.size}</p>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Descripción</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {product.description}
              </p>
              {product.descriptionAr && (
                <p className="text-gray-700 leading-relaxed text-right" dir="rtl">
                  {product.descriptionAr}
                </p>
              )}
            </div>

            {/* Notes */}
            {product.notes && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3">Notas</h3>
                <div className="flex flex-wrap gap-3">
                  {product.notes.map((note, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-turquoise-50 text-turquoise-700 rounded-full text-sm font-medium"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Status */}
            <div className="mb-8">
              {product.inStock ? (
                <div className="flex items-center space-x-2 text-green-600">
                  <FiCheck className="w-5 h-5" />
                  <span className="font-medium">En stock</span>
                </div>
              ) : (
                <div className="text-red-600 font-medium">
                  Agotado
                </div>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border-2 border-gray-200 rounded-full px-4 py-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <FiMinus className="w-5 h-5" />
                </button>
                <span className="mx-6 text-lg font-semibold w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <FiPlus className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center space-x-2 px-8 py-4 rounded-full font-semibold text-lg transition-all ${
                  addedToCart
                    ? 'bg-green-500 text-white'
                    : product.inStock
                    ? 'gradient-turquoise text-white hover:shadow-turquoise'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {addedToCart ? (
                  <>
                    <FiCheck className="w-5 h-5" />
                    <span>Añadido al carrito</span>
                  </>
                ) : (
                  <>
                    <FiShoppingCart className="w-5 h-5" />
                    <span>Añadir al Carrito</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
              Productos Relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover-lift border border-gray-100">
                  <a href={`/products/${relatedProduct.id}`}>
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-semibold text-gray-900 mb-2">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-turquoise-600">
                          €{relatedProduct.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {relatedProduct.size}
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
