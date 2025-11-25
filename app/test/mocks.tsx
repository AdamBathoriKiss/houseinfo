import { vi } from 'vitest'
import type { useAuth } from '~/utils/AuthProvider'

// ✅ Ez a fájl csak a mock definíciókat tartalmazza
// Importáld be minden teszt fájl TETEJÉN!

export const mockAuthUser = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  role: 'admin'
}

export const mockAuthContext = {
  token: 'mock-token-123',
  setToken: vi.fn(),
  user: mockAuthUser,
  setUser: vi.fn(),
  logout: vi.fn(),
  isLoading: false,
}

// Toast mock
vi.mock('primereact/toast', () => ({
  Toast: vi.fn(() => null),
}))

// AuthProvider mock
vi.mock('~/utils/AuthProvider', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useAuth: () => mockAuthContext,
}))