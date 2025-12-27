'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import { Product } from '@/types/product';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover-lift border border-gray-100">
        {/* Image */}
        <div className="relative h-64 overflow-hidden bg-gray-100">
          {product.featured && (
            <div className="absolute top-4 left-4 z-10 bg-turquoise-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Destacado
            </div>
          )}
          {product.originalPrice && (
            <div className="absolute top-4 right-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </div>
          )}
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-serif text-xl font-semibold text-gray-900 mb-1 group-hover:text-turquoise-600 transition-colors">
                {product.name}
              </h3>
              {product.nameAr && (
                <p className="text-sm text-gray-500 mb-2">{product.nameAr}</p>
              )}
            </div>
          </div>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center space-x-1 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating!)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews})
              </span>
            </div>
          )}

          {/* Notes */}
          {product.notes && (
            <div className="flex flex-wrap gap-2 mb-4">
              {product.notes.slice(0, 3).map((note, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-turquoise-50 text-turquoise-700 rounded-full"
                >
                  {note}
                </span>
              ))}
            </div>
          )}

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <div>
              {product.originalPrice ? (
                <div>
                  <span className="text-2xl font-bold text-turquoise-600">
                    €{product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-400 line-through ml-2">
                    €{product.originalPrice.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-turquoise-600">
                  €{product.price.toFixed(2)}
                </span>
              )}
              {product.size && (
                <p className="text-xs text-gray-500 mt-1">{product.size}</p>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="w-12 h-12 rounded-full gradient-turquoise flex items-center justify-center text-white hover:shadow-turquoise transition-all group-hover:scale-110"
              aria-label="Añadir al carrito"
            >
              <FiShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
