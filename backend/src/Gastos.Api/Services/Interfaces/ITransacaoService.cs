using Gastos.Api.DTOs.Transacao;

namespace Gastos.Api.Services.Interfaces;

public interface ITransacaoService
{
    Task<IEnumerable<TransacaoDto>> ListarTodasAsync();
    Task<TransacaoDto> CriarAsync(CriarTransacaoDto dto);
}