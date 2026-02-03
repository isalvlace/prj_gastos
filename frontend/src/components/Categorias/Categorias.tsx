import { useEffect, useState } from 'react';
import api from '../../services/api';
import type { Categoria } from '../../types';
import './Categorias.css';

export const Categorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [descricao, setDescricao] = useState('');
  const [finalidade, setFinalidade] = useState<number>(2); // Padrão: Despesa

  const carregarCategorias = async () => {
    try {
      const res = await api.get<Categoria[]>('/Categorias');
      setCategorias(res.data);
    } catch (err) {
      console.error("Erro ao carregar categorias:", err);
    }
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/Categorias', { descricao, finalidade });
      
      // Limpa o formulário e recarrega a lista
      setDescricao('');
      setFinalidade(2);
      carregarCategorias();
    } catch (err) {
      alert("Erro ao salvar categoria. Verifique a conexão com a API.");
    }
  };

  return (
    <div className="main-wrapper page-categorias">
      <section className="content-container">
        <div className="grid-split">
          <aside className="form-card">
            <div className="card-header">
              <div className="icon-box">🏷️</div>
              <div>
                <h3 className="card-title">Nova Categoria</h3>
                <p className="card-subtitle">Cadastre tipos de movimentações</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="form-body">
              <div className="input-wrapper">
                <label className="label-text">Descrição (Máx 400)</label>
                <input 
                  className="input-field" 
                  value={descricao} 
                  onChange={e => setDescricao(e.target.value)} 
                  placeholder="Ex: Alimentação, Lazer..." 
                  maxLength={400} 
                  required 
                />
              </div>

              <div className="input-wrapper">
                <label className="label-text">Finalidade</label>
                <select 
                  className="select-field" 
                  value={finalidade} 
                  onChange={e => setFinalidade(Number(e.target.value))}
                >
                  <option value={1}>Receita</option>
                  <option value={2}>Despesa</option>
                  <option value={3}>Ambas</option>
                </select>
              </div>

              <button type="submit" className="submit-btn">
                Salvar Categoria
              </button>
            </form>
          </aside>

          <div className="table-wrapper">
            <div className="table-container">
              <table className="table-main">
                <thead>
                  <tr>
                    <th className="th-custom" style={{ textAlign: 'center' }}>DESCRIÇÃO</th>
                    <th className="th-custom" style={{ textAlign: 'center' }}>FINALIDADE</th>
                  </tr>
                </thead>
                <tbody>
                  {categorias.map((c, index) => (
                    <tr key={c.id} className={index % 2 === 0 ? "" : "tr-even"}>
                      <td className="td-custom" style={{ textAlign: 'center' }}>{c.descricao}</td>
                      <td className="td-custom" style={{ textAlign: 'center' }}>
                        <span className={`badge ${
                          c.finalidade === 1 ? 'badge-receita' : 
                          c.finalidade === 2 ? 'badge-despesa' : 'badge-ambas'
                        }`}>
                          {c.finalidade === 1 ? 'RECEITA' : 
                           c.finalidade === 2 ? 'DESPESA' : 'AMBAS'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {categorias.length === 0 && (
                    <tr>
                      <td colSpan={2} className="td-custom" style={{ textAlign: 'center', padding: '2rem' }}>
                        Nenhuma categoria cadastrada.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};