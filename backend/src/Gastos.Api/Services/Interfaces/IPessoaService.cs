using Gastos.Api.DTOs.Pessoa;

namespace Gastos.Api.Services.Interfaces;

public interface IPessoaService
{
    Task<IEnumerable<PessoaDto>> ListarTodasAsync();
    Task<PessoaDto?> BuscarPorIdAsync(Guid id);
    Task<PessoaDto> CriarAsync(CriarPessoaDto dto);
    Task<bool> AtualizarAsync(Guid id, CriarPessoaDto dto);
    Task<bool> DeletarAsync(Guid id);
    Task<RelatorioGeralDto> ObterRelatorioTotaisAsync();
}