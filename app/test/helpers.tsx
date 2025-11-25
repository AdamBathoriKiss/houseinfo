import '../test/mocks'
import { render } from "@testing-library/react"
import type { ReactElement } from "react"
import { vi } from "vitest";
import AuthProvider from "~/utils/AuthProvider"
import { ToastProvider } from "~/utils/ToastProvider"

vi.mock("./test/mocks")
export function renderWithProviders(component: ReactElement) {

  return render(
    <AuthProvider>
      <ToastProvider>
        {component}
      </ToastProvider>
    </AuthProvider>
  )
}

export function mockApiSuccess(data: any) {
  return {
    data,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {} as any
  }
}

export function mockApiError(message: string) {
  return Promise.reject(new Error(message))
}