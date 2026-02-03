namespace Gastos.Api.DTOs.Pessoa;

public record TotalPorPessoaDto(
    Guid Id,
    string Nome,
    decimal TotalReceitas,
    decimal TotalDespesas,
    decimal Saldo
);