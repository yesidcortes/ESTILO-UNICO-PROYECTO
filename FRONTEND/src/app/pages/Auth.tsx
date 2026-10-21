import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import { ShoppingBag } from "lucide-react";

export function Auth() {
  const [activeTab, setActiveTab] = useState<
    "login" | "register"
  >("login");

  return (
    <div className="size-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 relative overflow-hidden min-h-screen">
      {/* Elementos difuminados de fondo */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-slate-700 rounded-full mix-blend-soft-light filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-20 w-96 h-96 bg-gray-700 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse animation-delay-4000"></div>

      <div className="w-full max-w-md p-6 relative z-10">
        <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-slate-700/50">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 text-white p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <div className="bg-slate-700/50 backdrop-blur-sm p-4 rounded-full shadow-lg border border-slate-600/30">
                  <ShoppingBag className="w-8 h-8" />
                </div>
              </div>
              <h1 className="text-2xl">Estilo Único</h1>
              <p className="text-sm opacity-80 mt-2 text-slate-300">
                {activeTab === "login"
                  ? "Inicia sesión para acceder a tu cuenta"
                  : "Crea tu cuenta para comenzar a comprar"}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-4 transition-all ${
                activeTab === "login"
                  ? "border-b-2 border-blue-500 text-blue-400 bg-slate-700/40"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/20"
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-4 transition-all ${
                activeTab === "register"
                  ? "border-b-2 border-blue-500 text-blue-400 bg-slate-700/40"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/20"
              }`}
            >
              Registrarse
            </button>
          </div>

          {/* Content */}
          <div className="p-6 bg-slate-800/60">
            {activeTab === "login" ? (
              <LoginForm />
            ) : (
              <RegisterForm />
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-slate-400 mt-6 drop-shadow-lg">
          Tienda de ropa online con las últimas tendencias
        </p>
      </div>
    </div>
  );
}