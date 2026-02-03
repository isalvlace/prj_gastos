import { useEffect, useState } from 'react';
import api from '../../services/api';
import type { RelatorioGeral, RelatorioGeralCategoria } from '../../types';
import './Totais.css';

export const Totais = () => {
  const [dadosPessoas, setDadosPessoas] = useState<RelatorioGeral | null>(null);
  const [dadosCategorias, setDadosCategorias] = useState<RelatorioGeralCategoria | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarDashboards = async () => {
      try {
        setLoading(true);
        const [resP, resC] = await Promise.all([
          api.get<RelatorioGeral>('/Pessoas/totais'),
          api.get<RelatorioGeralCategoria>('/Categorias/totais-categoria')
        ]);

        setDadosPessoas(resP.data);
        setDadosCategorias(resC.data);
      } catch (err) {
        console.error("Erro ao carregar dashboards:", err);
      } finally {
        setLoading(false);
      }
    };
    carregarDashboards();
  }, []);

  if (loading || !dadosPessoas || !dadosCategorias) {
    return <div className="placeholder-section">Consolidando balanços financeiros...</div>;
  }

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <div className="main-wrapper page-totais">
      <section className="content-container">
        
        {/* === RELATÓRIO DE CATEGORIAS === */}
        <div className="report-section">
          <div className="section-header">
            <h2 className="section-title">Resumo por Categoria</h2>
          </div>

          {/* Cards usando RelatorioGeralCategoriaDto */}
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">Total Receitas</span>
              <span className="stat-value text-receita">
                {formatCurrency(dadosCategorias.totalGeralReceitas)}
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Total Despesas</span>
              <span className="stat-value text-despesa">
                {formatCurrency(dadosCategorias.totalGeralDespesas)}
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Saldo Líquido</span>
              <span className={`stat-value ${dadosCategorias.saldoLiquidoGeral >= 0 ? 'text-receita' : 'text-despesa'}`}>
                {formatCurrency(dadosCategorias.saldoLiquidoGeral)}
              </span>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="table-main">
              <thead>
                <tr>
                  <th className="th-custom">DESCRIÇÃO</th>
                  <th className="th-custom" style={{ textAlign: 'right' }}>RECEITAS</th>
                  <th className="th-custom" style={{ textAlign: 'right' }}>DESPESAS</th>
                  <th className="th-custom" style={{ textAlign: 'right' }}>SALDO</th>
                </tr>
              </thead>
              <tbody>
                {dadosCategorias.categorias.map((c, idx) => (
                  <tr key={c.categoriaId || idx} className={idx % 2 === 0 ? "" : "tr-even"}>
                    <td className="td-custom" style={{ fontWeight: 600 }}>{c.descricao}</td>
                    <td className="td-custom text-receita" style={{ textAlign: 'right' }}>
                      {formatCurrency(c.totalReceitas)}
                    </td>
                    <td className="td-custom text-despesa" style={{ textAlign: 'right' }}>
                      {formatCurrency(c.totalDespesas)}
                    </td>
                    <td className="td-custom" style={{ textAlign: 'right', fontWeight: 700 }}>
                      <span className={c.saldo >= 0 ? 'text-receita' : 'text-despesa'}>
                        {formatCurrency(c.saldo)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="section-divider" />

        {/* === RELATÓRIO DE PESSOAS === */}
        <div className="report-section">
          <div className="section-header">
            <h2 className="section-title">Resumo por Pessoa</h2>
          </div>

          {/* Cards usando RelatorioGeralDto */}
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">Total Receitas</span>
              <span className="stat-value text-receita">
                {formatCurrency(dadosPessoas.totalGeralReceitas)}
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Total Despesas</span>
              <span className="stat-value text-despesa">
                {formatCurrency(dadosPessoas.totalGeralDespesas)}
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Saldo Líquido</span>
              <span className={`stat-value ${dadosPessoas.saldoLiquidoGeral >= 0 ? 'text-receita' : 'text-despesa'}`}>
                {formatCurrency(dadosPessoas.saldoLiquidoGeral)}
              </span>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="table-main">
              <thead>
                <tr>
                  <th className="th-custom">NOME</th>
                  <th className="th-custom" style={{ textAlign: 'right' }}>RECEITAS</th>
                  <th className="th-custom" style={{ textAlign: 'right' }}>DESPESAS</th>
                  <th className="th-custom" style={{ textAlign: 'right' }}>SALDO</th>
                </tr>
              </thead>
              <tbody>
                {dadosPessoas.pessoas.map((p, idx) => (
                  <tr key={p.id || idx} className={idx % 2 === 0 ? "" : "tr-even"}>
                    <td className="td-custom" style={{ fontWeight: 600 }}>{p.nome}</td>
                    <td className="td-custom text-receita" style={{ textAlign: 'right' }}>
                      {formatCurrency(p.totalReceitas)}
                    </td>
                    <td className="td-custom text-despesa" style={{ textAlign: 'right' }}>
                      {formatCurrency(p.totalDespesas)}
                    </td>
                    <td className="td-custom" style={{ textAlign: 'right', fontWeight: 700 }}>
                      <span className={p.saldo >= 0 ? 'text-receita' : 'text-despesa'}>
                        {formatCurrency(p.saldo)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </section>
    </div>
  );
};