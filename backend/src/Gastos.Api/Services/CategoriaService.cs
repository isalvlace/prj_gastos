using Gastos.Api.Domain.Entities;
using Gastos.Api.DTOs.Categoria;
using Gastos.Api.Infrastructure.Repositories.Interfaces;
using Gastos.Api.Services.Interfaces;
using Gastos.Api.Domain.Enums;

namespace Gastos.Api.Services;

public class CategoriaService : ICategoriaService
{
    private readonly ICategoriaRepository _categoriaRepository;
	private readonly ITransacaoRepository _transacaoRepository;


    public CategoriaService(ICategoriaRepository categoriaRepository, ITransacaoRepository transacaoRepository)
    {
        _categoriaRepository = categoriaRepository;
		_transacaoRepository = transacaoRepository;
    }

    public async Task<IEnumerable<CategoriaDto>> ListarTodasAsync()
    {
        var categorias = await _categoriaRepository.GetAllAsync();
        
        return categorias.Select(c => new CategoriaDto(
            c.Id, 
            c.Descricao, 
            c.Finalidade
        ));
    }

    public async Task<CategoriaDto> CriarAsync(CriarCategoriaDto dto)
    {
        var categoria = new Categoria
        {
            Descricao = dto.Descricao,
            Finalidade = dto.Finalidade
        };

        await _categoriaRepository.AddAsync(categoria);
        await _categoriaRepository.SaveChangesAsync();

        return new CategoriaDto(categoria.Id, categoria.Descricao, categoria.Finalidade);
    }

	public async Task<RelatorioGeralCategoriaDto> ObterRelatorioTotaisCategoriaAsync()
	{
		var transacoes = await _transacaoRepository.GetAllAsync();
		var categorias = await _categoriaRepository.GetAllAsync();

		var listaTotais = categorias.Select(c => {
			var tCategoria = transacoes.Where(t => t.CategoriaId == c.Id);
			var receitas = tCategoria.Where(t => t.Tipo == TipoTransacao.Receita).Sum(t => t.Valor);
			var despesas = tCategoria.Where(t => t.Tipo == TipoTransacao.Despesa).Sum(t => t.Valor);

			return new TotalPorCategoriaDto(c.Id, c.Descricao, receitas, despesas, receitas - despesas);
		}).ToList();

		var totalGeralReceitas = listaTotais.Sum(t => t.TotalReceitas);
		var totalGeralDespesas = listaTotais.Sum(t => t.TotalDespesas);

		return new RelatorioGeralCategoriaDto(
			listaTotais,
			totalGeralReceitas,
			totalGeralDespesas,
			totalGeralReceitas - totalGeralDespesas
		);
	}
}