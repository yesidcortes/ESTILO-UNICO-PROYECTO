import { Link } from "react-router";
import {
  ArrowRight,
  Star,
  Truck,
  Shield,
  CreditCard,
} from "lucide-react";
import { products } from "../data/products";

export function Home() {
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-gray-900 to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-900 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-700 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Nueva Colección
              <span className="block text-blue-400">
                Otoño 2026
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Descubre las últimas tendencias en moda urbana con
              diseños exclusivos y materiales de primera calidad
            </p>
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-lg"
            >
              Ver Catálogo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Productos Destacados
            </h2>
            <p className="text-slate-400">
              Los favoritos de esta temporada
            </p>
          </div>
          <Link
            to="/catalogo"
            className="hidden sm:flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            Ver todos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/producto/${product.id}`}
              className="group bg-slate-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all hover:scale-105 hover:shadow-xl"
            >
              <div className="aspect-square overflow-hidden bg-slate-700/30">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="text-xs text-blue-400 mb-1">
                  {product.category}
                </p>
                <h3 className="text-white font-medium mb-2 group-hover:text-blue-400 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-white">
                    ${product.price}
                  </span>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm text-slate-300">
                      4.5
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50">
            <div className="bg-blue-600/20 p-4 rounded-full mb-4">
              <Truck className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-white font-bold mb-2">
              Envío Gratis
            </h3>
            <p className="text-slate-400 text-sm">
              En compras mayores a $200,000
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50">
            <div className="bg-blue-600/20 p-4 rounded-full mb-4">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-white font-bold mb-2">
              Compra Segura
            </h3>
            <p className="text-slate-400 text-sm">
              Protección en todas tus compras
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50">
            <div className="bg-blue-600/20 p-4 rounded-full mb-4">
              <CreditCard className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-white font-bold mb-2">
              Pago Flexible
            </h3>
            <p className="text-slate-400 text-sm">
              Múltiples métodos de pago
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-16">
        <div className="bg-gradient-to-r from-blue-600 to-slate-700 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Únete a Estilo Único
            </h2>
            <p className="text-slate-200 mb-6 max-w-2xl mx-auto">
              Regístrate ahora y obtén un 15% de descuento en tu
              primera compra
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-3 rounded-lg hover:bg-slate-100 transition-all font-medium"
            >
              Crear Cuenta
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}