/**
 * db.ts — Storage layer
 *
 * Wraps localStorage with typed CRUD methods.
 * To swap this for a real backend (REST, Supabase, Firebase, etc.)
 * just replace the body of each method — the interface stays the same.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  avatar: string;
  createdAt: string;
}

/** Safe user — never expose the hash outside this module */
export type SafeUser = Omit<User, 'passwordHash'>;

// ─── Internal helpers ─────────────────────────────────────────────────────────

const STORAGE_KEY = 'estilounico:users';

function read(): User[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function write(users: User[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

// ─── Public API ───────────────────────────────────────────────────────────────

export const db = {
  users: {
    /** Returns the full user record (including hash) — only for auth checks. */
    findByEmail(email: string): User | undefined {
      return read().find(u => u.email.toLowerCase() === email.toLowerCase());
    },

    findById(id: string): User | undefined {
      return read().find(u => u.id === id);
    },

    create(user: User): User {
      const users = read();
      users.push(user);
      write(users);
      return user;
    },

    update(id: string, patch: Partial<Omit<User, 'id'>>): SafeUser | null {
      const users = read();
      const index = users.findIndex(u => u.id === id);
      if (index === -1) return null;
      users[index] = { ...users[index], ...patch };
      write(users);
      const { passwordHash: _, ...safe } = users[index];
      return safe;
    },

    delete(id: string): boolean {
      const users = read();
      const filtered = users.filter(u => u.id !== id);
      if (filtered.length === users.length) return false;
      write(filtered);
      return true;
    },
  },
};
