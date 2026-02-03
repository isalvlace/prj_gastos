using Gastos.Api.Domain.Enums;

namespace Gastos.Api.DTOs.Transacao;

public record TransacaoDto(
    Guid Id,
    string Descricao,
    decimal Valor,
    TipoTransacao Tipo,
    string NomeCategoria,
    string NomePessoa
);