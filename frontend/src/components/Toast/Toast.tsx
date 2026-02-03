import { useEffect } from 'react';
import './Toast.css';

interface ToastProps {
  message: string;
  type: 'error' | 'success';
  onClose: () => void;
}

export const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 10000);

    return () => clearTimeout(timer);
  }, [onClose, message]); 

  return (
    <div className={`toast-container ${type}`} role="alert">
      <div className="toast-content">
        <div className="toast-icon-wrapper">
          {type === 'error' ? '⚠️' : '✅'}
        </div>
        <div className="toast-text-wrapper">
          <strong className="toast-title">
            {type === 'error' ? 'Ops! Algo deu errado' : 'Sucesso!'}
          </strong>
          <p className="toast-message">{message}</p>
        </div>
      </div>
      <button 
        className="toast-close" 
        onClick={onClose} 
        aria-label="Fechar notificação"
      >
        &times;
      </button>
      {/* Barra de progresso visual */}
      <div className="toast-progress-bar">
        <div className={`toast-progress-fill ${type}`} />
      </div>
    </div>
  );
};