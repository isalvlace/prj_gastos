export interface Categoria {
  id: string;
  descricao: string;
  finalidade: number; // 1: Receita, 2: Despesa, 3: Ambas
}

export interface Pessoa {
  id: string;
  nome: string;
  idade: number;
}

export interface Transacao {
  id?: string;
  descricao: string;
  valor: number;
  tipo: number;
  pessoaId?: string;
  categoriaId?: string;
  nomeCategoria?: string;
  nomePessoa?: string;
}

export interface TotalPorPessoa {
  id: string;
  nome: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface RelatorioGeral {
  pessoas: TotalPorPessoa[];
  totalGeralReceitas: number;
  totalGeralDespesas: number;
  saldoLiquidoGeral: number;
}

export interface TotalPorCategoria {
  categoriaId: string;
  descricao: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface RelatorioGeralCategoria {
  categorias: TotalPorCategoria[];
  totalGeralReceitas: number;
  totalGeralDespesas: number;
  saldoLiquidoGeral: number;
}