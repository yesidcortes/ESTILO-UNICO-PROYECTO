import { Link, useNavigate } from 'react-router';
import { User, Mail, MapPin, Phone, CreditCard, Package, Heart, Settings, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Profile() {
  const { isAuthenticated, logout } = useApp();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h2 className="text-2xl text-white mb-4">Inicia sesión para ver tu perfil</h2>
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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const mockOrders = [
    {
      id: 1,
      date: '2026-05-10',
      total: 159.98,
      status: 'Entregado',
      items: 2
    },
    {
      id: 2,
      date: '2026-05-05',
      total: 89.99,
      status: 'En camino',
      items: 1
    },
    {
      id: 3,
      date: '2026-04-28',
      total: 249.97,
      status: 'Entregado',
      items: 3
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-gray-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Mi Perfil</h1>
          <p className="text-slate-400">Gestiona tu información y pedidos</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 mb-6">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-slate-700 rounded-full flex items-center justify-center mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white mb-1">Usuario Demo</h2>
                <p className="text-slate-400 text-sm">usuario@email.com</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/30">
                  <User className="w-5 h-5" />
                  Información Personal
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-700/50 rounded-lg transition-colors">
                  <Package className="w-5 h-5" />
                  Mis Pedidos
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-700/50 rounded-lg transition-colors">
                  <Heart className="w-5 h-5" />
                  Favoritos
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-700/50 rounded-lg transition-colors">
                  <CreditCard className="w-5 h-5" />
                  Métodos de Pago
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-700/50 rounded-lg transition-colors">
                  <Settings className="w-5 h-5" />
                  Configuración
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Cerrar Sesión
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Información Personal</h3>
                <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm">
                  Editar
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-slate-400 mt-1" />
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Nombre Completo</p>
                    <p className="text-white">Usuario Demo</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-slate-400 mt-1" />
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Email</p>
                    <p className="text-white">usuario@email.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-slate-400 mt-1" />
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Teléfono</p>
                    <p className="text-white">+57 555 123 4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-400 mt-1" />
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Dirección</p>
                    <p className="text-white">Colombia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Pedidos Recientes</h3>
                <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm">
                  Ver todos
                </button>
              </div>

              <div className="space-y-4">
                {mockOrders.map(order => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-700/50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Package className="w-5 h-5 text-blue-400" />
                        <span className="text-white font-medium">Pedido #{order.id}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            order.status === 'Entregado'
                              ? 'bg-green-900/30 text-green-400'
                              : 'bg-blue-900/30 text-blue-400'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400">
                        {order.date} • {order.items} producto{order.items !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">${order.total}</p>
                      <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                        Ver detalles
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center">
                <Package className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <p className="text-3xl font-bold text-white mb-1">12</p>
                <p className="text-sm text-slate-400">Pedidos Totales</p>
              </div>

              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center">
                <Heart className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <p className="text-3xl font-bold text-white mb-1">8</p>
                <p className="text-sm text-slate-400">Productos Favoritos</p>
              </div>

              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center">
                <CreditCard className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <p className="text-3xl font-bold text-white mb-1">$1,247</p>
                <p className="text-sm text-slate-400">Total Gastado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
