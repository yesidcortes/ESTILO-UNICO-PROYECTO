import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Plus, X, Upload, Package } from "lucide-react";
import { toast } from "sonner";

const CATEGORIES = [
  "Otoño 2026",
  "Primavera 2026",
  "Verano 2026",
  "Invierno 2026",
  "Colección Cápsula",
  "Edición Limitada",
];

const COLOR_OPTIONS = [
  { label: "Rojo", value: "#ef4444" },
  { label: "Amarillo", value: "#eab308" },
  { label: "Verde", value: "#22c55e" },
  { label: "Azul", value: "#3b82f6" },
  { label: "Blanco", value: "#f1f5f9" },
  { label: "Negro", value: "#1e293b" },
];

export function ProductRegister() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    nombre: "",
    categoria: "Otoño 2026",
    precio: "",
    stock: "",
    descripcion: "",
    colores: [] as string[],
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleColor = (hex: string) => {
    setForm((prev) => ({
      ...prev,
      colores: prev.colores.includes(hex)
        ? prev.colores.filter((c) => c !== hex)
        : [...prev.colores, hex],
    }));
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImages((prev) => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim()) {
      toast.error("El nombre de la prenda es obligatorio.");
      return;
    }
    if (!form.precio || isNaN(Number(form.precio)) || Number(form.precio) <= 0) {
      toast.error("Ingresa un precio válido.");
      return;
    }
    toast.success(`"${form.nombre}" registrado exitosamente.`);
    setTimeout(() => navigate("/catalogo"), 1200);
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] relative overflow-hidden">
      {/* Blurred ambient blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-indigo-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-600/20 border border-violet-500/30 mb-5 shadow-lg shadow-violet-900/30">
            <Package className="w-7 h-7 text-violet-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
            Formulario de Registro de Producto
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto">
            Complete los siguientes campos para añadir un nuevo producto.
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#111827]/80 backdrop-blur-xl rounded-3xl border border-slate-700/40 shadow-2xl shadow-black/50 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">

            {/* ── Row 1: Image upload + Nombre + Categoría ── */}
            <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_1fr] gap-6 items-start">

              {/* Image upload */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  Imagen del Producto
                </span>

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`w-36 h-36 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all select-none ${
                    isDragging
                      ? "border-violet-500 bg-violet-500/10"
                      : "border-slate-600/60 bg-slate-800/40 hover:border-violet-500/60 hover:bg-violet-500/5"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-slate-700/60 flex items-center justify-center mb-2">
                    <Plus className="w-5 h-5 text-slate-300" />
                  </div>
                  <span className="text-xs text-slate-400 text-center px-3 leading-snug">
                    Haga clic para subir imagen
                  </span>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />

                {/* Preview thumbnails */}
                {previewImages.length > 0 && (
                  <div className="flex flex-wrap gap-2 max-w-[144px]">
                    {previewImages.map((src, i) => (
                      <div key={i} className="relative group w-14 h-14">
                        <img
                          src={src}
                          alt={`Imagen ${i + 1}`}
                          className="w-14 h-14 object-cover rounded-xl border border-slate-600/50"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-2.5 h-2.5 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Nombre de la Prenda */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  Nombre de la Prenda
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Ej. Chaqueta Oversize"
                  className="w-full bg-slate-800/50 border border-slate-600/50 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500/70 focus:ring-2 focus:ring-violet-500/20 transition-all"
                />
              </div>

              {/* Categoría */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  Categoría
                </label>
                <div className="relative">
                  <select
                    name="categoria"
                    value={form.categoria}
                    onChange={handleChange}
                    className="w-full appearance-none bg-slate-800/50 border border-slate-600/50 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500/70 focus:ring-2 focus:ring-violet-500/20 transition-all pr-10 cursor-pointer"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c} className="bg-slate-900 text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Row 2: Precio + Stock ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  Precio
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">$</span>
                  <input
                    type="number"
                    name="precio"
                    value={form.precio}
                    onChange={handleChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full bg-slate-800/50 border border-slate-600/50 text-white placeholder-slate-500 rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:border-violet-500/70 focus:ring-2 focus:ring-violet-500/20 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  Cantidad en Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className="w-full bg-slate-800/50 border border-slate-600/50 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500/70 focus:ring-2 focus:ring-violet-500/20 transition-all"
                />
              </div>
            </div>

            {/* ── Descripción ── */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                placeholder="Describe los detalles de la prenda: materiales, corte, tallaje especial..."
                rows={4}
                className="w-full bg-slate-800/50 border border-slate-600/50 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500/70 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none leading-relaxed"
              />
            </div>

            {/* ── Colores disponibles ── */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Colores Disponibles
              </label>
              <div className="flex items-center gap-3 flex-wrap">
                {COLOR_OPTIONS.map(({ label, value }) => (
                  <button
                    key={value}
                    type="button"
                    title={label}
                    onClick={() => toggleColor(value)}
                    className={`w-8 h-8 rounded-full transition-all focus:outline-none ${
                      form.colores.includes(value)
                        ? "ring-2 ring-offset-2 ring-offset-[#111827] ring-violet-500 scale-110"
                        : "ring-2 ring-transparent hover:scale-105"
                    }`}
                    style={{ backgroundColor: value }}
                  />
                ))}
                <span className="text-xs text-slate-500 ml-1">
                  {form.colores.length > 0
                    ? `${form.colores.length} color${form.colores.length > 1 ? "es" : ""} seleccionado${form.colores.length > 1 ? "s" : ""}`
                    : "Selecciona colores"}
                </span>
              </div>
            </div>

            {/* ── Divider ── */}
            <div className="border-t border-slate-700/50" />

            {/* ── Actions ── */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto px-8 py-3 rounded-xl border border-slate-600/60 text-slate-300 hover:bg-slate-800/60 hover:text-white transition-all text-sm font-medium"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-3 rounded-xl font-semibold text-white text-sm transition-all shadow-lg shadow-violet-900/40 hover:shadow-violet-900/60 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #9333ea 50%, #a855f7 100%)",
                }}
              >
                <span className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Registrar Producto
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Ambient footer glow */}
        <div className="mt-8 text-center">
          <p className="text-slate-600 text-xs tracking-wide">
            Estilo Único · Temporada Otoño 2026
          </p>
        </div>
      </div>
    </div>
  );
}
