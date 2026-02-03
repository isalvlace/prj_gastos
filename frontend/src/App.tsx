import { useState } from 'react';
import './App.css';
import { Pessoas } from './components/Pessoas/Pessoas';
import { Categorias } from './components/Categorias/Categorias';
import { Transacoes } from './components/Transacoes/Transacoes';
import { Totais } from './components/Totais/Totais';

function App() {
  const [aba, setAba] = useState<'pessoas' | 'categorias' | 'transacoes' | 'relatorios'>('pessoas');

  return (
    <div className="app-wrapper">
      <header className="header-main">
        <div className="header-content">
          <div className="brand-section">
            <div className="logo-icon">💵</div>
            <div>
              <h1 className="brand-title">Gestão de Gastos</h1>
              <p className="brand-subtitle">Controle Financeiro Inteligente</p>
            </div>
          </div>

          <nav className="nav-group">
            <button 
              onClick={() => setAba('pessoas')} 
              className={aba === 'pessoas' ? "nav-btn-active" : "nav-btn"}
            >
              Pessoas
            </button>
            <button 
              onClick={() => setAba('categorias')} 
              className={aba === 'categorias' ? "nav-btn-active" : "nav-btn"}
            >
              Categorias
            </button>
            <button 
              onClick={() => setAba('transacoes')} 
              className={aba === 'transacoes' ? "nav-btn-active" : "nav-btn"}
            >
              Transações
            </button>
						<button 
              onClick={() => setAba('relatorios')} 
              className={aba === 'relatorios' ? "nav-btn-active" : "nav-btn"}
            >
              Relatórios
            </button>
          </nav>
        </div>
      </header>

      <main className="main-content">
        {aba === 'pessoas' && <Pessoas />}
        
        {aba === 'categorias' && <Categorias />}
        
        {aba === 'transacoes' && <Transacoes />}

        {aba === 'relatorios' && <Totais />}
      </main>
    </div>
  );
}

export default App;