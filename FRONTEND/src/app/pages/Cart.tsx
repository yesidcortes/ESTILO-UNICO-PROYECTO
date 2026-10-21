import { Link, useNavigate } from 'react-router';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, isAuthenticated } = useApp();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h2 className="text-2xl text-white mb-4">Inicia sesión para ver tu carrito</h2>
          <Link
            to="/auth"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h2 className="text-2xl text-white mb-4">Tu carrito está vacío</h2>
          <Link
            to="/catalogo"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Explorar Productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-gray-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Carrito de Compras</h1>
          <p className="text-slate-400">{cart.length} producto{cart.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 md:p-6 flex gap-4"
              >
                {/* Image */}
                <Link
                  to={`/producto/${item.id}`}
                  className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-slate-700/30 rounded-lg overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/producto/${item.id}`}
                    className="text-white font-medium hover:text-blue-400 transition-colors block mb-1"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-slate-400 mb-2">{item.category}</p>
                  <div className="flex flex-wrap gap-2 text-sm mb-3">
                    <span className="bg-slate-700/50 text-slate-300 px-2 py-1 rounded">
                      {item.selectedSize}
                    </span>
                    <span className="bg-slate-700/50 text-slate-300 px-2 py-1 rounded">
                      {item.selectedColor}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-slate-700/50 border border-slate-600 rounded hover:bg-slate-700 text-white transition-colors"
                      >
                        <Minus className="w-4 h-4 mx-auto" />
                      </button>
                      <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-slate-700/50 border border-slate-600 rounded hover:bg-slate-700 text-white transition-colors"
                      >
                        <Plus className="w-4 h-4 mx-auto" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-xl font-bold text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-slate-400">${item.price} c/u</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-slate-400 hover:text-red-400 transition-colors p-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Resumen del Pedido</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Envío</span>
                  <span className="text-green-400">Gratis</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Impuestos</span>
                  <span>${(cartTotal * 0.16).toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-700 pt-3">
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span>${(cartTotal * 1.16).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-lg mb-3">
                Proceder al Pago
              </button>

              <Link
                to="/catalogo"
                className="block text-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                Continuar Comprando
              </Link>

              <div className="mt-6 pt-6 border-t border-slate-700">
                <p className="text-sm text-slate-400 text-center">
                  Envío gratis en compras mayores a $100
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
