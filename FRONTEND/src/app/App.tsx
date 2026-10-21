import { BrowserRouter, Routes, Route } from 'react-router';
import { Toaster } from 'sonner';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Profile } from './pages/Profile';
import { Auth } from './pages/Auth';
import { ProductRegister } from './pages/ProductRegister';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="min-h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/registrar-producto" element={<ProductRegister />} />
          </Routes>
          <Toaster position="top-right" richColors />
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}
