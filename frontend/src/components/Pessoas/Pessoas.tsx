import { useEffect, useState } from 'react';
import api from '../../services/api';
import type { Pessoa } from '../../types';
import './Pessoas.css'; 

export const Pessoas = () => {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState<number | ''>('');
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const carregarPessoas = async () => {
    try {
      const res = await api.get<Pessoa[]>('/Pessoas');
      setPessoas(res.data);
    } catch (err) { 
      console.error("Erro ao carregar dados:", err); 
    }
  };

  useEffect(() => { 
    carregarPessoas(); 
  }, []);

  const prepararEdicao = (p: Pessoa) => {
    setEditandoId(p.id);
    setNome(p.nome);
    setIdade(p.idade);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setNome('');
    setIdade('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || idade === '') return;

    const payload = { nome, idade: Number(idade) };

    try {
      if (editandoId) {
        await api.put(`/Pessoas/${editandoId}`, { id: editandoId, ...payload });
      } else {
        await api.post('/Pessoas', payload);
      }

      cancelarEdicao(); // Usa o reset padronizado
      carregarPessoas();
    } catch (err) {
      console.error(err);
      alert("Erro ao processar a requisição.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Deseja realmente remover esta pessoa?")) return;

    try {
      await api.delete(`/Pessoas/${id}`);
      setPessoas(pessoas.filter(p => p.id !== id));
    } catch (err) {
      console.error("Erro ao deletar:", err);
      alert("Não foi possível excluir o registro.");
    }
  };

  return (
    <div className="main-wrapper page-pessoas">
      <section className="content-container">
        <div className="grid-split">
          
          <aside className="form-card">
            <div className="card-header">
              <div className="icon-box">
                <span>{editandoId ? '📝' : '👤'}</span>
              </div>
              <div>
                <h3 className="card-title">{editandoId ? 'Editar Usuário' : 'Cadastro'}</h3>
                <p className="card-subtitle">
                  {editandoId ? 'Altere as informações abaixo' : 'Adicione novos usuários'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="form-body">
              <div className="input-wrapper">
                <label className="label-text">Nome Completo</label>
                <input 
                  className="input-field" 
                  placeholder="Ex: João Pereira da Silva" 
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  required 
                />
              </div>

              <div className="input-wrapper">
                <label className="label-text">Idade</label>
                <input 
                  className="input-field" 
                  type="number" 
                  placeholder="Ex: 25" 
                  value={idade}
                  onChange={e => setIdade(e.target.value ? Number(e.target.value) : '')}
                  required 
                />
              </div>

              <button type="submit" className="submit-btn">
                {editandoId ? 'Atualizar Dados' : 'Salvar Registro'}
              </button>

              {editandoId && (
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={cancelarEdicao}
                >
                  Cancelar Edição
                </button>
              )}
            </form>
          </aside>

          <div className="table-wrapper">
            <div className="table-container">
              <table className="table-main">
                <thead>
                  <tr>
                    <th className="th-custom" style={{ textAlign: 'center' }}>NOME</th>
                    <th className="th-custom" style={{ textAlign: 'center' }}>IDADE</th>
                    <th className="th-custom" style={{ textAlign: 'center' }}>AÇÕES</th>
                  </tr>
                </thead>
                <tbody>
                  {pessoas.map((p, index) => (
                    <tr key={p.id} className={index % 2 === 0 ? "" : "tr-even"}>
                      <td className="td-custom" style={{ textAlign: 'center' }}>{p.nome}</td>
                      <td className="td-custom" style={{ textAlign: 'center' }}>{p.idade} anos</td>
                      <td className="td-custom" style={{ textAlign: 'center' }}>
                        <button 
                          className="submit-btn" 
                          style={{ padding: '4px 12px', fontSize: '0.75rem', width: 'auto', marginTop: 0, backgroundColor: '#3b82f6' }} 
                          onClick={() => prepararEdicao(p)}
                        >
                          Editar
                        </button>

                        <button 
                          className="delete-btn" 
                          onClick={() => handleDelete(p.id)}
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                  {pessoas.length === 0 && (
                    <tr>
                      <td colSpan={3} className="td-custom" style={{ textAlign: 'center' }}>
                        Nenhum registro encontrado.
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