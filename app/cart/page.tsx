'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import Link from 'next/link';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    getTotal,
    clearCart,
  } = useCartStore();

  const total = getTotal();

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8">
          Carrito de Compras
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <FiShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-gray-600 mb-8">
              Explora nuestra colección y encuentra tu fragancia perfecta
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-4 bg-turquoise-500 text-white rounded-full font-semibold hover:bg-turquoise-600 transition-all hover:shadow-turquoise"
            >
              Explorar Productos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex flex-col sm:flex-row gap-6"
                >
                  <div className="relative w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-serif font-semibold text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        {item.nameAr && (
                          <p className="text-sm text-gray-500">{item.nameAr}</p>
                        )}
                        {item.size && (
                          <p className="text-sm text-gray-500 mt-1">
                            Tamaño: {item.size}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        aria-label="Eliminar producto"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border-2 border-gray-200 rounded-full px-3 py-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                        <span className="mx-4 font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-turquoise-600">
                          €{(item.price * item.quantity).toFixed(2)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-gray-500">
                            €{item.price.toFixed(2)} c/u
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-600 font-medium"
              >
                Vaciar carrito
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-24">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                  Resumen del Pedido
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">€{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Envío</span>
                    <span className="font-semibold">Calculado al finalizar</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-turquoise-600">€{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <button className="w-full px-6 py-4 gradient-turquoise text-white rounded-full font-semibold text-lg hover:shadow-turquoise transition-all mb-4">
                  Proceder al Pago
                </button>
                <Link
                  href="/products"
                  className="block text-center text-turquoise-600 hover:text-turquoise-700 font-medium"
                >
                  Continuar comprando
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
