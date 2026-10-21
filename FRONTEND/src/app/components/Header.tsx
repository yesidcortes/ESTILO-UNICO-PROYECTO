import { Link, useLocation, useNavigate } from 'react-router';
import { ShoppingBag, Menu, X, ShoppingCart, Home, Grid3x3, LogOut, PlusSquare, ChevronDown, User, Package } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout, cartItemsCount } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;

  // Close user menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Inicio', icon: Home },
    { path: '/catalogo', label: 'Catálogo', icon: Grid3x3 },
  ];

  const adminLinks = [
    { path: '/registrar-producto', label: 'Nuevo Producto', icon: PlusSquare },
  ];

  const handleLogout = () => {
    setUserMenuOpen(false);
    logout();
    navigate('/');
  };

  // Avatar fallback: initials circle
  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
    : '?';

  return (
    <header className="bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors shrink-0">
            <ShoppingBag className="w-7 h-7" />
            <span className="font-bold text-xl hidden sm:block">Estilo Único</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm ${
                  isActive(path)
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
            {isAuthenticated && adminLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm ${
                  isActive(path)
                    ? 'bg-violet-600 text-white'
                    : 'text-violet-400 hover:bg-violet-900/30 hover:text-violet-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">

            {isAuthenticated ? (
              <>
                {/* Cart button */}
                <Link
                  to="/carrito"
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all group ${
                    isActive('/carrito')
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg shadow-blue-900/50 ring-2 ring-slate-900">
                      {cartItemsCount > 99 ? '99+' : cartItemsCount}
                    </span>
                  )}
                  <span className="hidden sm:block text-sm">Carrito</span>
                </Link>

                {/* User avatar + dropdown */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(prev => !prev)}
                    className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-slate-600 hover:bg-slate-800 transition-all"
                  >
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shrink-0 ring-1 ring-white/10">
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      ) : (
                        <span className="text-xs font-bold text-white">{initials}</span>
                      )}
                    </div>
                    {/* Name — hidden on small screens */}
                    <div className="hidden sm:flex flex-col items-start leading-none">
                      <span className="text-white text-sm font-medium max-w-[120px] truncate">
                        {user?.name ?? 'Usuario'}
                      </span>
                      <span className="text-slate-400 text-[11px] max-w-[120px] truncate">
                        {user?.email ?? ''}
                      </span>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform hidden sm:block ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown menu */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-slate-800/95 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden py-1 z-50">
                      {/* User info header */}
                      <div className="px-4 py-3 border-b border-slate-700/50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shrink-0">
                            {user?.avatar ? (
                              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-sm font-bold text-white">{initials}</span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-white text-sm font-semibold truncate">{user?.name}</p>
                            <p className="text-slate-400 text-xs truncate">{user?.email}</p>
                          </div>
                        </div>
                      </div>

                      <Link
                        to="/perfil"
                        className="flex items-center gap-3 px-4 py-2.5 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors text-sm"
                      >
                        <User className="w-4 h-4" />
                        Mi Perfil
                      </Link>
                      <Link
                        to="/carrito"
                        className="flex items-center gap-3 px-4 py-2.5 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors text-sm"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Mi Carrito
                        {cartItemsCount > 0 && (
                          <span className="ml-auto bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                            {cartItemsCount}
                          </span>
                        )}
                      </Link>
                      <Link
                        to="/registrar-producto"
                        className="flex items-center gap-3 px-4 py-2.5 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors text-sm"
                      >
                        <Package className="w-4 h-4" />
                        Nuevo Producto
                      </Link>

                      <div className="border-t border-slate-700/50 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-sm"
                        >
                          <LogOut className="w-4 h-4" />
                          Cerrar Sesión
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/auth"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Ingresar
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700/50">

            {/* Mobile user info */}
            {isAuthenticated && user && (
              <div className="flex items-center gap-3 px-4 py-3 mb-3 bg-slate-800/50 rounded-xl mx-0">
                <div className="w-11 h-11 rounded-xl overflow-hidden bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shrink-0">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm font-bold text-white">{initials}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{user.name}</p>
                  <p className="text-slate-400 text-xs truncate">{user.email}</p>
                </div>
              </div>
            )}

            <nav className="flex flex-col gap-1">
              {navLinks.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm ${
                    isActive(path)
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </Link>
              ))}

              {isAuthenticated && (
                <>
                  <Link
                    to="/carrito"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm ${
                      isActive('/carrito')
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Carrito
                    {cartItemsCount > 0 && (
                      <span className="ml-auto bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                        {cartItemsCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    to="/perfil"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm ${
                      isActive('/perfil')
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <User className="w-5 h-5" />
                    Mi Perfil
                  </Link>
                  {adminLinks.map(({ path, label, icon: Icon }) => (
                    <Link
                      key={path}
                      to={path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm ${
                        isActive(path)
                          ? 'bg-violet-600 text-white'
                          : 'text-violet-400 hover:bg-violet-900/30 hover:text-violet-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {label}
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-sm w-full mt-1 border-t border-slate-700/50 pt-3"
                  >
                    <LogOut className="w-5 h-5" />
                    Cerrar Sesión
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
