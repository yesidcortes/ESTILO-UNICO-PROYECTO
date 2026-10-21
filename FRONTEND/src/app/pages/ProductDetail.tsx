import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { Star, ShoppingCart, Heart, ArrowLeft, Check } from 'lucide-react';
import { products } from '../data/products';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isAuthenticated } = useApp();
  const product = products.find(p => p.id === Number(id));

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">Producto no encontrado</h2>
          <Link to="/catalogo" className="text-blue-400 hover:text-blue-300">
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para agregar productos al carrito');
      navigate('/auth');
      return;
    }

    if (!selectedSize) {
      toast.error('Por favor selecciona una talla');
      return;
    }

    if (!selectedColor) {
      toast.error('Por favor selecciona un color');
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize, selectedColor);
    }

    toast.success(`${product.name} agregado al carrito`);
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-gray-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>

        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div>
            <p className="text-blue-400 text-sm mb-2">{product.category}</p>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-slate-400">(128 reseñas)</span>
            </div>

            <div className="text-4xl font-bold text-white mb-6">${product.price}</div>

            <p className="text-slate-300 mb-8 leading-relaxed">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-white font-bold mb-3">Talla</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      selectedSize === size
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:border-blue-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-white font-bold mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      selectedColor === color
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:border-blue-500'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-white font-bold mb-3">Cantidad</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-slate-700/50 border border-slate-600 rounded-lg hover:bg-slate-700 text-white transition-colors"
                >
                  -
                </button>
                <span className="text-white font-bold text-lg w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 bg-slate-700/50 border border-slate-600 rounded-lg hover:bg-slate-700 text-white transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                Agregar al Carrito
              </button>
              <button className="p-4 bg-slate-700/50 border border-slate-600 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white transition-colors">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Features */}
            <div className="mt-8 bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 mt-0.5" />
                  <span className="text-slate-300">Envío gratis en compras mayores a $200.000</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 mt-0.5" />
                  <span className="text-slate-300">Devoluciones gratis en 30 días</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 mt-0.5" />
                  <span className="text-slate-300">Garantía de calidad premium</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Productos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <Link
                  key={relatedProduct.id}
                  to={`/producto/${relatedProduct.id}`}
                  className="group bg-slate-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all hover:scale-105 hover:shadow-xl"
                >
                  <div className="aspect-square overflow-hidden bg-slate-700/30">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-blue-400 mb-1">{relatedProduct.category}</p>
                    <h3 className="text-white font-medium mb-2 group-hover:text-blue-400 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <span className="text-xl font-bold text-white">${relatedProduct.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
