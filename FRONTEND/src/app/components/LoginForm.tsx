import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { auth } from '../services/auth';
import { useApp } from '../context/AppContext';

interface FormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setServerError('');
    const result = await auth.login(data.email, data.password);

    if (!result.ok) {
      setServerError(result.error);
      return;
    }

    login(result.user);
    toast.success(`¡Bienvenido de vuelta, ${result.user.name}!`);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      {/* Server-level error */}
      {serverError && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg">
          {serverError}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block mb-2 text-slate-200">
          Correo Electrónico
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            id="email"
            type="email"
            placeholder="tu@email.com"
            {...register('email', {
              required: 'El correo es requerido',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Correo electrónico inválido',
              },
            })}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-slate-400"
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block mb-2 text-slate-200">
          Contraseña
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register('password', {
              required: 'La contraseña es requerida',
              minLength: { value: 6, message: 'Mínimo 6 caracteres' },
            })}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-slate-400"
          />
        </div>
        {errors.password && (
          <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="rounded border-slate-600 bg-slate-700" />
          <span className="text-slate-300">Recordarme</span>
        </label>
        <a href="#" className="text-blue-400 hover:text-blue-300 hover:underline">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-slate-700 via-slate-600 to-blue-700 text-white py-3 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 disabled:scale-100 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <LogIn className="w-5 h-5" />
        )}
        {isSubmitting ? 'Verificando...' : 'Iniciar Sesión'}
      </button>
    </form>
  );
}
