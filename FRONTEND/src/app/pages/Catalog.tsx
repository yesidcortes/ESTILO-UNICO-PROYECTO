import { useState } from "react";
import { Link } from "react-router";
import {
  Search,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import { products, categories } from "../data/products";

export function Catalog() {
  const [selectedCategory, setSelectedCategory] =
    useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<
    [number, number]
  >([0, 200]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "Todos" ||
      product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPrice =
      product.price >= priceRange[0] &&
      product.price <= priceRange[1];
    return matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-gray-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Catálogo de Productos
          </h1>
          <p className="text-slate-400">
            Explora nuestra colección completa
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800/60 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-slate-400"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800/60 border border-slate-700 rounded-lg hover:bg-slate-700/60 transition-colors text-white"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filtros
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-8 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold">Filtros</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="text-slate-300 font-medium mb-3">
                Categorías
              </h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() =>
                      setSelectedCategory(category)
                    }
                    className={`px-4 py-2 rounded-lg transition-all ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-slate-700/50 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="text-slate-300 font-medium mb-3">
                Rango de Precio: ${priceRange[0]} - $
                {priceRange[1]}
              </h4>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-sm text-slate-400 mb-1 block">
                    Mínimo
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1,000.000"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([
                        Number(e.target.value),
                        priceRange[1],
                      ])
                    }
                    className="w-full"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm text-slate-400 mb-1 block">
                    Máximo
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1,000.000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([
                        priceRange[0],
                        Number(e.target.value),
                      ])
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters */}
        {(selectedCategory !== "Todos" || searchTerm) && (
          <div className="mb-6 flex flex-wrap gap-2">
            {selectedCategory !== "Todos" && (
              <div className="flex items-center gap-2 bg-blue-600/20 text-blue-400 px-3 py-1 rounded-lg border border-blue-500/30">
                <span className="text-sm">
                  {selectedCategory}
                </span>
                <button
                  onClick={() => setSelectedCategory("Todos")}
                  className="hover:text-blue-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            {searchTerm && (
              <div className="flex items-center gap-2 bg-blue-600/20 text-blue-400 px-3 py-1 rounded-lg border border-blue-500/30">
                <span className="text-sm">
                  Búsqueda: "{searchTerm}"
                </span>
                <button
                  onClick={() => setSearchTerm("")}
                  className="hover:text-blue-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6 text-slate-400">
          Mostrando {filteredProducts.length} de{" "}
          {products.length} productos
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
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
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg mb-4">
              No se encontraron productos
            </p>
            <button
              onClick={() => {
                setSelectedCategory("Todos");
                setSearchTerm("");
                setPriceRange([0, 1.0]);
              }}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}