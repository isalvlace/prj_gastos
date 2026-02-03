using Gastos.Api.Domain.Enums;

namespace Gastos.Api.DTOs.Transacao;

public record CriarTransacaoDto(
    string Descricao,
    decimal Valor,
    TipoTransacao Tipo,
    Guid CategoriaId,
    Guid PessoaId
);