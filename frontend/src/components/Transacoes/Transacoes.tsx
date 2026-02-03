import { useEffect, useState } from 'react';
import api from '../../services/api';
import type { Transacao, Pessoa, Categoria } from '../../types';
import './Transacoes.css';
import { Toast } from '../../components/Toast/Toast'; 

export const Transacoes = () => {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [notificacao, setNotificacao] = useState<{msg: string, tipo: 'error' | 'success'} | null>(null);

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState<number | ''>('');
  const [tipo, setTipo] = useState<number>(2); 
  const [pessoaId, setPessoaId] = useState('');
  const [categoriaId, setCategoriaId] = useState('');

  const carregarTudo = async () => {
    try {
      setLoading(true);
      const [resT, resP, resC] = await Promise.all([
        api.get<Transacao[]>('/Transacoes'),
        api.get<Pessoa[]>('/Pessoas'),
        api.get<Categoria[]>('/Categorias')
      ]);

      setTransacoes(resT.data || []);
      setPessoas(resP.data || []);
      setCategorias(resC.data || []);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { carregarTudo(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = { 
      descricao, 
      valor: Number(valor), 
      tipo, 
      pessoaId, 
      categoriaId 
    };

    try {
      await api.post('/Transacoes', payload);

      setNotificacao({ msg: 'Transação realizada com sucesso!', tipo: 'success' });

      setDescricao('');
      setValor('');
      setPessoaId('');
      setCategoriaId('');
      carregarTudo();
    } catch (err: any) {
      const errorData = err.response?.data;
      let mensagemFinal = "Erro ao salvar transação.";

      if (typeof errorData === 'string') {
        mensagemFinal = errorData;
      } else if (errorData?.errors) {
        mensagemFinal = Object.values(errorData.errors).flat().join('\n');
      } else if (errorData?.message || errorData?.title) {
        mensagemFinal = errorData.message || errorData.title;
      } else {
        mensagemFinal = err.message;
      }

      setNotificacao({ msg: mensagemFinal, tipo: 'error' });
    }
  };

  // Se estiver carregando, mostra apenas o loading
  if (loading) {
    return <div className="placeholder-section">Sincronizando dados financeiros...</div>;
  }

  return (
    <div className="main-wrapper page-transacoes">
      {/* Exibe o Toast se houver notificação */}
      {notificacao && (
        <Toast 
          message={notificacao.msg} 
          type={notificacao.tipo} 
          onClose={() => setNotificacao(null)} 
        />
      )}

      <section className="content-container">
        <div className="grid-split">
          
          <aside className="form-card">
            <div className="card-header">
              <div className="icon-box">💰</div>
              <div>
                <h3 className="card-title">Nova Transação</h3>
                <p className="card-subtitle">Registre uma movimentação</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="form-body">
              <div className="input-wrapper">
                <label className="label-text">Descrição</label>
                <input 
                  className="input-field" 
                  value={descricao} 
                  onChange={e => setDescricao(e.target.value)} 
                  required 
                  placeholder="Ex: Supermercado..." 
                />
              </div>

              <div className="input-wrapper">
                <label className="label-text">Valor (R$)</label>
                <input 
                  className="input-field" 
                  type="number" 
                  step="0.01" 
                  value={valor} 
                  onChange={e => setValor(e.target.value ? Number(e.target.value) : '')} 
                  required 
                  placeholder="0,00" 
                />
              </div>

              <div className="input-wrapper">
                <label className="label-text">Tipo</label>
                <select className="select-field" value={tipo} onChange={e => setTipo(Number(e.target.value))}>
                  <option value={1}>Receita</option>
                  <option value={2}>Despesa</option>
                </select>
              </div>

              <div className="input-wrapper">
                <label className="label-text">Pessoa</label>
                <select className="select-field" value={pessoaId} onChange={e => setPessoaId(e.target.value)} required>
                  <option value="">Selecione...</option>
                  {pessoas.map(p => (
                    <option key={p.id} value={p.id}>{p.nome}</option>
                  ))}
                </select>
              </div>

              <div className="input-wrapper">
                <label className="label-text">Categoria</label>
                <select className="select-field" value={categoriaId} onChange={e => setCategoriaId(e.target.value)} required>
                  <option value="">Selecione...</option>
                  {categorias.map(c => (
                    <option key={c.id} value={c.id}>{c.descricao}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="submit-btn">Lançar Transação</button>
            </form>
          </aside>

          <div className="table-wrapper">
            <div className="table-container">
              <table className="table-main">
                <thead>
                  <tr>
                    <th className="th-custom">DESCRIÇÃO</th>
                    <th className="th-custom">CATEGORIA</th>
                    <th className="th-custom">VALOR</th>
                    <th className="th-custom">TIPO</th>
                    <th className="th-custom">PESSOA</th>
                  </tr>
                </thead>
                <tbody>
                  {transacoes.map((t, index) => (
                    <tr key={t.id || index} className={index % 2 === 0 ? "" : "tr-even"}>
                      <td className="td-custom">{t.descricao}</td>
                      <td className="td-custom" style={{ fontWeight: 600 }}>
                        {t.nomeCategoria || 'Sem categoria'}
                      </td>
                      <td className="td-custom">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(t.valor)}
                      </td>
                      <td className="td-custom">
                        <span className={`badge ${t.tipo === 1 ? 'badge-receita' : 'badge-despesa'}`}>
                          {t.tipo === 1 ? 'RECEITA' : 'DESPESA'}
                        </span>
                      </td>
                      <td className="td-custom" style={{ fontSize: '0.85rem' }}>
                        {t.nomePessoa || 'Não informado'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};