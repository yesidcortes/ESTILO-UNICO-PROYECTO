/**
 * auth.ts — Authentication service
 *
 * Provides register / login operations.
 * Passwords are hashed with SHA-256 via the native Web Crypto API (no dependencies).
 *
 * To migrate to a real backend, replace the bodies of `register` and `login`
 * with fetch() calls — the return types remain identical.
 */

import { db, SafeUser } from './db';

// ─── Types ────────────────────────────────────────────────────────────────────

export type AuthResult =
  | { ok: true; user: SafeUser }
  | { ok: false; error: string };

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function hashPassword(password: string): Promise<string> {
  const bytes = new TextEncoder().encode(password);
  const buffer = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getAvatarUrl(name: string): string {
  const seed = encodeURIComponent(name);
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
}

function toSafe(user: { id: string; name: string; email: string; avatar: string; createdAt: string }): SafeUser {
  return { id: user.id, name: user.name, email: user.email, avatar: user.avatar, createdAt: user.createdAt };
}

// ─── Public API ───────────────────────────────────────────────────────────────

export const auth = {
  async register(name: string, email: string, password: string): Promise<AuthResult> {
    if (db.users.findByEmail(email)) {
      return { ok: false, error: 'Este correo ya está registrado. Intenta iniciar sesión.' };
    }

    const created = db.users.create({
      id: generateId(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      passwordHash: await hashPassword(password),
      avatar: getAvatarUrl(name),
      createdAt: new Date().toISOString(),
    });

    return { ok: true, user: toSafe(created) };
  },

  async login(email: string, password: string): Promise<AuthResult> {
    const user = db.users.findByEmail(email);
    if (!user) {
      // Vague error on purpose — don't reveal which field is wrong
      return { ok: false, error: 'Correo o contraseña incorrectos' };
    }

    const hash = await hashPassword(password);
    if (hash !== user.passwordHash) {
      return { ok: false, error: 'Correo o contraseña incorrectos' };
    }

    return { ok: true, user: toSafe(user) };
  },
};
