namespace Gastos.Api.DTOs.Categoria;

public record TotalPorCategoriaDto(
    Guid CategoriaId,
    string Descricao,
    decimal TotalReceitas,
    decimal TotalDespesas,
    decimal Saldo
);