using Gastos.Api.Domain.Entities;
using Gastos.Api.Domain.Enums;
using Gastos.Api.DTOs.Transacao;
using Gastos.Api.Infrastructure.Repositories.Interfaces;
using Gastos.Api.Services.Interfaces;
using Gastos.Api.Common.Exceptions; 

namespace Gastos.Api.Services;

public class TransacaoService : ITransacaoService
{
    private readonly ITransacaoRepository _transacaoRepository;
    private readonly IPessoaRepository _pessoaRepository;
    private readonly ICategoriaRepository _categoriaRepository;

    public TransacaoService(
        ITransacaoRepository transacaoRepository,
        IPessoaRepository pessoaRepository,
        ICategoriaRepository categoriaRepository)
    {
        _transacaoRepository = transacaoRepository;
        _pessoaRepository = pessoaRepository;
        _categoriaRepository = categoriaRepository;
    }

    public async Task<IEnumerable<TransacaoDto>> ListarTodasAsync()
    {
        var transacoes = await _transacaoRepository.GetAllAsync();
        
        return transacoes.Select(t => new TransacaoDto(
            t.Id,
            t.Descricao,
            t.Valor,
            t.Tipo,
            t.Categoria.Descricao,
            t.Pessoa.Nome
        ));
    }

    public async Task<TransacaoDto> CriarAsync(CriarTransacaoDto dto)
    {
        var pessoa = await _pessoaRepository.GetByIdAsync(dto.PessoaId);
        if (pessoa == null) throw new BusinessException("Pessoa não encontrada.");

        if (pessoa.Idade < 18 && dto.Tipo == TipoTransacao.Receita)
        {
            throw new BusinessException("Menores de 18 anos só podem registrar despesas.");
        }

        var categoria = await _categoriaRepository.GetByIdAsync(dto.CategoriaId);
        if (categoria == null) throw new BusinessException("Categoria não encontrada.");

        ValidarCompatibilidadeCategoria(dto.Tipo, categoria.Finalidade);

        var transacao = new Transacao
        {
            Descricao = dto.Descricao,
            Valor = dto.Valor,
            Tipo = dto.Tipo,
            CategoriaId = dto.CategoriaId,
            PessoaId = dto.PessoaId
        };

        await _transacaoRepository.AddAsync(transacao);
        await _transacaoRepository.SaveChangesAsync();

        return new TransacaoDto(
            transacao.Id,
            transacao.Descricao,
            transacao.Valor,
            transacao.Tipo,
            categoria.Descricao,
            pessoa.Nome
        );
    }

	private void ValidarCompatibilidadeCategoria(TipoTransacao tipoTransacao, FinalidadeCategoria finalidade)
	{
		// Para 'Ambas', qualquer transação é válida.
		if (finalidade == FinalidadeCategoria.Ambas) return;

		// Se não for 'Ambas', testamos os valores inteiros
		// Tipo 1 com Finalidade 1 ou Tipo 2 com Finalidade 2
		if ((int)tipoTransacao != (int)finalidade)
		{
			string msg = finalidade == FinalidadeCategoria.Receita ? "receitas" : "despesas";
			throw new BusinessException($"A categoria selecionada é exclusiva para {msg}.");
		}
	}
}