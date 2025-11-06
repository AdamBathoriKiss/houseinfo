// ToastContext.tsx
import React, { createContext, useContext, useRef } from 'react';
import { Toast } from 'primereact/toast';

type ToastMessage = {
  severity?: 'success' | 'info' | 'warn' | 'error';
  summary?: string;
  detail?: string;
  life?: number;
  content?: any;
};

type ToastContextType = {
  showToast: (message: ToastMessage) => void;
  showSuccess: (summary?: string, detail?: string, content?: any) => void;
  showError: (summary?: string, detail?: string, content?: any) => void;
  showWarn: (summary?: string, detail?: string, content?: any) => void;
  showInfo: (summary?: string, detail?: string, content?: any) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const toastRef = useRef<any>(null);

  const showToast = (message: ToastMessage) => {
    toastRef.current?.show({
      severity: message.severity,
      summary: message.summary,
      detail: message.detail,
      life: message.life ?? 3000,
      content: message.content,
    });
  };

  const showSuccess = (summary?: string, detail?: string, content?: any) => {
    showToast({ severity: 'success', summary, detail, content });
  };

  const showError = (summary?: string, detail?: string, content?: any) => {
    showToast({ severity: 'error', summary, detail, content });
  };

  const showWarn = (summary?: string, detail?: string, content?: any) => {
    showToast({ severity: 'warn', summary, detail, content });
  };

  const showInfo = (summary?: string, detail?: string, content?: any) => {
    showToast({ severity: 'info', summary, detail, content });
  };

  return (
    <ToastContext.Provider value={{ showToast, showSuccess, showError, showWarn, showInfo }}>
      <Toast ref={toastRef} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};