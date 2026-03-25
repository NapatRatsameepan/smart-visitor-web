import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Role = 'SUPER_ADMIN' | 'ADMIN';

interface AuthState {
  role: Role;
  factoryId: string | null;
  setRole: (role: Role) => void;
  setFactoryId: (id: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      role: 'SUPER_ADMIN',
      factoryId: null,
      setRole: (role) => set({ role }),
      setFactoryId: (id) => set({ factoryId: id }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
