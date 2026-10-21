import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Mail, Lock, User, UserPlus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { auth } from '../services/auth';
import { useApp } from '../context/AppContext';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function RegisterForm() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const password = watch('password');

  const onSubmit = async (data: FormData) => {
    setServerError('');
    const result = await auth.register(data.name, data.email, data.password);

    if (!result.ok) {
      setServerError(result.error);
      return;
    }

    login(result.user);
    toast.success(`¡Bienvenido a Estilo Único, ${result.user.name}!`);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      {/* Server-level error */}
      {serverError && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg">
          {serverError}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block mb-2 text-slate-200">
          Nombre Completo
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            id="name"
            type="text"
            placeholder="Juan Pérez"
            {...register('name', {
              required: 'El nombre es requerido',
              minLength: { value: 3, message: 'Mínimo 3 caracteres' },
            })}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-slate-400"
          />
        </div>
        {errors.name && (
          <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="register-email" className="block mb-2 text-slate-200">
          Correo Electrónico
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            id="register-email"
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
        <label htmlFor="register-password" className="block mb-2 text-slate-200">
          Contraseña
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            id="register-password"
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

      <div>
        <label htmlFor="confirm-password" className="block mb-2 text-slate-200">
          Confirmar Contraseña
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            id="confirm-password"
            type="password"
            placeholder="••••••••"
            {...register('confirmPassword', {
              required: 'Confirma tu contraseña',
              validate: value => value === password || 'Las contraseñas no coinciden',
            })}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-slate-400"
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-400 mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          id="terms"
          required
          className="mt-1 rounded border-slate-600 bg-slate-700"
        />
        <label htmlFor="terms" className="text-slate-300 cursor-pointer">
          Acepto los términos y condiciones de uso del sistema
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-slate-700 via-slate-600 to-blue-700 text-white py-3 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 disabled:scale-100 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <UserPlus className="w-5 h-5" />
        )}
        {isSubmitting ? 'Creando cuenta...' : 'Crear Cuenta'}
      </button>
    </form>
  );
}
