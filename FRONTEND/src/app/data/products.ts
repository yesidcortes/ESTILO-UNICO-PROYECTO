export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  sizes: string[];
  colors: string[];
  featured: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Camiseta Básica Premium",
    category: "Camisetas",
    price: 200.999,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    description:
      "Camiseta de algodón 100% orgánico con corte moderno y acabado suave.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Negro", "Blanco", "Gris", "Azul"],
    featured: true,
  },
  {
    id: 2,
    name: "Jeans Slim Fit",
    category: "Pantalones",
    price: 89.999,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    description:
      "Jeans de mezclilla elástica con corte slim fit y lavado moderno.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Azul Oscuro", "Negro", "Gris"],
    featured: true,
  },
  {
    id: 3,
    name: "Sudadera con Capucha",
    category: "Sudaderas",
    price: 59.999,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
    description:
      "Sudadera cómoda con capucha ajustable y bolsillo frontal tipo canguro.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Negro", "Gris", "Azul Marino", "Burdeos"],
    featured: true,
  },
  {
    id: 4,
    name: "Chaqueta De Cuero",
    category: "Chaquetas",
    price: 129.999,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    description:
      "Chaqueta bomber con forro acolchado y diseño clásico urbano.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Verde Oliva", "Azul Marino"],
    featured: false,
  },
  {
    id: 5,
    name: "Zapatillas Deportivas",
    category: "Calzado",
    price: 99.999,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    description:
      "Zapatillas deportivas con tecnología de amortiguación avanzada.",
    sizes: ["39", "40", "41", "42", "43", "44"],
    colors: ["Blanco", "Negro", "Gris/Azul"],
    featured: true,
  },
  {
    id: 6,
    name: "Camisa Oxford",
    category: "Camisas",
    price: 49.999,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500",
    description:
      "Camisa Oxford de algodón con botones y bolsillo frontal.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blanco", "Azul Claro", "Rosa"],
    featured: false,
  },
  {
    id: 7,
    name: "Shorts Deportivos",
    category: "Shorts",
    price: 34.999,
    image:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500",
    description:
      "Shorts ligeros con tecnología de secado rápido para actividades deportivas.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Gris", "Azul"],
    featured: false,
  },
  {
    id: 8,
    name: "Polo Clásico",
    category: "Polos",
    price: 39.999,
    image:
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500",
    description:
      "Polo de piqué con cuello y botones, ideal para un look casual elegante.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Blanco", "Negro", "Azul Marino", "Rojo"],
    featured: true,
  },
];

export const categories = [
  "Todos",
  "Camisetas",
  "Pantalones",
  "Sudaderas",
  "Chaquetas",
  "Calzado",
  "Camisas",
  "Shorts",
  "Polos",
];