using Gastos.Api.DTOs.Categoria;

namespace Gastos.Api.Services.Interfaces;

public interface ICategoriaService
{
    Task<IEnumerable<CategoriaDto>> ListarTodasAsync();
    Task<CategoriaDto> CriarAsync(CriarCategoriaDto dto);
	Task<RelatorioGeralCategoriaDto> ObterRelatorioTotaisCategoriaAsync();
}